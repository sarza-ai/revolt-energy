import { Hero } from "@/components/hero/Hero";
import { Advantage } from "@/components/sections/Advantage";
import { SolutionsHorizontal } from "@/components/sections/SolutionsHorizontal";
import { NetworkStrip } from "@/components/sections/NetworkStrip";
import { LevelCharts } from "@/components/sections/LevelCharts";
import { DualCta } from "@/components/sections/DualCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Advantage />
      {/* Network strip breaks up advantage + pillars so two 4-item grids aren't back-to-back */}
      <NetworkStrip />
      <SolutionsHorizontal />
      <LevelCharts />
      <DualCta />
    </>
  );
}
