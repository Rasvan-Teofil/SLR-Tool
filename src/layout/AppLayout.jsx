import { Outlet } from "react-router-dom";
import StepNavigation from "../components/StepNavigation";

export default function AppLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-2 md:px-6 md:pb-10 md:pt-3">
      <div className="sticky top-0 z-50 -mx-4 mb-3 bg-slate-50/95 px-4 py-2 backdrop-blur-md print:hidden md:-mx-6 md:px-6">
        <StepNavigation />
      </div>
      <Outlet />
    </div>
  );
}
