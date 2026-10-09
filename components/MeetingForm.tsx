"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { State } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

type MeetingFormProps = {
  action: (prevState: State | void, formData: FormData) => Promise<State | void>;
  meeting?: SacramentMeeting; // present on edit
  submitLabel?: string;
};

const initialState: State = { message: null, errors: {} };

export default function MeetingForm({
  action,
  meeting,
  submitLabel = "Save Meeting",
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const currentState = state ?? initialState;
  const dateHasError = Boolean(currentState.errors?.date?.length);

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow"
    >
      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={meeting?.date ?? ""}
          aria-describedby="date-error"
          aria-invalid={dateHasError}
          className={`w-full border rounded px-3 py-2 ${
            dateHasError
              ? "border-red-500 ring-1 ring-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              : ""
          }`}
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {currentState.errors?.date?.map((e) => (
            <p key={e} className="text-sm text-red-600 mt-1">
              {e}
            </p>
          ))}
        </div>
      </div>

      {/* Meeting type */}
      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium mb-1">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          required
          defaultValue={meeting?.meetingType ?? "regular"}
          aria-describedby="meetingType-error"
          className="w-full border rounded px-3 py-2"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {currentState.errors?.meetingType?.map((e) => (
            <p key={e} className="text-sm text-red-600 mt-1">
              {e}
            </p>
          ))}
        </div>
      </div>
      {/* Presiding / Conducting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium mb-1">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            required
            defaultValue={meeting?.presiding ?? ""}
            aria-describedby="presiding-error"
            className="w-full border rounded px-3 py-2"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {currentState.errors?.presiding?.map((e) => (
              <p key={e} className="text-sm text-red-600 mt-1">
                {e}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="conducting"
            className="block text-sm font-medium mb-1"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            required
            defaultValue={meeting?.conducting ?? ""}
            aria-describedby="conducting-error"
            className="w-full border rounded px-3 py-2"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {currentState.errors?.conducting?.map((e) => (
              <p key={e} className="text-sm text-red-600 mt-1">
                {e}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Prayers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="openingPrayer"
            className="block text-sm font-medium mb-1"
          >
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            required
            defaultValue={meeting?.openingPrayer ?? ""}
            aria-describedby="openingPrayer-error"
            className="w-full border rounded px-3 py-2"
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
            {currentState.errors?.openingPrayer?.map((e) => (
              <p key={e} className="text-sm text-red-600 mt-1">
                {e}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="closingPrayer"
            className="block text-sm font-medium mb-1"
          >
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            required
            defaultValue={meeting?.closingPrayer ?? ""}
            aria-describedby="closingPrayer-error"
            className="w-full border rounded px-3 py-2"
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
            {currentState.errors?.closingPrayer?.map((e) => (
              <p key={e} className="text-sm text-red-600 mt-1">
                {e}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Opening hymn */}
      <fieldset className="border rounded p-4 space-y-3">
        <legend className="text-sm font-medium px-1">Opening Hymn</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm mb-1">
              Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              required
              defaultValue={meeting?.openingHymn?.number ?? ""}
              aria-describedby="openingHymnNumber-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="openingHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.openingHymnNumber?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm mb-1">
              Title
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.openingHymn?.title ?? ""}
              aria-describedby="openingHymnTitle-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="openingHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.openingHymnTitle?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>
      {/* Sacrament hymn */}
      <fieldset className="border rounded p-4 space-y-3">
        <legend className="text-sm font-medium px-1">Sacrament Hymn</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm mb-1">
              Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              required
              defaultValue={meeting?.sacramentHymn?.number ?? ""}
              aria-describedby="sacramentHymnNumber-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="sacramentHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.sacramentHymnNumber?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm mb-1">
              Title
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              defaultValue={meeting?.sacramentHymn?.title ?? ""}
              aria-describedby="sacramentHymnTitle-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="sacramentHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.sacramentHymnTitle?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>
      {/* Closing hymn */}
      <fieldset className="border rounded p-4 space-y-3">
        <legend className="text-sm font-medium px-1">Closing Hymn</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm mb-1">
              Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              required
              defaultValue={meeting?.closingHymn?.number ?? ""}
              aria-describedby="closingHymnNumber-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="closingHymnNumber-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.closingHymnNumber?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm mb-1">
              Title
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              defaultValue={meeting?.closingHymn?.title ?? ""}
              aria-describedby="closingHymnTitle-error"
              className="w-full border rounded px-3 py-2"
            />
            <div
              id="closingHymnTitle-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentState.errors?.closingHymnTitle?.map((e) => (
                <p key={e} className="text-sm text-red-600 mt-1">
                  {e}
                </p>
              ))}
            </div>
          </div>
        </div>
      </fieldset>
      {/* Optional fields */}
      <div>
        <label
          htmlFor="announcements"
          className="block text-sm font-medium mb-1"
        >
          Announcements (comma-separated)
        </label>
        <input
          id="announcements"
          name="announcements"
          type="text"
          defaultValue={meeting?.announcements?.join(", ") ?? ""}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={meeting?.stakeBusiness ?? false}
          className="h-4 w-4"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium">
          Stake business
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="speakerName"
            className="block text-sm font-medium mb-1"
          >
            Speaker name (optional)
          </label>
          <input
            id="speakerName"
            name="speakerName"
            type="text"
            defaultValue={meeting?.speakers?.[0]?.name ?? ""}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label
            htmlFor="speakerTopic"
            className="block text-sm font-medium mb-1"
          >
            Speaker topic (optional)
          </label>
          <input
            id="speakerTopic"
            name="speakerTopic"
            type="text"
            defaultValue={meeting?.speakers?.[0]?.topic ?? ""}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="wardBusiness"
          className="block text-sm font-medium mb-1"
        >
          Ward business (optional)
        </label>
        <input
          id="wardBusiness"
          name="wardBusiness"
          type="text"
          defaultValue={meeting?.wardBusiness?.[0]?.description ?? ""}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {currentState.message ? (
        <p className="text-sm text-red-600" role="alert">
          {currentState.message}
        </p>
      ) : null}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link
          href="/meetings"
          className="flex-1 text-center border py-2 px-4 rounded hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
