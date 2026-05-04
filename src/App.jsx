import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { WorkshopProvider } from "./context/WorkshopContext";
import AppLayout from "./layout/AppLayout";
import ConceptMatrixPage from "./pages/ConceptMatrixPage";
import DashboardPage from "./pages/DashboardPage";
import ResearchQuestionPage from "./pages/ResearchQuestionPage";
import ResourcesPage from "./pages/ResourcesPage";
import StartPage from "./pages/StartPage";
import SearchStrategyPage from "./pages/SearchStrategyPage";
import SynthesisPage from "./pages/SynthesisPage";

export default function App() {
  return (
    <HashRouter>
      <WorkshopProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<StartPage />} />
            <Route path="/forschungsfrage" element={<ResearchQuestionPage />} />
            <Route path="/suchstrategie" element={<SearchStrategyPage />} />
            <Route path="/konzeptmatrix" element={<ConceptMatrixPage />} />
            <Route path="/synthese" element={<SynthesisPage />} />
            <Route path="/ressourcen" element={<ResourcesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </WorkshopProvider>
    </HashRouter>
  );
}
