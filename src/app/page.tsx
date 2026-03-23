import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyCognition from "@/components/WhyCognition";
import PlatformOverview from "@/components/PlatformOverview";
import TechnologySection from "@/components/TechnologySection";
import DevinVisual from "@/components/visuals/DevinVisual";
import WindsurfVisual from "@/components/visuals/WindsurfVisual";
import CLIVisual from "@/components/visuals/CLIVisual";
import PRReviewVisual from "@/components/visuals/PRReviewVisual";
import DanaVisual from "@/components/visuals/DanaVisual";
import ParadigmShift from "@/components/ParadigmShift";
import SDLCSection from "@/components/SDLCSection";
import Traction from "@/components/Traction";
import Founders from "@/components/Founders";
import Culture from "@/components/Culture";
import MediaHub from "@/components/MediaHub";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <WhyCognition />

      <PlatformOverview />

      <TechnologySection
        id="devin"
        label="Devin"
        title="A virtual engineering resource."
        description="Devin is an autonomous AI software engineer that operates as a strategic capacity resource: planning, building, testing, and deploying across your programmes. It reasons like a senior engineer, executes like a team, and scales like infrastructure."
        bullets={[
          "Autonomous end-to-end delivery across the full SDLC",
          "Fleet orchestration, with one Devin directing many in parallel",
          "Full codebase and organisational context from day one",
          "Governance-aware. Operates within your permissions, controls, and audit trail",
        ]}
        visual={<DevinVisual />}
      />

      <TechnologySection
        label="Windsurf"
        title="Where humans and AI collaborate."
        description="Windsurf is the shared surface where engineers and AI work together, not just on code, but on architecture, planning, debugging, and delivery. Deep contextual understanding across your entire engineering environment."
        bullets={[
          "Cascade: multi-step AI flows with full project awareness",
          "Architecture-level reasoning, not just line-level suggestions",
          "Integrated terminal, debugging, deployment, and review",
          "Built on open standards. Your extensions and workflows carry over",
        ]}
        visual={<WindsurfVisual />}
        reversed
      />

      <TechnologySection
        label="Devin CLI"
        title="Dispatch engineering capacity from anywhere."
        description="Allocate Devin instances directly from your terminal. Run parallel workstreams, pipe in context, and orchestrate autonomous engineering at the command line."
        bullets={[
          "Natural language task dispatch and orchestration",
          "Parallel execution across multiple Devin instances",
          "Structured output with full reasoning trace",
          "Pipeline-native. Integrates with your CI/CD and shell workflows",
        ]}
        visual={<CLIVisual />}
      />

      <TechnologySection
        label="Devin Review"
        title="Engineering review at institutional scale."
        description="Every pull request reviewed with full architectural context, codebase understanding, and organisational standards. Not linting, but genuine engineering judgement applied consistently across your entire delivery pipeline."
        bullets={[
          "Full codebase context that catches architectural and logic issues",
          "Enforces organisational standards and security practices at scale",
          "Concrete improvement suggestions with reasoning",
          "Learns and adapts to your team's conventions over time",
        ]}
        visual={<PRReviewVisual />}
        reversed
      />

      <TechnologySection
        label="Dana"
        title="AI data analyst."
        description="Ask questions in plain English. Dana writes the queries, builds the visualizations, and delivers insights, no SQL required."
        bullets={[
          "Natural language to SQL with full schema awareness",
          "Auto-generated charts and dashboards",
          "Connects to your existing data warehouse",
          "Iterative analysis. Refine results conversationally",
        ]}
        visual={<DanaVisual />}
      />

      <ParadigmShift />

      <SDLCSection />

      <Traction />

      <Founders />

      <Culture />

      <MediaHub />

      <CTA />

      <footer className="py-8 px-6 text-center">
        <p className="text-xs text-[#bbb]">
          &copy; {new Date().getFullYear()} Cognition AI, Inc.
        </p>
      </footer>
    </main>
  );
}
