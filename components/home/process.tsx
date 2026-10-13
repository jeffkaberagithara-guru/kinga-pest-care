import { SectionHeading } from "@/components/ui/section-heading";
import { StepList } from "@/components/ui/step-list";
import { processSteps } from "@/config/process";

export function Process() {
  return (
    <section id="approach" className="py-section">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Our approach"
            title="Four steps, and no guesswork."
            intro="Every job follows the same discipline: understand the problem, then treat it, then tell you clearly what happens next."
          />
        </div>

        <StepList steps={processSteps} className="lg:col-span-7" />
      </div>
    </section>
  );
}
