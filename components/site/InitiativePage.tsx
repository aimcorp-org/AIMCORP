import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Initiative } from "@/lib/content/initiatives";
import { initiativePlaceholders } from "@/lib/content/initiatives";
import {
  ArrowIcon,
  Art,
  ButtonLink,
  Container,
  ContentPlaceholder,
  Eyebrow,
} from "./primitives";

/**
 * Reusable shell for every initiative page.
 *
 * Sections with approved copy render normally; sections still awaiting copy
 * render a visible editorial placeholder. Genuinely optional slots — the
 * project image and the resources list — are hidden entirely when empty
 * rather than padded with invented material.
 */

export function initiativeMetadata(initiative: Initiative): Metadata {
  return {
    title: initiative.name,
    description:
      initiative.purpose ??
      `${initiative.name} is an AIMCORP initiative. Published details are pending approval.`,
  };
}

function Section({
  heading,
  paragraphs,
  placeholder,
  children,
}: {
  heading: string;
  paragraphs: string[] | null;
  placeholder: string;
  children?: ReactNode;
}) {
  return (
    <section className="reveal border-t border-edge pt-8">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-fg">
        {heading}
      </h2>
      <div className="mt-4 max-w-[62ch]">
        {paragraphs && paragraphs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[1.0625rem] leading-relaxed text-fg-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <ContentPlaceholder>{placeholder}</ContentPlaceholder>
        )}
      </div>
      {children}
    </section>
  );
}

