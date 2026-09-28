import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

// const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 6;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(process.env.DATABASE_URL);
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (Math.max(currentPage, 1) - 1) * ITEMS_PER_PAGE;

  const rows = await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
      OR date::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await getSql()`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingByDate(
  date: string, // 'YYYY-MM-DD'
): Promise<SacramentMeeting | null> {
  const rows = await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE date = ${date}::date
    LIMIT 1
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const rows = await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — Week 04
export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements, opening_hymn, opening_prayer, ward_business, stake_business, sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness ?? [])},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers ?? [])},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
  `;
}

export async function updateMeetingDb(
  id: number,
  data: Omit<SacramentMeeting, "id">,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE meetings SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements ?? []},
      opening_hymn = ${data.openingHymn},
      opening_prayer = ${data.openingPrayer},
      ward_business = ${data.wardBusiness ?? []},
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${data.sacramentHymn},
      speakers = ${data.speakers ?? []},
      closing_hymn = ${data.closingHymn},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeetingDb(id: number): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM meetings WHERE id = ${id}`;
}
