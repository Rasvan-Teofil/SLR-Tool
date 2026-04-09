import { brand } from "../config/brand";

export default function BrandMark({ className = "", compact = false }) {
  return (
    <div className={`flex min-w-0 items-center ${compact ? "gap-2" : "gap-3"} ${className}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg bg-indigo-700 font-bold tracking-tight text-white shadow-sm ${
          compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"
        }`}
        aria-hidden
      >
        {brand.monogram}
      </span>
      <div className="min-w-0">
        <p className={`truncate font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>
          {brand.productName}
        </p>
        <p className={`truncate text-slate-500 ${compact ? "text-[11px] leading-tight" : "text-xs"}`}>
          {brand.tagline}
        </p>
      </div>
    </div>
  );
}
