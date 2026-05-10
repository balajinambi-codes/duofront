type Props = {
  icon: string;

  title: string;

  description: string;
};

export default function AchievementCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl transition hover:-translate-y-1">
      {/* ICON */}
      <div className="text-5xl">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="mt-5 text-2xl font-extrabold text-[#0B1736]">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </div>
  );
}