function FeatureGrid({ initiative }: { initiative: Initiative }) {
  if (initiative.features.length === 0) return null;
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {initiative.features.map((feature) => (
        <li
          key={feature.name}
          className="rounded-[1.25rem] border border-edge bg-surface-2 p-5"
        >
          <h3
            className="text-[0.9375rem] font-bold tracking-[-0.01em]"
            style={{ color: initiative.accent }}
          >
            {feature.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {feature.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

function EmbedSection({ initiative }: { initiative: Initiative }) {
  const embed = initiative.embed;
  if (!embed) return null;

  return (
    <section className="reveal border-t border-edge pt-8">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-fg">
        {embed.heading}
      </h2>
      <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-fg-muted">
        {embed.description}
      </p>

      {/* Framed so the tool keeps its own styling, isolated from the site's. */}
      <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-edge bg-white">
        <iframe
          src={embed.src}
          title={embed.title}
          loading="lazy"
          className="block w-full border-0"
          style={{ height: `${embed.height}px` }}
        />
      </div>

      <p className="mt-3 text-sm text-fg-muted">
        <a
          href={embed.src}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-accent hover:text-fg"
        >
          Open it in a new tab
        </a>{" "}
        for more room.
      </p>
    </section>
  );
}

function GallerySection({ initiative }: { initiative: Initiative }) {
  if (initiative.gallery.length === 0) return null;
  const [lead, ...rest] = initiative.gallery;

  return (
    <section className="reveal border-t border-edge pt-8">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-fg">
        From the platform
      </h2>
      {initiative.galleryNote ? (
        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-fg-muted/85 italic">
          {initiative.galleryNote}
        </p>
      ) : null}

      <figure className="mt-6">
        <div className="overflow-hidden rounded-[1.25rem] border border-edge">
          <Art src={lead.src} alt={lead.alt} />
        </div>
        {lead.caption ? (
          <figcaption className="mt-3 text-sm leading-relaxed text-fg-muted">
            {lead.caption}
          </figcaption>
        ) : null}
      </figure>

      {rest.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((item) => (
            <figure key={item.src}>
              <div className="overflow-hidden rounded-[1.25rem] border border-edge">
                <Art src={item.src} alt={item.alt} />
              </div>
              {item.caption ? (
                <figcaption className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function VideoSection({ initiative }: { initiative: Initiative }) {
  const video = initiative.video;
  if (!video) return null;
  const unlinked = initiative.channels.some((channel) => !channel.href);

  return (
    <section className="reveal border-t border-edge pt-8">
      <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-fg">
        Watch
      </h2>

      <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-edge">
        <div className="relative aspect-video w-full">
          {video.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              {/* No broken player: the slot holds its shape until the video exists. */}
              <Art src={initiative.art.src} alt="" />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "rgba(9,13,19,0.72)" }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full border"
                  style={{ borderColor: initiative.accent }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px">
                    <path d="M8 5.5v13l11-6.5z" fill={initiative.accent} />
                  </svg>
                </span>
                <p className="max-w-[36ch] text-[0.9375rem] leading-relaxed text-fg-muted">
                  {video.pendingNote}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {initiative.channels.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-fg-muted/70 uppercase">
            Channels
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {initiative.channels.map((channel) =>
              channel.href ? (
                <li key={channel.platform}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-edge-strong px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg transition-colors duration-200 hover:bg-white/5"
                  >
                    {channel.platform}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </li>
              ) : (
                <li
                  key={channel.platform}
                  className="rounded-full border border-dashed border-edge px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg-muted/60"
                >
                  {channel.platform}
                </li>
              ),
            )}
          </ul>
          {unlinked ? (
            <p className="mt-3 text-sm text-fg-muted/85 italic">
              Dashed channels are not linked yet.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function InitiativePage({ initiative }: { initiative: Initiative }) {
  const hasResources = initiative.resources.length > 0;

  return (
    <>
      <Container className="pt-2 pb-6 sm:pb-10">
        <section className="relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 sm:min-h-[420px] sm:rounded-[2rem] sm:p-12">
          <div className="absolute inset-0 -z-10">
            <Art
              src={initiative.art.src}
              alt={initiative.art.alt}
              priority
            />
          </div>
          <div
            className="absolute inset-0 -z-10"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(100deg, rgba(9,13,19,0.9) 0%, rgba(9,13,19,0.72) 45%, rgba(9,13,19,0.4) 100%)",
            }}
          />
          <Eyebrow>Initiative</Eyebrow>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] font-extrabold tracking-[-0.035em] text-fg">
            {initiative.name}
          </h1>
          {/* Optional brand tagline — hidden when the initiative has none. */}
          {initiative.tagline ? (
            <p
              className="mt-3 text-[1.0625rem] font-medium"
              style={{ color: initiative.accent }}
            >
              {initiative.tagline}
            </p>
          ) : null}
          {/* Optional stage note — hidden when the initiative has none. */}
          {initiative.status ? (
            <p className="mt-4 w-fit rounded-full border border-edge-strong px-3.5 py-1.5 text-[0.8125rem] font-medium text-fg-muted">
              {initiative.status}
            </p>
          ) : null}
          <div className="mt-5 max-w-[52ch]">
            {initiative.purpose ? (
              <p className="text-[1.0625rem] leading-relaxed text-fg-muted">
                {initiative.purpose}
              </p>
            ) : (
              <ContentPlaceholder>
                {initiativePlaceholders.purpose}
              </ContentPlaceholder>
            )}
          </div>
        </section>
      </Container>

      <Container className="pb-16 sm:pb-24">
        {/* Optional project image — hidden until an approved asset exists. */}
        {initiative.image ? (
          <div className="reveal mb-14 overflow-hidden rounded-[1.5rem] border border-edge">
            <div className="aspect-[16/9] w-full">
              <Art src={initiative.image.src} alt={initiative.image.alt} />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-12">
          {initiative.hiddenSections.includes("challenge") ? null : (
            <Section
              heading="The challenge"
              paragraphs={initiative.challenge}
              placeholder={initiativePlaceholders.challenge}
            />
          )}

          <VideoSection initiative={initiative} />

          <GallerySection initiative={initiative} />

          {initiative.hiddenSections.includes("building") ? null : (
            <Section
              heading="What we’re building"
              paragraphs={initiative.building}
              placeholder={initiativePlaceholders.building}
            >
              <FeatureGrid initiative={initiative} />
            </Section>
          )}

          {initiative.hiddenSections.includes("audience") ? null : (
            <Section
              heading="Intended audience"
              paragraphs={initiative.audience}
              placeholder={initiativePlaceholders.audience}
            />
          )}

          <EmbedSection initiative={initiative} />

          {/* Optional — hidden entirely when no real links are supplied. */}
          {hasResources ? (
            <section className="reveal border-t border-edge pt-8">
              <h2 className="text-[1.375rem] font-bold tracking-[-0.02em] text-fg">
                Resources and updates
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {initiative.resources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      className="group flex items-start justify-between gap-4 rounded-[1.25rem] border border-edge bg-surface-2 p-5 transition-colors duration-300 hover:border-edge-strong"
                    >
                      <span>
                        <span className="block font-semibold text-fg">
                          {resource.label}
                        </span>
                        {resource.description ? (
                          <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                            {resource.description}
                          </span>
                        ) : null}
                      </span>
                      <ArrowIcon className="mt-1 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <section className="reveal mt-16 flex flex-col items-start gap-5 rounded-[1.5rem] bg-panel p-7 sm:mt-20 sm:p-10">
          <h2 className="max-w-[22ch] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-fg">
            Working on something related?
          </h2>
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-fg-muted">
            We collaborate with mission-driven organizations on public-interest
            technology.
          </p>
          <ButtonLink href="/services">Collaborate with us</ButtonLink>
        </section>
      </Container>
    </>
  );
}
