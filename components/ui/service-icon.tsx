import {
  BedDouble,
  Bug,
  Building2,
  Footprints,
  Home,
  Rat,
  TreePine,
  Waves,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/config/services";
import { cn } from "@/lib/cn";

export const serviceIconMap: Record<Service["icon"], LucideIcon> = {
  bug: Bug,
  wood: TreePine,
  bed: BedDouble,
  rodent: Rat,
  water: Waves,
  crawl: Footprints,
  home: Home,
  building: Building2,
};

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = serviceIconMap[icon];
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}
