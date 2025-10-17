import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
