import Link from "next/link";
import { LucideIcon } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { BreadcrumbItem } from "@/types";

interface PageHeaderProps {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  badge?: React.ReactNode;
  action?: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
}

export default function PageHeader({
  title,
  breadcrumb,
  badge,
  action,
}: PageHeaderProps) {
  const Icon = action?.icon;

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-voita-text">
            {title}
          </h1>
          {badge}
        </div>
        {breadcrumb && (
          <div className="mt-1">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
      </div>

      {action && Icon && (
        <Link
          href={action.href}
          className="flex items-center gap-1.5 bg-voita-accent text-voita-bg text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity shrink-0"
        >
          <Icon size={16} strokeWidth={2.5} />
          {action.label}
        </Link>
      )}
    </div>
  );
}
