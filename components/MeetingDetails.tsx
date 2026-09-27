import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailsProps {
  meeting: SacramentMeeting;
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ProgramLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1 text-base leading-relaxed text-black">
      <span className="shrink-0 font-medium">{label}</span>
      <span
        className="flex-1 border-b border-dotted border-black/40 min-w-[1rem] translate-y-[-2px]"
        aria-hidden
      />
      <span className="shrink-0 text-right font-normal">{value}</span>
    </div>
  );
}

function HymnBlock({
  label,
  number,
  title,
}: {
  label: string;
  number: number;
  title: string;
}) {
  return (
    <div className="space-y-1">
      <ProgramLine label={label} value={`No. ${number}`} />
      <p className="text-center italic text-black text-base">{title}</p>
    </div>
  );
}

export default function MeetingDetails({ meeting }: MeetingDetailsProps) {
  const speakers = meeting.speakers ?? [];
  const hasWardBusiness = meeting.wardBusiness?.length > 0;
  const hasAnnouncements =
    meeting.announcements && meeting.announcements.length > 0;

  return (
    <article
      className="
        w-full max-w-3xl
        bg-white text-black
        border border-black/15 shadow-sm
        px-10 py-12 sm:px-16 sm:py-14
        font-serif
        print:max-w-none print:shadow-none print:border-0
        print:px-0 print:py-0
      "
    >
      {/* Header */}
      <div className="text-center mb-10 space-y-1 bg-white text-black print:mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black print:text-[16pt]">
          Sacrament Meeting
        </h1>
        <p className="text-lg text-black">Catalina Ward</p>
        <p className="text-lg text-black">{formatDate(meeting.date)}</p>
        {meeting.meetingType && meeting.meetingType !== "regular" && (
          <p className="text-sm uppercase tracking-wide text-black/70 pt-1">
            {meeting.meetingType} meeting
          </p>
        )}
      </div>

      {/* Leadership */}
      <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
        <ProgramLine label="Presiding" value={meeting.presiding || "—"} />
        <ProgramLine label="Conducting" value={meeting.conducting || "—"} />
      </section>

      {/* Opening */}
      <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
        {meeting.openingHymn?.number != null && (
          <HymnBlock
            label="Opening Hymn"
            number={meeting.openingHymn.number}
            title={meeting.openingHymn.title || ""}
          />
        )}
        <ProgramLine
          label="Invocation"
          value={meeting.openingPrayer || "By Invitation"}
        />
      </section>

      {/* Announcements / business */}
      {(hasAnnouncements || hasWardBusiness || meeting.stakeBusiness) && (
        <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
          {hasAnnouncements && (
            <div>
              <p className="font-semibold mb-1">Announcements</p>
              <ul className="list-disc list-inside space-y-0.5">
                {meeting.announcements!.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {hasWardBusiness && (
            <div>
              <p className="font-semibold mb-1">Ward Business</p>
              <ul className="list-disc list-inside space-y-0.5">
                {meeting.wardBusiness.map((item, i) => (
                  <li key={i}>{item.description}</li>
                ))}
              </ul>
            </div>
          )}
          {meeting.stakeBusiness && <p>Stake Business will be conducted.</p>}
        </section>
      )}

      {/* Sacrament */}
      <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
        {meeting.sacramentHymn?.number != null && (
          <HymnBlock
            label="Sacrament Hymn"
            number={meeting.sacramentHymn.number}
            title={meeting.sacramentHymn.title || ""}
          />
        )}
        <p className="text-center font-semibold text-black py-1">
          Administration of the Sacrament
        </p>
      </section>

      {/* Speakers / musical numbers */}
      {speakers.length > 0 && (
        <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
          {speakers.map((s, i) => (
            <div key={i}>
              {s.type === "musical-number" ? (
                <ProgramLine label="Musical Number" value={s.name || "—"} />
              ) : (
                <ProgramLine label="Speaker" value={s.name || "—"} />
              )}
              {s.topic ? (
                <p className="text-center italic text-black text-[15px]">
                  {s.topic}
                </p>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {/* Closing */}
      <section className="space-y-2 mb-8 print:mb-5 print:space-y-2">
        {meeting.closingHymn?.number != null && (
          <HymnBlock
            label="Closing Hymn"
            number={meeting.closingHymn.number}
            title={meeting.closingHymn.title || ""}
          />
        )}
        <ProgramLine
          label="Benediction"
          value={meeting.closingPrayer || "By Invitation"}
        />
      </section>
    </article>
  );
}
