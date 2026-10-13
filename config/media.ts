/**
 * Media registry.
 *
 * Every photograph and video used on the site is listed here with its source,
 * author and licence so the asset register in README.md stays accurate. These
 * are licensed stock placeholders: replace them with photographs of the actual
 * company, team, equipment and completed work before launch.
 *
 * Licence: all entries below are sourced from Pexels under the Pexels License
 * (free for commercial use, no attribution required). Attribution is recorded
 * here and in README.md regardless, as good practice.
 *
 * Imagery rules (DESIGN.md §12): no frightening pest close-ups, pesticide
 * clouds or misleading before/after; nothing presented as proof of the
 * company's own work. Alt text is descriptive and meaningful.
 */

export type PhotoCredit = {
  author: string;
  source: string;
  licence: string;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: PhotoCredit;
};

const PEXELS = "Pexels License";

const credit = (author: string, photo: number): PhotoCredit => ({
  author,
  source: `https://www.pexels.com/photo/${photo}/`,
  licence: PEXELS,
});

/** Shared editorial photographs (hero, context panels, about). */
export const photos = {
  hero: {
    src: "/img/home-hero.jpg",
    width: 1600,
    height: 2399,
    alt: "A bright, minimalist living room with a grey sofa, modern artwork and a large window",
    credit: credit("Lisa Anna", 19836798),
  },
  contextResidential: {
    src: "/img/context-residential.jpg",
    width: 1600,
    height: 1573,
    alt: "A bright living room with soft white sofas and sheer curtains",
    credit: credit("Beyza Kılıçdere", 29012619),
  },
  contextCommercial: {
    src: "/img/context-commercial.jpg",
    width: 1600,
    height: 2400,
    alt: "An elegant hotel lobby with warm lighting and plush seating",
    credit: credit("Clément Proust", 29649756),
  },
  aboutApproach: {
    src: "/img/about-approach.jpg",
    width: 1600,
    height: 1067,
    alt: "A bright, contemporary living room with red armchairs and natural light",
    credit: credit("Алан Албегов", 27023397),
  },
} satisfies Record<string, Photo>;

/** One supporting photograph per service (keyed by `Service.slug`). */
export const servicePhotos: Record<string, Photo> = {
  "cockroach-control": {
    src: "/img/svc-cockroach.jpg",
    width: 1600,
    height: 2399,
    alt: "A clean, sunlit modern kitchen counter",
    credit: credit("Marcus", 18033166),
  },
  "termite-management": {
    src: "/img/svc-termite.jpg",
    width: 1600,
    height: 2133,
    alt: "A traditional house exterior with a solid wooden front door",
    credit: credit("Yelena Wegel", 17490027),
  },
  "bedbug-treatment": {
    src: "/img/svc-bedbug.jpg",
    width: 1600,
    height: 2133,
    alt: "A neatly made bed in a softly lit room",
    credit: credit("Екатерина Cтепаненко", 19980080),
  },
  "rodent-management": {
    src: "/img/svc-rodent.jpg",
    width: 1600,
    height: 1067,
    alt: "Neatly stocked shelves in a grocery aisle",
    credit: credit("ha ha", 16211537),
  },
  "mosquito-control": {
    src: "/img/svc-mosquito.jpg",
    width: 1600,
    height: 1067,
    alt: "A garden fountain surrounded by shrubs and flowers",
    credit: credit("Karen F", 17460103),
  },
  "ant-and-crawling-insect-control": {
    src: "/img/svc-ants.jpg",
    width: 1600,
    height: 2400,
    alt: "Neatly organised storage containers on pantry shelves",
    credit: credit("Théo Cold", 34005910),
  },
  "residential-pest-management": {
    src: "/img/svc-residential.jpg",
    width: 1600,
    height: 1200,
    alt: "A tranquil garden with flowers and greenery behind a house",
    credit: credit("Enrique", 25972319),
  },
  "commercial-pest-management": {
    src: "/img/svc-commercial.jpg",
    width: 1600,
    height: 2133,
    alt: "Sunlight falling through the beams of a large warehouse",
    credit: credit("James L", 15177112),
  },
};

/**
 * Ambient hero band video.
 *
 * A single, muted, decorative clip. It is only mounted on larger screens when
 * the visitor has not asked for reduced motion; otherwise the still poster is
 * shown, so the band never gates content and never fails accessibility.
 */
export const ambientVideo = {
  src: "/media/hero-ambient.mp4",
  poster: "/media/hero-ambient-poster.jpg",
  width: 960,
  height: 540,
  alt: "Soft green foliage moving gently",
  credit: {
    author: "Pexels contributor",
    source: "https://www.pexels.com/video/11556237/",
    licence: PEXELS,
  },
};
