"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addMeeting,
  updateMeetingDb,
  deleteMeetingDb,
} from "@/lib/meetings-db";
import type { MeetingType, SacramentMeeting } from "@/lib/types";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

// Guard mutations
async function requireSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  return session;
}

// ---------------------------------------------------------------------------
// Zod schema — validates raw FormData before any DB write
// ---------------------------------------------------------------------------

const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD."),
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"], {
    message: "Select a valid meeting type.",
  }),
  presiding: z.string().min(2, "Presiding is required."),
  conducting: z.string().min(2, "Conducting is required."),
  openingPrayer: z.string().min(2, "Opening prayer is required."),
  closingPrayer: z.string().min(2, "Closing prayer is required."),

  // Hymns as flat form fields → nested objects after parse
  openingHymnNumber: z.coerce.number().int().positive("Required."),
  openingHymnTitle: z.string().min(1, "Opening hymn title is required."),
  sacramentHymnNumber: z.coerce.number().int().positive("Required."),
  sacramentHymnTitle: z.string().min(1, "Sacrament hymn title is required."),
  closingHymnNumber: z.coerce.number().int().positive("Required."),
  closingHymnTitle: z.string().min(1, "Closing hymn title is required."),

  // Optional / simple nested data from the form
  announcements: z.string().optional(), // comma-separated → TEXT[]
  stakeBusiness: z.string().optional(), // "on" from checkbox
  // Optional single speaker for a minimal form (expand later)
  speakerName: z.string().optional(),
  speakerTopic: z.string().optional(),
  wardBusiness: z.string().optional(), // one description line
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    announcements?: string[];
    stakeBusiness?: string[];
    speakerName?: string[];
    speakerTopic?: string[];
    wardBusiness?: string[];
  };
  message?: string | null;
};

// ---------------------------------------------------------------------------
// Map validated form data → SacramentMeeting shape (without id)
// ---------------------------------------------------------------------------

function formDataToMeeting(
  data: z.infer<typeof MeetingFormSchema>,
): Omit<SacramentMeeting, "id"> {
  const announcements = (data.announcements ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const speakers =
    data.speakerName && data.speakerName.trim()
      ? [
          {
            name: data.speakerName.trim(),
            topic: (data.speakerTopic ?? "").trim(),
            type: "speaker" as const,
          },
        ]
      : [];

  const wardBusiness =
    data.wardBusiness && data.wardBusiness.trim()
      ? [{ description: data.wardBusiness.trim() }]
      : [];

  return {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements,
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness,
    stakeBusiness: data.stakeBusiness === "on" || data.stakeBusiness === "true",
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers,
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

function rawFromFormData(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    announcements: formData.get("announcements") || "",
    stakeBusiness: formData.get("stakeBusiness") || "",
    speakerName: formData.get("speakerName") || "",
    speakerTopic: formData.get("speakerTopic") || "",
    wardBusiness: formData.get("wardBusiness") || "",
  };
}

// ---------------------------------------------------------------------------
// Server Actions
// ---------------------------------------------------------------------------

export async function createMeeting(
  prevState: State | void,
  formData: FormData,
): Promise<State | void> {
  await requireSession(); // guard mutation

  const parsed = MeetingFormSchema.safeParse(rawFromFormData(formData));

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting.",
    };
  }

  const meeting = formDataToMeeting(parsed.data);

try {
  await addMeeting(meeting);
} catch (error: unknown) {
  console.error("Error creating meeting:", error);

  const message = error instanceof Error ? error.message : "";
  const isDuplicateDate =
    message.includes("meetings_date_key") || message.includes("duplicate key");

  if (isDuplicateDate) {
    return {
      errors: {
        date: [
          "A meeting for this date already exists. Choose another date or edit the existing one.",
        ],
      },
      message: "Could not create meeting.",
    };
  }

  return { message: "Database Error: Failed to create meeting." };
  }
  
  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: string,
  prevState: State | void,
  formData: FormData,
): Promise<State | void> {
  await requireSession(); // guard mutation

  const parsed = MeetingFormSchema.safeParse(rawFromFormData(formData));

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update meeting.",
    };
  }

  const meeting = formDataToMeeting(parsed.data);
  const meetingId = Number(id);

  try {
    await updateMeetingDb(meetingId, meeting);
  } catch (error) {
    console.error("Error updating meeting:", error);
    return { message: "Database Error: Failed to update meeting." };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  revalidatePath(`/meetings/${id}/edit`);
  redirect("/meetings");
}

export async function deleteMeeting(id: string) {
  await requireSession(); // guard mutation

  const meetingId = Number(id);

  try {
    await deleteMeetingDb(meetingId);
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw new Error("Failed to delete meeting. Please try again later.");
  }

  revalidatePath("/meetings");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid email or password.";
        default:
          return "Something went wrong.";
      }
    }
    throw error; // allow redirect to complete
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
