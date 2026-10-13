/**
 * Customer testimonials.
 *
 * This array is intentionally EMPTY. The site renders nothing from it until the
 * company supplies real, authorised reviews. Do not invent testimonials,
 * customer names or ratings — fabricated reviews are both misleading and a
 * legal risk. When genuine, permissioned reviews are provided, add them here in
 * the shape below and the section appears automatically.
 *
 * See README.md § "Confirm before launch".
 */
export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [];
