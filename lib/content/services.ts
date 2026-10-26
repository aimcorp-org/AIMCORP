/**
 * ---------------------------------------------------------------------------
 * SERVICES — DRAFT COLLABORATION CATEGORIES
 * ---------------------------------------------------------------------------
 * Everything in this file is a proposal awaiting approval. These are not
 * confirmed service commitments, and no client, testimonial, price or delivery
 * timeline belongs here.
 * ---------------------------------------------------------------------------
 */

export type CollaborationArea = {
  title: string;
  body: string;
  art?: { src: string; alt: string };
};

/** The two themes featured on the homepage collaboration section. */
export const featuredCollaborationAreas: CollaborationArea[] = [
  {
    title: "Digital tools and experiences",
    body: "Proposed: designing and building the software, interfaces and content a mission needs.",
    art: {
      src: "/art/collaboration-tools.svg",
      alt: "Abstract stacked panels representing digital tools and experiences",
    },
  },
  {
    title: "Technical capacity and practical innovation",
    body: "Proposed: strengthening how a team builds, maintains and improves its own technology.",
    art: {
      src: "/art/collaboration-capacity.svg",
      alt: "Abstract ascending modules representing growing technical capacity",
    },
  },
];

export const services = {
  intro: {
    heading: "Collaborate with AIMCORP.",
    body: "We work alongside mission-driven organizations to understand a need, build something practical, and leave the capability behind. The areas below are proposed directions, offered as a starting point for a conversation rather than a fixed menu.",
  },

  /** Who we collaborate with — draft categories. */
  audiences: [
    {
      title: "Nonprofits and community organizations",
      body: "Teams delivering services who need tools that fit how they actually work.",
    },
    {
      title: "Public-interest and civic programs",
      body: "Programs where better information, workflow or access would change outcomes.",
    },
    {
      title: "Research and academic groups",
      body: "Groups turning study findings and prototypes into something usable.",
    },
  ],

  /** Types of challenges we can address — draft categories. */
  challenges: [
    "A manual process that no longer scales with the work.",
    "Information held across disconnected tools, spreadsheets and inboxes.",
    "A prototype or pilot that needs to become something maintainable.",
    "A service that is hard to reach for the people it is meant to serve.",
    "A team that wants to build internally but has no technical foundation.",
  ],

  /** Proposed collaboration areas — draft, pending approval. */
  areas: [
    ...featuredCollaborationAreas,
    {
      title: "Design and research",
      body: "Proposed: understanding users, shaping the problem, and testing directions before building.",
    },
    {
      title: "Data and infrastructure",
      body: "Proposed: making the information an organization holds usable, reliable and safe to work with.",
    },
  ] as CollaborationArea[],

  /** Draft process. */
  process: [
    {
      step: "Understand",
      body: "We spend time with the people doing the work and define the problem together.",
    },
    {
      step: "Scope",
      body: "We agree on what is worth building first, and what deliberately comes later.",
    },
    {
      step: "Build",
      body: "We design and develop in the open, reviewing with you as it takes shape.",
    },
    {
      step: "Transfer knowledge",
      body: "We hand over documentation, access and the know-how to keep it running.",
    },
  ],

  /**
   * CONTACT
   * The address is stored in two halves and only joined in the browser, so
   * the published HTML never contains a scrapable mailto: link.
   *
   * The form composes a message and hands it to the visitor's mail client —
   * it does not post anywhere, so there is no backend to run or secure. To
   * collect submissions directly instead, paste a Google Form "embed" URL
   * (Send -> <> -> the src of the iframe) into googleFormEmbedUrl and the
   * form below is replaced by it.
   */
  contact: {
    emailUser: "contact.aimcorp",
    emailDomain: "aimcorp.org",
    googleFormEmbedUrl: null as string | null,
  },
};
