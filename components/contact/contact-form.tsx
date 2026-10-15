"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, Loader2, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  contactMethods,
  contactSchema,
  fieldErrors,
  propertyTypes,
  serviceOptions,
  type ContactMethod,
  type PropertyType,
  type ServiceOption,
} from "@/lib/validation";
import { services } from "@/config/services";
import { siteConfig, telLink, waLink } from "@/config/site";
import { cn } from "@/lib/cn";

const propertyLabels: Record<PropertyType, string> = {
  home: "House / home",
  apartment: "Apartment",
  rental: "Rental / managed property",
  office: "Office / workspace",
  hospitality: "Hotel / hospitality",
  retail: "Retail / food service",
  school: "School / institution",
  warehouse: "Warehouse / light industry",
  other: "Other",
};

const methodLabels: Record<ContactMethod, string> = {
  phone: "Phone call",
  whatsapp: "WhatsApp",
  email: "Email",
};

function serviceLabel(value: ServiceOption): string {
  if (value === "not-sure") return "Not sure — needs assessment";
  if (value === "other") return "Other / not listed";
  return services.find((s) => s.slug === value)?.name ?? value;
}

const fieldOrder = [
  "name",
  "phone",
  "email",
  "propertyType",
  "service",
  "serviceArea",
  "message",
  "contactMethod",
  "consent",
] as const;

const inputClass = (invalid: boolean) =>
  cn(
    "w-full rounded-[var(--radius-sm)] border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-text",
    "transition-colors placeholder:text-muted/70 focus:border-primary",
    invalid ? "border-danger" : "border-border-strong hover:border-muted/60",
  );

type Status = "idle" | "submitting" | "success" | "error" | "not_configured";

