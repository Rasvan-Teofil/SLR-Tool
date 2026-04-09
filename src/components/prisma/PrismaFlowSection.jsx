import SectionCard from "../SectionCard";
import PrismaFlowFormFields from "./PrismaFlowFormFields";
import PrismaFlowDiagramPreview from "./PrismaFlowDiagramPreview";

export default function PrismaFlowSection({ flow, onChangeConfig, onChangeCount }) {
  return (
    <SectionCard title="PRISMA flow diagram">
      <div className="space-y-4">
        <p className="text-xs leading-relaxed text-slate-600">
          Use the narrative PRISMA text areas above for prose; enter counts here for the data-driven preview (e.g.
          for later CSV or PDF export).
        </p>
        <PrismaFlowFormFields flow={flow} onChangeConfig={onChangeConfig} onChangeCount={onChangeCount} />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
          <PrismaFlowDiagramPreview flow={flow} />
        </div>
      </div>
    </SectionCard>
  );
}
