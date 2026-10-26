/**
 * ---------------------------------------------------------------------------
 * INITIATIVES — EDITORIAL CONTENT SLOTS
 * ---------------------------------------------------------------------------
 * Only the initiative NAMES are confirmed. Every other field below is an
 * approval slot: fill it with copy that has been signed off, and the matching
 * section appears on the site. Leave a field as `null` (or an empty array) and
 * the site either hides the section or renders a visible editorial placeholder
 * instead of inventing material.
 *
 * To publish approved content:
 *   purpose      -> one sentence, shown under the name on the initiative page
 *   cardSummary  -> one short line, shown on the homepage card
 *   status       -> optional stage note shown beside the name
 *   tagline      -> optional brand tagline shown under the name
 *   challenge    -> paragraphs describing the problem being addressed
 *   building     -> paragraphs describing what is being built
 *   audience     -> paragraphs describing who it is for
 *   video        -> set youtubeId once the video is published
 *   channels     -> set each href to a real account URL; never invent one
 *   features     -> named parts of the work, shown as a grid
 *   embed        -> an interactive tool served from /public
 *   gallery      -> real screenshots or photographs only
 *   resources    -> real, working links only
 *   image        -> replace `art` or add a real project image (see public/art)
 * ---------------------------------------------------------------------------
 */

export type InitiativeSlug =
  | "loka"
  | "oona"
  | "astria"
  | "stem-lab"
  | "sdoh-transformation";

export type ResourceLink = {
  label: string;
  href: string;
  description?: string;
};

/**
 * A video slot. The layout is in place before the video is; set `youtubeId`
 * once the video is published and the embed replaces the placeholder.
 */
export type VideoSlot = {
  /** YouTube video id, e.g. the "abc123" in youtu.be/abc123. */
  youtubeId: string | null;
  /** Used as the iframe title, so it must describe the video. */
  title: string;
  /** Shown in place of the player while youtubeId is null. */
  pendingNote: string;
};

/** A channel the initiative publishes on. */
export type Channel = {
  platform: string;
  /** Null until a real account URL is supplied — never invent one. */
  href: string | null;
};

/**
 * An embedded tool, served from /public and framed so its own styling stays
 * isolated from the site's.
 */
export type EmbedSlot = {
  /** Path under /public, e.g. "/tools/thing/index.html". */
  src: string;
  /** Iframe title — it must describe the tool for screen readers. */
  title: string;
  heading: string;
  description: string;
  /** Rendered height in pixels. */
  height: number;
};

/** A named part of what an initiative is building. */
export type Feature = {
  name: string;
  body: string;
};

/** Sections an initiative can opt out of entirely. */
export type InitiativeSection = "challenge" | "building" | "audience";

export type ImageSlot = {
  /** Swap this path for an approved asset; the layout does not change. */
  src: string;
  alt: string;
};

/** A real screenshot or photograph, with the context needed to read it. */
export type GalleryItem = ImageSlot & { caption?: string };

export type Initiative = {
  slug: InitiativeSlug;
  name: string;
  href: string;
  /** Approved one-sentence purpose. */
  purpose: string | null;
  /** Approved one-line card description. */
  cardSummary: string | null;
  /** Optional stage note, e.g. "Phase 0". Hidden when null. */
  status: string | null;
  /** Optional brand tagline shown under the name. Hidden when null. */
  tagline: string | null;
  /** Abstract placeholder artwork — replace with an approved project image. */
  art: ImageSlot;
  /** Optional project image for the initiative page; hidden when null. */
  image: ImageSlot | null;
  challenge: string[] | null;
  building: string[] | null;
  audience: string[] | null;
  /** Sections this initiative does not use; no placeholder is shown for them. */
  hiddenSections: InitiativeSection[];
  /** Optional video slot, shown after the challenge. Hidden when null. */
  video: VideoSlot | null;
  /** Channels to link out to. Hidden when empty. */
  channels: Channel[];
  /** Named parts of the work, shown as a grid. Hidden when empty. */
  features: Feature[];
  /** An interactive tool embedded in the page. Hidden when null. */
  embed: EmbedSlot | null;
  /** Real imagery only — never a mock-up presented as a screenshot. */
  gallery: GalleryItem[];
  /** A line above the gallery, e.g. what the imagery is and is not. */
  galleryNote: string | null;
  resources: ResourceLink[];
  /** Per-initiative accent, kept inside the blue family and deliberately quiet. */
  accent: string;
};

