/**
 * Service catalogue.
 *
 * IMPORTANT — configuration required:
 * The services below are a *typical* pest-management offering used to build and
 * demonstrate the site. Before launch, confirm with the company exactly which
 * services it provides, and delete any it does not. Do not advertise a service
 * the business cannot deliver. See README.md § "Confirm before launch".
 *
 * No efficacy guarantee, no "chemical-free" claim and no universal-safety claim
 * appears anywhere in this file, by design. Treatment specifics are described as
 * what varies, not as an assurance of outcome.
 *
 * `icon` is a key into the map in components/ui/service-tile.tsx.
 */

export type Service = {
  slug: string;
  name: string;
  /** One-line summary for cards and listings. */
  short: string;
  /** Editorial intro paragraph for the service page. */
  summary: string;
  /** Since this is a "living shield" idea, each service names what it protects. */
  protects: string;
  icon: "bug" | "wood" | "bed" | "rodent" | "water" | "crawl" | "home" | "building";
  /** Signs that may indicate this pest — written as observations, not a diagnosis. */
  signs: string[];
  /** Families of approach. Deliberately non-specific about products. */
  approach: { title: string; body: string }[];
  /** Area of focus for this service. */
  focus: string[];
};

export const services: Service[] = [
  {
    slug: "cockroach-control",
    name: "Cockroach control",
    short: "Targeted control for cockroach activity in kitchens, voids and service areas.",
    summary:
      "Cockroaches thrive where there is warmth, moisture and accessible food. Control starts with finding where they are harbouring — not only where they are seen — then treating those areas and giving you practical steps to remove what is attracting them.",
    protects: "Kitchens, food storage and family living areas",
    icon: "bug",
    signs: [
      "Droppings or smears near skirting, sockets or appliance seals",
      "A musty odour in cupboards or behind units",
      "Activity at night when lights are switched off",
      "Egg cases in warm, undisturbed voids",
    ],
    approach: [
      {
        title: "Locate the harbourage",
        body: "We inspect the warm, dark and damp spaces where cockroaches shelter, rather than only treating visible surfaces.",
      },
      {
        title: "Treat the source",
        body: "Treatment is targeted to harbourage and travel routes, using the method the site and situation call for.",
      },
      {
        title: "Reduce the attraction",
        body: "We advise on moisture, food access and clutter so conditions work against a return.",
      },
    ],
    focus: ["Kitchens and food stores", "Cupboards and service voids", "Drains and wet areas"],
  },
  {
    slug: "termite-management",
    name: "Termite management",
    short: "Assessment and management of termite risk to structures and timber.",
    summary:
      "Termites are often noticed only once damage is visible, and the visible damage is rarely where the colony is. A careful property assessment identifies activity and risk to timber, then a management plan is agreed around the construction and the level of activity found.",
    protects: "Timber, doors, roofs and structural joinery",
    icon: "wood",
    signs: [
      "Mud tubes on walls, foundations or skirting",
      "Hollow-sounding timber or blistered paint",
      "Discarded wings near windows and lights",
      "Sagging or soft wood in doors and frames",
    ],
    approach: [
      {
        title: "Assess the property",
        body: "We check the structure, adjoining timber and moisture conditions to understand the extent of activity and risk.",
      },
      {
        title: "Agree a plan",
        body: "Management is planned around the building's construction, so work is appropriate to the site.",
      },
      {
        title: "Plan for monitoring",
        body: "Termite management is ongoing. We explain what to watch for and what follow-up may involve.",
      },
    ],
    focus: ["Timber structures", "Doors and frames", "Foundations and adjacent ground"],
  },
  {
    slug: "bedbug-treatment",
    name: "Bedbug treatment",
    short: "Careful, staged treatment for bedbugs in sleeping and living areas.",
    summary:
      "Bedbugs hide in seams, frames and crevices close to where people sleep, which makes preparation and a staged approach essential. We assess the extent of activity first, then treat and plan the follow-up that bedbug work usually requires.",
    protects: "Beds, bedrooms and living spaces",
    icon: "bed",
    signs: [
      "Small bites in lines or clusters on waking",
      "Dark spotting along mattress seams and frames",
      "Live insects or shed skins in crevices",
      "A sweetish odour in heavily affected rooms",
    ],
    approach: [
      {
        title: "Confirm and map",
        body: "We confirm activity and identify the rooms and areas involved so treatment is properly scoped.",
      },
      {
        title: "Prepare properly",
        body: "Preparation is part of the result. We give clear written steps before treatment so the work is not undermined.",
      },
      {
        title: "Stage the follow-up",
        body: "Bedbug work commonly needs more than one visit. We explain the schedule and what to expect between visits.",
      },
    ],
    focus: ["Beds and frames", "Bedroom furniture", "Cracks, seams and crevices"],
  },
  {
    slug: "rodent-management",
    name: "Rodent management",
    short: "Control of rats and mice, with practical proofing of entry points.",
    summary:
      "Rats and mice cause damage, contaminate food and move through gaps you would not expect. Control combines safe placement of control measures with sealing the routes they use, so the problem is not simply cycled through.",
    protects: "Food stores, wiring and building fabric",
    icon: "rodent",
    signs: [
      "Droppings along walls and in cupboards",
      "Gnaw marks on packaging, wiring or pipework",
      "Scratching or movement in ceilings at night",
      "Grease trails and nesting material in voids",
    ],
    approach: [
      {
        title: "Trace the activity",
        body: "We identify runs, nesting areas and the entry points rodents are using to reach them.",
      },
      {
        title: "Place measures safely",
        body: "Control measures are placed to be effective and kept away from children, pets and food preparation areas.",
      },
      {
        title: "Proof the entry points",
        body: "We point out the gaps and routes that need sealing, and what can be done about them.",
      },
    ],
    focus: ["Food stores and kitchens", "Ceilings and roof voids", "Exterior entry points"],
  },
  {
    slug: "mosquito-control",
    name: "Mosquito control",
    short: "Reduction of mosquito breeding sites and adult activity around a property.",
    summary:
      "Mosquitoes need standing water. Control is most durable when breeding sites are found and removed alongside treatment of resting and adult activity, so the cycle is interrupted rather than only knocked back.",
    protects: "Outdoor living, gardens and water features",
    icon: "water",
    signs: [
      "Persistent biting around the property at dusk",
      "Standing water in containers, drains or gutters",
      "Larvae visible in still water",
      "Adults resting in shaded, damp areas",
    ],
    approach: [
      {
        title: "Find the water",
        body: "We survey the property for the standing water and damp shade that allow mosquitoes to breed and rest.",
      },
      {
        title: "Treat the site",
        body: "Treatment is directed to breeding and resting sites appropriate to the property.",
      },
      {
        title: "Keep water moving",
        body: "We explain how to keep containers, drains and gutters from becoming new breeding sites.",
      },
    ],
    focus: ["Gardens and compounds", "Drains and gutters", "Water containers and features"],
  },
  {
    slug: "ant-and-crawling-insect-control",
    name: "Ants & crawling insects",
    short: "Control of ants, and other crawling insects entering from outside.",
    summary:
      "Ants and other crawling insects usually enter from outside along a consistent route. Finding the trail and the nest, where it can be found, is more effective than treating the surfaces where they appear.",
    protects: "Kitchens, pantries and ground-floor rooms",
    icon: "crawl",
    signs: [
      "Trails along walls, skirting or paths",
      "Activity around food, bins and pet bowls",
      "Small mounds or disturbed soil outside",
      "Insects appearing after rain or warm spells",
    ],
    approach: [
      {
        title: "Follow the trail",
        body: "We trace activity back toward the entry point and, where possible, the nest.",
      },
      {
        title: "Treat the route",
        body: "Treatment is directed at the trail and entry rather than only where insects are visible.",
      },
      {
        title: "Close the gap",
        body: "We advise on the cracks, thresholds and gaps that let crawling insects in.",
      },
    ],
    focus: ["Kitchens and pantries", "Skirting and thresholds", "Paths and planting beds"],
  },
  {
    slug: "residential-pest-management",
    name: "Residential pest management",
    short: "A whole-home assessment for households dealing with one pest or several.",
    summary:
      "Homes rarely have a single, isolated problem. A residential inspection looks at the property as a whole — the pests present, the conditions supporting them and the practical guidance your household needs — and results in a clear, agreed plan.",
    protects: "The whole home and the people in it",
    icon: "home",
    signs: [
      "More than one pest seen over time",
      "Recurring problems after DIY treatment",
      "Concerns about children, pets or food areas",
      "A move-in, move-out or rental handover",
    ],
    approach: [
      {
        title: "Inspect the whole home",
        body: "We assess inside and out, taking in the conditions that allow pests to return.",
      },
      {
        title: "Agree a household plan",
        body: "Treatment is planned around your household, including how preparation and re-entry will work for you.",
      },
      {
        title: "Leave you clear guidance",
        body: "You get straightforward aftercare guidance so you know what to do, and what to expect, next.",
      },
    ],
    focus: ["Detached and semi-detached homes", "Apartments and rentals", "Compounds and gardens"],
  },
  {
    slug: "commercial-pest-management",
    name: "Commercial & workplace services",
    short: "Discreet pest management for businesses, premises and institutions.",
    summary:
      "For businesses, pest activity is a compliance and reputation issue as much as a practical one. We work around operating hours, keep records where they are needed and coordinate with the people responsible for the premises.",
    protects: "Premises, staff, customers and reputation",
    icon: "building",
    signs: [
      "Sightings in kitchens, stores or waste areas",
      "Audit, inspection or certification requirements",
      "A recurring issue affecting operations",
      "A new premises or refit needing assessment",
    ],
    approach: [
      {
        title: "Assess the premises",
        body: "We survey the site and its risk areas, taking your operating requirements into account.",
      },
      {
        title: "Work around your hours",
        body: "Visits are arranged so treatment does not disrupt trading, service or opening hours where possible.",
      },
      {
        title: "Keep it documented",
        body: "Where your business needs records, we discuss what documentation and schedule suit your requirements.",
      },
    ],
    focus: [
      "Offices and workspaces",
      "Hospitality and food service",
      "Stores, schools and institutions",
    ],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);
