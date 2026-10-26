import type { Metadata } from "next";
import { ContactSection } from "@/components/site/ContactSection";
import { Art, Container, Eyebrow } from "@/components/site/primitives";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Proposed collaboration areas for organizations working with AIMCORP on public-interest technology.",
};

export default function ServicesPage() {
  return (
    <>
      <Container className="pt-6 pb-14 sm:pt-10 sm:pb-20">
        <section className="max-w-[48rem]">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.07] font-extrabold tracking-[-0.035em] text-balance text-fg">
            {services.intro.heading}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-muted">
            {services.intro.body}
          </p>
        </section>
      </Container>

      {/* Who we collaborate with ---------------------------------------- */}
      <Container className="reveal pb-16 sm:pb-24">
        <section>
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold tracking-[-0.03em] text-fg">
            Who we collaborate with
          </h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-3">
            {services.audiences.map((audience) => (
              <li
                key={audience.title}
                className="rounded-[1.25rem] border border-edge bg-panel p-6"
              >
                <h3 className="text-[1.0625rem] leading-snug font-bold tracking-[-0.01em] text-fg">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {audience.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Challenges + proposed areas ------------------------------------ */}
      <Container className="reveal">
        <section className="rounded-[1.75rem] bg-panel p-6 sm:rounded-[2rem] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.14] font-bold tracking-[-0.03em] text-balance text-fg">
                Types of challenges we can address
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {services.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.14] font-bold tracking-[-0.03em] text-balance text-fg">
                Proposed collaboration areas
              </h2>
              <p className="mt-3 text-sm text-fg-muted/85 italic">
                Draft categories, pending approval — not confirmed service
                commitments.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.areas.map((area) => (
                  <li
                    key={area.title}
                    className="overflow-hidden rounded-[1.25rem] border border-edge bg-panel-2"
                  >
                    {area.art ? (
                      <div className="aspect-[16/7] w-full">
                        <Art src={area.art.src} alt={area.art.alt} />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <h3 className="text-[0.9375rem] leading-snug font-bold text-fg">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {area.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Container>

      {/* Draft process --------------------------------------------------- */}
      <Container className="reveal py-16 sm:py-24">
        <section>
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-bold tracking-[-0.03em] text-fg">
            How a collaboration could work
          </h2>
          <p className="mt-3 text-sm text-fg-muted/85 italic">
            A draft process, offered as a starting point.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.process.map((stage, index) => (
              <li
                key={stage.step}
                className="rounded-[1.25rem] border border-edge bg-surface-2 p-6"
              >
                <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-accent uppercase">
                  Step {index + 1}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-bold tracking-[-0.01em] text-fg">
                  {stage.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      {/* Contact ---------------------------------------------------------- */}
      <Container className="reveal" id="contact">
        <section className="scroll-mt-8 rounded-[1.75rem] bg-panel p-7 sm:rounded-[2rem] sm:p-12">
          <ContactSection />
        </section>
      </Container>
    </>
  );
}
