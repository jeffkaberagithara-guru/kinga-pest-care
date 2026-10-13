/**
 * The service process — how a request moves from first contact to aftercare.
 * Copy is deliberately specific and free of any assurance about outcome.
 */

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Tell us what you're seeing",
    body: "Send a request or call. A few details about the pest, the property and your location is enough for us to take it from there.",
  },
  {
    number: "02",
    title: "Inspection & assessment",
    body: "We inspect the property to identify the pest, how far activity extends and the conditions allowing it. This is what makes the treatment appropriate rather than generic.",
  },
  {
    number: "03",
    title: "Plan & preparation",
    body: "You get a clear plan: what will be done, what you need to prepare beforehand, and any specific precautions for your household or premises.",
  },
  {
    number: "04",
    title: "Treatment & aftercare",
    body: "Treatment is carried out by qualified staff. Afterwards we explain re-entry, ventilation and follow-up — and what to do if activity continues.",
  },
];
