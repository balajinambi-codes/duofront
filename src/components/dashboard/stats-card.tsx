import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-100 p-3 text-green-600">
          {icon}
        </div>
      </div>
    </div>
  );
}