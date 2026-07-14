import { Header } from "./Header";
import { Footer } from "./Footer";
import { AgentWidget } from "@/components/agent/AgentWidget";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AgentWidget />
    </>
  );
}
