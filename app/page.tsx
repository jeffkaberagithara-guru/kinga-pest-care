import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { ServicesOverview } from "@/components/home/services-overview";
import { Process } from "@/components/home/process";
import { AmbientBand } from "@/components/home/ambient-band";
import { Safety } from "@/components/home/safety";
import { Contexts } from "@/components/home/contexts";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { RequestSection } from "@/components/home/request-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <Process />
      <AmbientBand />
      <Safety />
      <Contexts />
      <Testimonials />
      <FaqSection />
      <RequestSection />
    </>
  );
}