export function ContactForm({ deliveryConfigured = true }: { deliveryConfigured?: boolean }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "" as PropertyType | "",
    service: "" as ServiceOption | "",
    serviceArea: "",
    message: "",
    contactMethod: "phone" as ContactMethod,
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState("");
  const submitting = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (status === "success") requestAnimationFrame(() => successRef.current?.focus());
  }, [status]);

  const update = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const focusFirstError = (fieldErrorsMap: Record<string, string>) => {
    const first = fieldOrder.find((field) => fieldErrorsMap[field]);
    // Fields are addressed by `field-*` id; the radio group has no single id,
    // so fall back to the first control that shares the field's `name`.
    const target = first
      ? (document.getElementById(`field-${first}`) ??
        document.querySelector<HTMLElement>(`[name="${first}"]`))
      : null;
    if (target) {
      target.focus();
    } else {
      summaryRef.current?.focus();
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fe = fieldErrors(parsed.error);
      setErrors(fe);
      setStatus("error");
      setFormMessage("Please check the highlighted fields and try again.");
      focusFirstError(fe);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setFormMessage("");
    submitting.current = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok?: boolean; message?: string; errors?: Record<string, string> } =
        await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setFormMessage(
          data.message ?? "Thank you — your request has been received. We'll be in touch shortly.",
        );
        setValues((prev) => ({ ...prev, message: "" }));
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("error");
        setFormMessage("Please check the highlighted fields and try again.");
        focusFirstError(data.errors);
        return;
      }

      if (response.status === 503) {
        setStatus("not_configured");
        setFormMessage(
          data.message ?? "Online requests aren't connected yet. Please call or WhatsApp.",
        );
        return;
      }

      setStatus("error");
      setFormMessage(
        data.message ?? "Something went wrong sending your request. Please try again or call us.",
      );
    } catch {
      setStatus("error");
      setFormMessage("We couldn't reach the server. Please check your connection or call us.");
    } finally {
      submitting.current = false;
    }
  }

  const hasErrors = Object.keys(errors).length > 0;

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-[var(--radius-panel)] border border-border bg-surface p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-success-soft">
          <Check className="size-6 text-success" aria-hidden="true" />
        </span>
        <h3 className="text-h3 text-text">Request received</h3>
        <p className="text-body text-text-secondary">{formMessage}</p>
        <p className="text-small text-muted">
          This is an inspection request, not a confirmed booking. We&rsquo;ll confirm the details
          with you before anything is scheduled.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setStatus("idle");
            setFormMessage("");
            setErrors({});
            setValues({
              name: "",
              phone: "",
              email: "",
              propertyType: "",
              service: "",
              serviceArea: "",
              message: "",
              contactMethod: "phone",
              consent: false,
              website: "",
            });
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-[var(--radius-panel)] border border-border bg-surface p-6 sm:p-8"
      aria-label="Inspection request form"
    >
      {!deliveryConfigured && (
        <div className="mb-6 flex gap-3 rounded-[var(--radius-card)] border border-border bg-surface-3 p-4 text-small text-text-secondary">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-clay-deep" aria-hidden="true" />
          <p>
            Online requests are not connected in this preview. You can still send the form, or{" "}
            <a href={telLink()} className="link-underline font-semibold text-primary">
              call
            </a>{" "}
            /{" "}
            <a
              href={waLink("Hello KINGA Pest Care, I would like to request an inspection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-primary"
            >
              WhatsApp
            </a>{" "}
            us directly.
          </p>
        </div>
      )}

      {status === "not_configured" && (
        <div className="mb-6 rounded-[var(--radius-card)] border border-clay/40 bg-surface-3 p-4">
          <p className="text-small text-text-secondary">{formMessage}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={telLink()}
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-pill)] bg-primary px-4 text-small font-semibold text-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={waLink("Hello KINGA Pest Care, I would like to request an inspection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-pill)] border border-primary px-4 text-small font-semibold text-primary"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Error summary: announced, and focusable for keyboard users. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={cn(
          "rounded-[var(--radius-card)] text-small",
          hasErrors && "mb-6 border border-danger/40 bg-danger-soft px-4 py-3 text-danger",
        )}
      >
        {hasErrors ? (
          <p>{formMessage || "Please check the highlighted fields and try again."}</p>
        ) : status === "error" ? (
          <p>{formMessage}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-name" label="Your name" required error={errors.name}>
          <input
            id="field-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field id="field-phone" label="Phone number" required error={errors.phone}>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+254 …"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="field-email"
            label="Email"
            optionalLabel
            error={errors.email}
            hint="Optional — add it if you'd prefer a written reply."
          >
            <input
              id="field-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "error-email" : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>
        </div>

        <Field id="field-propertyType" label="Property type" required error={errors.propertyType}>
          <select
            id="field-propertyType"
            name="propertyType"
            required
            value={values.propertyType}
            onChange={(e) => update("propertyType", e.target.value as PropertyType)}
            aria-invalid={Boolean(errors.propertyType)}
            aria-describedby={errors.propertyType ? "error-propertyType" : undefined}
            className={inputClass(Boolean(errors.propertyType))}
          >
            <option value="" disabled>
              Select a property type
            </option>
            {propertyTypes.map((value) => (
              <option key={value} value={value}>
                {propertyLabels[value]}
              </option>
            ))}
          </select>
        </Field>

        <Field id="field-service" label="What is the problem?" required error={errors.service}>
          <select
            id="field-service"
            name="service"
            required
            value={values.service}
            onChange={(e) => update("service", e.target.value as ServiceOption)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "error-service" : undefined}
            className={inputClass(Boolean(errors.service))}
          >
            <option value="" disabled>
              Select a category
            </option>
            {serviceOptions.map((value) => (
              <option key={value} value={value}>
                {serviceLabel(value)}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="field-serviceArea"
          label="Where is the property?"
          required
          error={errors.serviceArea}
          hint="Town or neighbourhood is enough."
        >
          <input
            id="field-serviceArea"
            name="serviceArea"
            autoComplete="address-level2"
            required
            value={values.serviceArea}
            onChange={(e) => update("serviceArea", e.target.value)}
            aria-invalid={Boolean(errors.serviceArea)}
            aria-describedby={errors.serviceArea ? "error-serviceArea" : undefined}
            className={inputClass(Boolean(errors.serviceArea))}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="field-message"
            label="Describe what you've noticed"
            required
            error={errors.message}
            hint="Where you've seen it, how long it has been happening, and anything you've already tried."
          >
            <textarea
              id="field-message"
              name="message"
              rows={4}
              required
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "error-message" : undefined}
              className={cn(inputClass(Boolean(errors.message)), "min-h-28 resize-y")}
            />
          </Field>
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-invalid={Boolean(errors.contactMethod)}
          aria-describedby={errors.contactMethod ? "error-contactMethod" : undefined}
        >
          <legend className="text-small font-semibold text-text">
            Preferred way to reply <span className="text-clay-deep">*</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {contactMethods.map((method) => (
              <label
                key={method}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-pill)] border px-4 py-2.5 text-small font-medium transition-colors",
                  values.contactMethod === method
                    ? "border-primary bg-primary text-white"
                    : "border-border-strong text-text-secondary hover:border-primary",
                )}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={() => update("contactMethod", method)}
                  className="sr-only"
                />
                {methodLabels[method]}
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p id="error-contactMethod" className="mt-2 text-small text-danger">
              {errors.contactMethod}
            </p>
          )}
        </fieldset>

        {/* Honeypot — hidden from users and screen readers, visible to bots. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="field-website">Website</label>
          <input
            id="field-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="field-consent"
          name="consent"
          type="checkbox"
          required
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "error-consent" : undefined}
          className="mt-1 size-5 shrink-0 rounded-[var(--radius-xs)] border-border-strong text-primary accent-[var(--color-primary)]"
        />
        <div>
          <label htmlFor="field-consent" className="text-small text-text-secondary">
            I agree to KINGA Pest Care contacting me about this request, and I have read the{" "}
            <a href="/privacy" className="link-underline font-semibold text-primary">
              privacy notice
            </a>
            . <span className="text-clay-deep">*</span>
          </label>
          {errors.consent && (
            <p id="error-consent" className="mt-1.5 text-small text-danger">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2
                className="size-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            "Request an inspection"
          )}
        </Button>
        <p className="text-small text-muted">We reply during business hours. {siteConfig.hours}</p>
      </div>

      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your request." : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optionalLabel,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-small font-semibold text-text">
        {label}{" "}
        {required && (
          <span className="text-clay-deep" aria-hidden="true">
            *
          </span>
        )}
        {optionalLabel && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-small text-muted">{hint}</p>}
      {error && (
        <p id={`error-${id.replace("field-", "")}`} className="mt-1.5 text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
