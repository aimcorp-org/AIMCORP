import type { NextConfig } from "next";
import path from "path";
import { programs, programHref } from "./lib/programs";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    const legacyProgramRedirects = programs.flatMap((program) =>
      (program.legacySlugs ?? []).map((legacy) => ({
        source: `/${legacy}`,
        destination: programHref(program),
        permanent: false,
      })),
    );

    return [
      ...legacyProgramRedirects,
      // ---------------------------------------------------------------
      // Pages that exist on the current aimcorp.org (WordPress) and have
      // no equivalent here. Kept as temporary redirects so any of them can
      // be rebuilt later without fighting a cached permanent redirect.
      // /suhanphilosophy is deliberately absent: personal writing, left to 404.
      // ---------------------------------------------------------------
      { source: "/aimcorp-loka", destination: "/loka", permanent: false },
      { source: "/innovation", destination: "/archive", permanent: false },
      { source: "/supporters", destination: "/archive", permanent: false },
      {
        source: "/internship-application",
        destination: "/archive",
        permanent: false,
      },
      {
        source: "/aimcorp-leadership-applications",
        destination: "/archive",
        permanent: false,
      },
      { source: "/yakshgana", destination: "/archive", permanent: false },
      { source: "/yashagana-show", destination: "/archive", permanent: false },
      { source: "/new-programs", destination: "/outreach", permanent: false },
      {
        source: "/online-education",
        destination: "/outreach",
        permanent: false,
      },
      { source: "/mailing-list-signup", destination: "/", permanent: false },
      // The retired LearnPress course catalogue.
      { source: "/course/:slug", destination: "/outreach", permanent: false },
      { source: "/programs", destination: "/philanthropy", permanent: false },
      {
        source: "/programs/:slug",
        destination: "/philanthropy/:slug",
        permanent: false,
      },
      { source: "/join-us", destination: "/join", permanent: false },
      { source: "/venmo", destination: "/donate", permanent: false },
      {
        source: "/aimcorp-x-womens-health",
        destination: "/stories/womens-health",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