export const initiatives: Initiative[] = [
  {
    slug: "loka",
    name: "Loka",
    href: "/loka",
    /**
     * Written from the Loka mission and program overview plus the brand kit
     * (LOKA_ AIMCORP/). The tagline and accent come from brand-spec.txt v1.0.
     */
    purpose:
      "Loka makes public and global health policy legible and trustworthy for Gen Z, through cinematic, story-driven video built on real evidence.",
    cardSummary: "Brain food for your doomscroll.",
    status: null, // OPTIONAL: e.g. a season or production stage, once confirmed
    tagline: "for the community. by the community.",
    art: {
      src: "/art/initiative-loka.svg",
      alt: "The Loka mark: a gold ring crossed by teal orbits and a small network of nodes",
    },
    image: null, // OPTIONAL: a still or key frame could go here
    challenge: [
      "Health information travels on the same platforms as health misinformation, and the misinformation is usually the better made of the two. Correcting the record is not enough on its own \u2014 the correction has to arrive in a format people actually choose to watch.",
      "Loka exists to equip young people with information they can rely on: grounded in the literature, sourced from the people who do the work, and produced well enough to hold attention against everything else competing for it.",
    ],
    building: null,
    hiddenSections: ["building"], // the trailer takes this slot instead
    video: {
      youtubeId: "3mXnPpd7WMk",
      title: "Loka Documentary Season 1: Trailer",
      pendingNote: "The season trailer will play here once it\u2019s published.",
    },
    channels: [
      { platform: "YouTube", href: "https://www.youtube.com/@aimcorploka" },
      { platform: "Instagram", href: "https://www.instagram.com/loka.aimcorp/" },
      { platform: "TikTok", href: "https://www.tiktok.com/@aimcorploka" },
    ],
    features: [],
    embed: null,
    gallery: [],
    galleryNote: null,
    audience: [
      "Gen Z \u2014 for youth, by youth. The point is to leave viewers able to speak knowledgeably about the issues that affect them, and to champion healthier futures.",
      "And the organizations working on those issues, who can use the briefs and tools that come out of a season directly.",
    ],
    resources: [], // No public URL yet
    accent: "#e8a94a", // Beacon, from the Loka brand spec
  },
  {
    slug: "oona",
    name: "Oona",
    href: "/oona",
    /**
     * Sourced from the Oona project's own documentation (README.md and
     * src/context.md in the oona repository). The gallery images are real
     * screenshots of the concept prototypes in oona/prototypes.
     */
    purpose:
      "Oona is a research technology platform for women\u2019s health, community health and global health research.",
    cardSummary:
      "A connected research environment for women\u2019s, community and global health research.",
    status: null,
    tagline: null,
    art: {
      src: "/art/initiative-oona.svg",
      alt: "Abstract layered wave bands representing the Oona initiative",
    },
    image: null,
    challenge: [
      "Mixed-methods community research is essential to understanding how health and medicine actually play out at the grassroots \u2014 especially in underserved areas like women\u2019s health. It can involve vast surveys, datasets, transcriptions and experiments.",
      "Research teams must often juggle all of that with very little infrastructure behind them. It is hardest in exactly the settings the research serves: intermittent connectivity, multiple languages, sensitive health information, distributed field teams and long follow-up.",
      "Oona exists to take that weight off the people doing the work \u2014 to accelerate community-based research and to foreground women\u2019s and community health research. It is tailored to grassroots needs, and provides a suite of tools that can interface with the data reporting systems and records already in place.",
    ],
    hiddenSections: [],
    video: null,
    channels: [],
    building: [
      "Oona is organised as one research lifecycle \u2014 design, collect, connect, understand, act \u2014 rather than a set of separate tools bolted together. The capabilities below are the suite that lifecycle is built from.",
    ],
    embed: null,
    features: [
      {
        name: "Study",
        body: "Research design and study management: protocols, sites, eligibility, instruments, consent workflows and multilingual, versioned data dictionaries.",
      },
      {
        name: "Collect",
        body: "Mobile-first, offline-first collection in the field, including lightweight WhatsApp workflows so community health workers need not open the full application.",
      },
      {
        name: "Listen",
        body: "Qualitative data treated as first-class research data: parallel languages, redaction, human-validated coding, and themes that trace back to a timestamp.",
      },
      {
        name: "Cohort",
        body: "Longitudinal participant management across visits, households and follow-up windows.",
      },
      {
        name: "Field",
        body: "Operational tools for field research \u2014 team coordination, device state and synchronisation a supervisor can audit.",
      },
      {
        name: "Network",
        body: "The multi-institution partnerships research actually runs through, modelled rather than left implicit.",
      },
      {
        name: "Rules",
        body: "A configurable research workflow and rules engine for referrals, escalations and protocol logic.",
      },
      {
        name: "Connect",
        body: "Coexistence with the health and research infrastructure already in place, rather than an assumption that Oona replaces it.",
      },
      {
        name: "Intelligence",
        body: "Agentic analysis bound by a contract: trace, model comparison, triangulation, contradictory evidence, limitations, provenance, and a human decision at the end.",
      },
      {
        name: "Insights",
        body: "How a finding is communicated once it holds \u2014 to a team, a partner or a community.",
      },
      {
        name: "Library",
        body: "A searchable knowledge environment for women\u2019s and community health research.",
      },
      {
        name: "Community",
        body: "Research that supports action and learning inside the communities it draws on.",
      },
      {
        name: "Vault",
        body: "The governance and trust layer underneath the ecosystem.",
      },
    ],
    gallery: [
      {
        src: "/art/oona/study-command-center.jpg",
        alt: "The Oona study command center, showing enrolment, retention and open data-quality flags alongside patterns worth investigating",
        caption:
          "Study Command Center \u2014 a study\u2019s state answered at a glance, with intelligence on the front page rather than in a separate tab.",
      },
      {
        src: "/art/oona/intelligence-investigate.jpg",
        alt: "An Oona investigation showing an analysis trace, an investigation brief and a provenance panel side by side",
        caption:
          "Investigate \u2014 every step inspectable and re-runnable, every claim labelled by evidence type and traced to its source.",
      },
      {
        src: "/art/oona/listen.jpg",
        alt: "Oona Listen, showing qualitative transcripts in parallel languages with coding and themes",
        caption:
          "Listen \u2014 qualitative evidence in parallel languages, with human-validated coding.",
      },
      {
        src: "/art/oona/collect-field.jpg",
        alt: "Oona Collect and Field, showing field team status and synchronisation state",
        caption:
          "Collect & Field \u2014 the four questions a field researcher always has, and synchronisation you can audit.",
      },
      {
        src: "/art/oona/participant-journey.jpg",
        alt: "A participant record shown as a timeline across four channels with consent, referrals and an audit trail",
        caption:
          "Participant Journey \u2014 a participant as a timeline across channels, with consent, referrals and an audit trail on one record.",
      },
    ],
    galleryNote: "All data shown is sample data.",
    audience: [
      "Research teams working in women\u2019s health, community health and global health, including implementation research, longitudinal population research, mixed-methods research, and field research in low-connectivity environments.",
      "The people who carry that work day to day: field researchers, community health workers, and the multi-institution partnerships that run studies across sites.",
    ],
    resources: [], // No public URL yet
    accent: "#f1a9ab", // the Oona mark's salmon
  },
  {
    slug: "astria",
    name: "Astria",
    href: "/astria",
    /**
     * Written from the Astria project's own documentation (README.md and
     * ASTRIA-PITCH-CONTEXT.md). The figures below are the ones that file
     * marks VERIFIED against a primary source; keep the attributions.
     */
    purpose:
      "Astria is a care-navigation platform for people leaving incarceration.",
    cardSummary: "Care navigation for people leaving incarceration.",
    status: null,
    tagline: "Every point of care. One path forward.",
    art: {
      src: "/art/initiative-astria.svg",
      alt: "Many separate paths converging on a single star",
    },
    image: null,
    challenge: [
      "In the first two weeks after release from prison, the risk of death is 12.7 times that of the general population (Binswanger et al., New England Journal of Medicine, 2007). Around 80% of people leaving incarceration have a chronic medical, psychiatric or substance use condition (ASPE Report to Congress, 2023).",
      "Every health system in America is built around continuous enrollment, and this population churns \u2014 in and out of custody, on and off Medicaid, across counties and phone numbers. A health plan\u2019s responsibility ends at disenrollment. A clinic\u2019s ends when someone leaves the panel. A jail\u2019s ends at release. Each system is working correctly when it drops them.",
    ],
    hiddenSections: [],
    video: null,
    channels: [],
    building: [
      "Astria is the layer that does not drop them. It onboards someone before release from whatever records exist, assembles a care team around them, and keeps checking that the connection holds \u2014 at a cadence that relaxes as confidence grows and tightens the moment a signal breaks.",
      "AI compresses the administrative work so a human can do relational work more often, never so a human does it less. AI never appears as a person: every message to a patient is sent by a named human who can be reached back.",
    ],
    features: [
      {
        name: "Onboard",
        body: "Before release, from whatever records the facility already has.",
      },
      {
        name: "Assemble",
        body: "Match to a clinic of record, behavioral health, and the wider care team around them.",
      },
      {
        name: "Hold on",
        body: "Keep checking the connection survives \u2014 easing off as confidence grows, tightening the moment a signal breaks.",
      },
      {
        name: "Argo",
        body: "The AI system, with a human in the loop, that runs onboarding: extracts uploaded records, assembles the Medicaid application, matches providers and writes documentation.",
      },
      {
        name: "Astria ID",
        body: "A private, encrypted identifier that resolves one person across a booking number, a Medicaid ID and clinic record numbers. Not a health record, not a government identifier, and never visible to corrections, courts, probation or parole.",
      },
      {
        name: "Care Promoter",
        body: "A community health worker employed by Astria, hired from the population served where possible. The human the patient actually deals with.",
      },
      {
        name: "Community network",
        body: "Local programs \u2014 food, housing, transport, recovery \u2014 on the same platform, so a plan is built from what is genuinely nearby and open.",
      },
    ],
    embed: null,
    gallery: [],
    galleryNote: null,
    audience: [
      "County health departments, health systems and reentry programs.",
      "And the people the platform is for: anyone leaving jail or prison whose care has to survive the transition.",
    ],
    resources: [],
    accent: "#4776e6", // Celestial, from the Astria brand tokens
  },
  {
    slug: "stem-lab",
    name: "STEM Lab",
    href: "/stem-lab",
    /**
     * Framing supplied by AIMCORP. The embedded tool is the real Equilibrium
     * Bench, served from /public/tools. The pitch deck under resources is the
     * supplied PDF — its contents have not been transcribed into this page.
     */
    purpose:
      "STEM Lab builds teaching tools \u2014 digital and tactile \u2014 to improve how K\u201312 science is taught and what students take away from it.",
    cardSummary: "Teaching tools, digital and tactile, for K\u201312 classrooms.",
    status: null,
    tagline: null,
    art: {
      src: "/art/initiative-stem-lab.svg",
      alt: "Abstract connected node lattice representing the STEM Lab initiative",
    },
    image: null,
    challenge: null,
    hiddenSections: ["challenge"], // the page opens on what we're building
    video: null,
    channels: [],
    building: [
      "Two kinds of tools for the same lesson. Software, where a simulation can do the work of showing what is happening. And totes \u2014 physical kits of materials and the teaching guide that goes with them, which go to a classroom and stay there.",
    ],
    features: [
      {
        name: "Digital interactives",
        body: "Browser-based tools a teacher opens from a link. Nothing to install, no account to make.",
      },
      {
        name: "Classroom totes",
        body: "Tactile kits: the materials for an activity, packed with the guide for teaching it.",
      },
      {
        name: "Several representations at once",
        body: "The interactive below shows the particulate, macroscopic and symbolic views together, so students can connect what molecules do to what they would see and to the maths.",
      },
      {
        name: "Built against real units",
        body: "Tools target what is actually taught. The first is built for Honors and AP Chemistry Unit 7.",
      },
    ],
    embed: {
      src: "/tools/equilibrium-bench/index.html",
      title: "Equilibrium Bench \u2014 an interactive chemistry simulation",
      heading: "Equilibrium Bench",
      description:
        "Disturb a reaction at equilibrium and watch it respond three ways at once: the molecules, what you would see in the lab, and the maths of Q and K.",
      height: 980,
    },
    gallery: [],
    galleryNote: null,
    audience: [
      "K\u201312 science teachers, and the students in their classrooms.",
      "Schools and programs looking for classroom materials they can pick up and use as they are.",
    ],
    resources: [
      {
        label: "STEM Lab pitch deck",
        href: "/docs/aimcorp-stem-lab-pitchdeck.pdf",
        description: "PDF",
      },
    ],
    accent: "#a39cff",
  },
  {
    slug: "sdoh-transformation",
    name: "SDoH Transformation",
    href: "/sdoh-transformation",
    /**
     * Written from the ED Care Closet project documentation (README.md,
     * PROJECT_SUMMARY.md and ARCHITECTURE.md in the ed-care-closet repo).
     * ED Care Closet is one project under this initiative — the broader
     * framing for the initiative itself is still awaiting approved copy.
     */
    purpose:
      "Making the response to patients\u2019 social needs part of clinical care rather than something that happens beside it.",
    cardSummary:
      "Social needs answered at the point of care, inside the clinical record.",
    status: null,
    tagline: null,
    art: {
      src: "/art/initiative-sdoh-transformation.svg",
      alt: "Abstract nested contour shapes representing the SDoH Transformation initiative",
    },
    image: null,
    challenge: [
      "People are readmitted because of what happens after they leave. Whether a discharge holds comes down to housing, food, transport and the practical means to manage a condition at home \u2014 and for the most vulnerable patients, those are exactly the things most likely to be missing.",
      "Hospitals already screen for this. Housing, hygiene, food and transportation insecurity get asked about, recorded, and then handed to a volunteer donation closet the clinical system cannot see: no order, no tracking, no record that anything was delivered.",
      "So the need is known and the help exists, but the two are joined by hand, and nothing about it reaches the chart. Closing that gap is how a hospital can support someone\u2019s health beyond the point they walk out.",
    ],
    hiddenSections: [],
    video: null,
    channels: [],
    building: [
      "ED Care Closet, the first project under this initiative, is a working prototype that turns that closet into a clinical workflow: a screening result qualifies a patient for a kit, a nurse orders it, a volunteer picks and scans it, the delivery is confirmed, and the intervention is written back to the record as a completed procedure.",
      "It is built FHIR-native on HL7 FHIR R4 and designed to be SMART-on-FHIR compatible, so the same workflow can move onto Epic or another EHR without being rebuilt. Patient, Encounter and Observation carry the clinical context and the screening result; ServiceRequest carries the order; Task carries the volunteer\u2019s work; Procedure carries the documentation back.",
    ],
    embed: null,
    features: [
      {
        name: "Screening to qualification",
        body: "A configurable rules engine reads SDOH screening results \u2014 housing, hygiene, food and transportation insecurity \u2014 and determines which intervention kits a patient qualifies for.",
      },
      {
        name: "Ordering and fulfillment",
        body: "Nurses order from the patient\u2019s context; volunteers work a task queue, scan the physical kit by barcode, and confirm delivery.",
      },
      {
        name: "Inventory",
        body: "Stock levels, low-stock alerts and barcode generation for the kits themselves.",
      },
      {
        name: "EHR integration",
        body: "Standard FHIR R4 resources throughout, with writeback so a delivered kit appears in the record as a documented intervention.",
      },
      {
        name: "Operational analytics",
        body: "Fulfillment times, kit distribution and the audit trail behind both.",
      },
    ],
    gallery: [],
    galleryNote: null,
    audience: [
      "Emergency department staff who screen for social needs, and the volunteers who fulfil what gets ordered.",
      "The hospitals and health systems that want the response to those needs documented in the record rather than tracked on paper beside it.",
    ],
    resources: [],
    accent: "#8cb6dd",
  },
];

export function getInitiative(slug: InitiativeSlug): Initiative {
  const match = initiatives.find((item) => item.slug === slug);
  if (!match) throw new Error(`Unknown initiative: ${slug}`);
  return match;
}

/** Shown wherever approved copy has not been supplied yet. */
export const initiativePlaceholders = {
  card: "Description pending editorial approval.",
  purpose: "A one-sentence purpose for this initiative is awaiting approval.",
  challenge:
    "The challenge this initiative addresses has not been approved for publication yet.",
  building:
    "A description of what is being built has not been approved for publication yet.",
  audience:
    "The intended audience for this initiative has not been confirmed yet.",
};
