/**
 * Frequently asked questions.
 *
 * Safety answers are written to be honest rather than reassuring. They state
 * that preparation, ventilation and re-entry depend on the product, the method
 * and the property — and that customers must follow the label and the
 * technician's instructions. No answer promises zero risk, universal safety or
 * guaranteed eradication.
 */

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How do I know which service I need?",
    answer:
      "You do not have to diagnose it yourself. Tell us what you have seen and where. An inspection identifies the pest and how far activity extends, and that determines the treatment. Many properties turn out to need something different from what was first suspected.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Cost depends on the pest, the size and type of the property, and the extent of activity found during inspection. We inspect first and then quote, so the price reflects the actual job rather than a guess. Request an inspection and we will explain what is involved before any work is agreed.",
  },
  {
    question: "Is the treatment safe for my children and pets?",
    answer:
      "No treatment should be described as risk-free. Pest-control products are applied for a reason, and how they are used matters. Safety depends on the product, the method and your property — so your technician will tell you exactly what precautions, ventilation and re-entry timing apply to your treatment. Always follow the product label and the instructions you are given.",
  },
  {
    question: "Do I need to leave my home during treatment?",
    answer:
      "Often not for the whole visit, but it depends entirely on the treatment. Some methods allow you to remain away only from the areas being treated for a short time; others require the property to be vacated for a period. Your plan will state what applies to you before the visit, so you can arrange accordingly.",
  },
  {
    question: "How should I prepare before you arrive?",
    answer:
      "Preparation improves results and is different for each treatment. It might include clearing cupboards, washing and containing bedding, moving food and utensils, or covering surfaces. We give you written preparation steps when the visit is arranged — please follow those rather than improvising.",
  },
  {
    question: "How long before I can use the space again?",
    answer:
      "Re-entry timing varies by product and method, and cannot be given as a single number. Your technician will confirm when it is safe to return and how long to ventilate, based on what was actually applied. Follow that instruction and the product label.",
  },
  {
    question: "Can you guarantee the pests are gone?",
    answer:
      "We do not promise eradication. Pest management depends on the species, the property, conditions and how well follow-up guidance is followed. What we do promise is a proper assessment, a treatment suited to the problem, clear aftercare guidance and a plan for any follow-up the situation needs.",
  },
  {
    question: "Do you work with businesses and premises?",
    answer:
      "Yes. We work with households and with commercial and institutional premises. For businesses we can arrange visits around operating hours and discuss the records your organisation needs. Contact us with your requirements.",
  },
];
