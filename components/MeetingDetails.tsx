// import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailsProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetails({ meeting }: MeetingDetailsProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{meeting.date}</h3>
      <p className="text-sm text-slate-500 mb-6">
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>
      <div className="flex justify-between border-b border-slate-50 pb-2 mb-6">
        <span className="font-medium text-slate-500">Presiding</span>
        <span className="font-semibold text-slate-900">
          {meeting.presiding}
        </span>
      </div>

      <div className="space-y-6 text-slate-700">
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="font-medium text-slate-500">Conducting</span>
          <span className="font-semibold text-slate-900">
            {meeting.conducting}
          </span>
        </div>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4">
            <h4 className="font-bold text-amber-900 text-sm mb-2 uppercase tracking-wide">
              Announcements
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
              {meeting.announcements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Program
            </h4>
            <div>
              <p className="text-xs text-slate-400">Opening Hymn</p>
              <p className="font-medium text-slate-900">
                {meeting.openingHymn.number} - {meeting.openingHymn.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Opening Prayer</p>
              <p className="font-medium text-slate-900">
                {meeting.openingPrayer}
              </p>
            </div>

            {meeting.wardBusiness.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Ward Business</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-800">
                  {meeting.wardBusiness.map((item, idx) => (
                    <li key={idx}>{item.description}</li>
                  ))}
                </ul>
              </div>
            )}

            {meeting.stakeBusiness && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Stake Business</p>
                <p className="font-medium text-slate-900">Yes</p>
              </div>
            )}

            <div>
              <p className="text-xs text-slate-400">Sacrament Hymn</p>
              <p className="font-medium text-slate-900">
                {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Speakers & Closing
            </h4>
            <div>
              <p className="text-xs text-slate-400 mb-1">Speakers</p>
              <ul className="space-y-1">
                {meeting.speakers.map((speaker, idx) => (
                  <li
                    key={idx}
                    className="font-medium text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"
                  >
                    {speaker.name} - {speaker.topic} ({speaker.type})
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <p className="text-xs text-slate-400">Closing Hymn</p>
              <p className="font-medium text-slate-900">
                {meeting.closingHymn.number} - {meeting.closingHymn.title}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Closing Prayer</p>
              <p className="font-medium text-slate-900">
                {meeting.closingPrayer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
