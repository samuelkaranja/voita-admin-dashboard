import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/types";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-voita-text-muted">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-voita-text-secondary"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast ? "text-voita-text-secondary font-medium" : ""
                }
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight size={14} />}
          </span>
        );
      })}
    </div>
  );
}
