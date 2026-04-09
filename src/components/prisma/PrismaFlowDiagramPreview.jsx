import { buildPrismaClassicLayout } from "../../lib/buildPrismaClassicLayout";

const railClass =
  "flex w-10 shrink-0 items-stretch justify-center self-stretch rounded-md border border-black bg-[#B8C9DC] px-1.5 sm:w-11 sm:px-2";
const railTextClass =
  "my-auto box-border max-w-full px-0.5 py-4 text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-black sm:py-5 sm:text-[9px] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180";
const boxClass =
  "flex min-h-[4.75rem] items-center justify-center border border-black bg-white px-2 py-2 text-center text-[11px] font-normal leading-snug text-black sm:min-h-[5rem] sm:text-xs";
const flowGapClass = "gap-1.5 sm:gap-2";

function FlowBox({ children, className = "" }) {
  return <div className={`${boxClass} ${className}`.trim()}>{children}</div>;
}

function PhaseRail({ label }) {
  return (
    <div className={railClass} aria-hidden>
      <span className={railTextClass}>{label}</span>
    </div>
  );
}

function ArrowDownGlyph() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" className="shrink-0 text-black" aria-hidden>
      <path d="M7 1 v11 M2.5 9.5 L7 15  l4.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Centered under the left (primary) box; same column split as data rows (sm+). */
function ArrowDownUnderPrimary() {
  return (
    <div className={`flex ${flowGapClass}`}>
      <div className="w-10 shrink-0 sm:w-11" aria-hidden />
      <div className={`grid min-w-0 flex-1 grid-cols-1 ${flowGapClass} sm:grid-cols-[1fr_auto_1fr]`}>
        <div className="flex justify-center py-0.5 sm:justify-center">
          <ArrowDownGlyph />
        </div>
        <div className="hidden sm:block" aria-hidden />
        <div className="hidden sm:block" aria-hidden />
      </div>
    </div>
  );
}

/** Inside screening block: content width only; arrow under left column. */
function ArrowDownUnderPrimaryInner() {
  return (
    <div className={`grid min-w-0 grid-cols-1 ${flowGapClass} sm:grid-cols-[1fr_auto_1fr]`}>
      <div className="flex justify-center py-0.5">
        <ArrowDownGlyph />
      </div>
      <div className="hidden sm:block" aria-hidden />
      <div className="hidden sm:block" aria-hidden />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="pointer-events-none flex min-w-[0.75rem] shrink-0 items-center justify-center text-black" aria-hidden>
      <svg width="20" height="12" viewBox="0 0 20 12" className="text-black">
        <path d="M1 6 h14 M12 2.5 L17 6  l-5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function CenterLines({ parts }) {
  return (
    <div className="flex flex-col gap-0.5">
      {parts.map((line, i) => (
        <span key={i} className={i === 0 ? "font-medium" : ""}>
          {line}
        </span>
      ))}
    </div>
  );
}

export default function PrismaFlowDiagramPreview({ flow }) {
  const L = buildPrismaClassicLayout(flow);

  return (
    <div
      className="overflow-x-auto rounded-md border border-slate-300 bg-white print:border-black"
      role="img"
      aria-label="PRISMA 2020 flow diagram preview"
    >
      <div className="min-w-[300px] p-2 sm:p-3">
        <div className="mb-2 rounded-md border border-black bg-[#FFC107] px-2 py-2 text-center text-[11px] font-medium leading-snug text-black sm:text-xs">
          {L.header}
        </div>

        <div className={`flex ${flowGapClass}`}>
          <PhaseRail label="Identification" />
          <div className={`grid min-w-0 flex-1 grid-cols-1 sm:grid-cols-[1fr_auto_1fr] ${flowGapClass}`}>
            <FlowBox>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{L.identification.center.title}</span>
                <span>{L.identification.center.line}</span>
                {L.identification.center.detail ? (
                  <span className="text-[10px] text-slate-800">{L.identification.center.detail}</span>
                ) : null}
              </div>
            </FlowBox>
            <div className="hidden shrink-0 items-center justify-center sm:flex">
              <ArrowRight />
            </div>
            <FlowBox>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{L.identification.right.title}</span>
                <span>{L.identification.right.line}</span>
              </div>
            </FlowBox>
          </div>
        </div>

        <ArrowDownUnderPrimary />

        <div className={`flex ${flowGapClass}`}>
          <PhaseRail label="Screening" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {L.screeningRows.map((row, idx) => (
              <div key={idx}>
                <div className={`grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] ${flowGapClass}`}>
                  <FlowBox>
                    <CenterLines parts={row.center} />
                  </FlowBox>
                  <div className="hidden items-center justify-center sm:flex">
                    <ArrowRight />
                  </div>
                  <FlowBox>
                    <CenterLines parts={row.right} />
                  </FlowBox>
                </div>
                {idx < L.screeningRows.length - 1 ? <ArrowDownUnderPrimaryInner /> : null}
              </div>
            ))}
          </div>
        </div>

        <ArrowDownUnderPrimary />

        <div className={`flex ${flowGapClass}`}>
          <PhaseRail label="Included" />
          <div className={`grid min-w-0 flex-1 grid-cols-1 sm:grid-cols-[1fr_auto_1fr] ${flowGapClass}`}>
            <FlowBox className="sm:col-span-2">
              <CenterLines parts={L.included.lines} />
            </FlowBox>
          </div>
        </div>
      </div>
    </div>
  );
}
