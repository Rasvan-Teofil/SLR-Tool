import { brand } from "../config/brand";

export default function BrandMark({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-700 text-sm font-bold tracking-tight text-white shadow-sm"
        aria-hidden
      >
        {brand.monogram}
      </span>
      <div className="min-w-0">
        <p className="truncate text-base font-semibold text-slate-900">{brand.productName}</p>
        <p className="truncate text-xs text-slate-500">{brand.tagline}</p>
      </div>
    </div>
  );
}
