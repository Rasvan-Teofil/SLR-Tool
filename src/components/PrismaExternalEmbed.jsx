import ExternalToolEmbed from "./ExternalToolEmbed";
import SectionCard from "./SectionCard";
import { PRISMA_SHINY_APP_URL } from "../config/prismaExternalTool";

export default function PrismaExternalEmbed() {
  return (
    <SectionCard title="PRISMA-Flowdiagramm (externes Tool)">
      <ExternalToolEmbed
        embedUrl={PRISMA_SHINY_APP_URL}
        iframeTitle="PRISMA flow diagram — estech.shinyapps.io"
        stateSyncNote="Hinweis: Änderungen im eingebetteten Tool werden nicht automatisch in diesem Arbeitsblatt gespeichert."
      >
        <p className="text-xs leading-relaxed text-slate-600">
          Hier ist das PRISMA-Flowdiagramm-Tool von ESTech eingebettet. Du kannst es nutzen, um das Diagramm wie in der
          App auf shinyapps.io direkt in deiner Suchstrategie zu bearbeiten.
        </p>
      </ExternalToolEmbed>
    </SectionCard>
  );
}
