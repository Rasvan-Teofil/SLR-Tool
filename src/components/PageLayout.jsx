export default function PageLayout({ children, footer }) {
  return (
    <div className="min-h-[60vh] bg-slate-50 print:min-h-0 print:bg-white">
      <div className="print:max-w-none print:px-0 print:py-0">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 print:rounded-none print:border-0 print:shadow-none">
          {children}
          {footer ? <div className="mt-8 border-t border-slate-100 pt-6 print:hidden">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
