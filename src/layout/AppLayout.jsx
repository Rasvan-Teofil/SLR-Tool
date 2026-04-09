import { Outlet } from "react-router-dom";
import StepNavigation from "../components/StepNavigation";

export default function AppLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6">
      <StepNavigation />
      <Outlet />
    </div>
  );
}
