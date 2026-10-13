/** Minimal class joiner. Deliberately not a dependency — a dozen characters of need. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
