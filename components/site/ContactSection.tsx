"use client";

import { useEffect, useState } from "react";
import { services } from "@/lib/content/services";

/**
 * The address is assembled in the browser so it never ships in the HTML as a
 * plain mailto: link. Before hydration the page shows a readable but
 * unscrapable form of it, which is also what a visitor without JavaScript
 * keeps.
 */
function useEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const { emailUser, emailDomain } = services.contact;
    setEmail(`${emailUser}@${emailDomain}`);
  }, []);
  return email;
}

export function ContactSection() {
  const email = useEmail();
  const { emailUser, emailDomain, googleFormEmbedUrl } = services.contact;

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    const subject = organization
      ? `Collaboration enquiry — ${organization}`
      : "Collaboration enquiry";
    const body = [
      name && `From: ${name}`,
      organization && `Organization: ${organization}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-xl border border-edge bg-surface-2 px-4 py-3 text-[0.9375rem] text-fg placeholder:text-fg-muted/60 focus:border-edge-strong focus:outline-none";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance text-fg">
          Start a conversation
        </h2>
        <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-fg-muted">
          Tell us about the work and what you are trying to solve. We read
          everything that comes in.
        </p>

        <p className="mt-6 text-sm text-fg-muted">
          Or email us directly:{" "}
          {email ? (
            <a
              href={`mailto:${email}`}
              className="font-semibold text-accent hover:text-fg"
            >
              {email}
            </a>
          ) : (
            <span className="font-semibold text-fg">
              {emailUser} [at] {emailDomain}
            </span>
          )}
        </p>
      </div>

      {googleFormEmbedUrl ? (
        <div className="overflow-hidden rounded-[1.25rem] border border-edge bg-white">
          <iframe
            src={googleFormEmbedUrl}
            title="Collaboration enquiry form"
            loading="lazy"
            className="block w-full border-0"
            style={{ height: "760px" }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.8125rem] font-medium text-fg-muted">
                Your name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.8125rem] font-medium text-fg-muted">
                Organization
              </span>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className={field}
                autoComplete="organization"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8125rem] font-medium text-fg-muted">
              What are you working on?
            </span>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${field} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="mt-1 w-fit rounded-full bg-fg px-6 py-3 text-[0.9375rem] font-semibold text-[#101620] transition-colors duration-200 hover:bg-white"
          >
            Compose this message
          </button>
          <p className="text-xs leading-relaxed text-fg-muted/80">
            This opens your own mail app with the message ready to send, so
            nothing is submitted to a third party.
          </p>
        </form>
      )}
    </div>
  );
}
