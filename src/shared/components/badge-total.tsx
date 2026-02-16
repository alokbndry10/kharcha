export function BadgeTotal({ badgeText }: { badgeText: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-300 rounded-radio">
      <span className="bg-white border border-gray-200 text-text-600 rounded-xl px-3">{badgeText}</span>
    </div>
  );
}
