import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { StructuredData } from "@/components/seo/structured-data";

const SITE_URL = "https://example.test";
const PLACEHOLDER_EMAIL = "hello@example.co.ke";

const savedAddress1 = process.env.NEXT_PUBLIC_ADDRESS_1;
const savedEmail = process.env.NEXT_PUBLIC_EMAIL;

const restore = (key: string, value: string | undefined) => {
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
};

const output = () => renderToStaticMarkup(createElement(StructuredData, { siteUrl: SITE_URL }));

const graph = () => {
  const markup = output()
    .replace(/^<script[^>]*>/, "")
    .replace(/<\/script>$/, "");
  const parsed = JSON.parse(markup) as { "@graph": Record<string, unknown>[] };
  return parsed["@graph"];
};

const nodeTypes = () => graph().map((node) => String(node["@type"] ?? ""));

afterEach(() => {
  restore("NEXT_PUBLIC_ADDRESS_1", savedAddress1);
  restore("NEXT_PUBLIC_EMAIL", savedEmail);
});

describe("StructuredData", () => {
  it("always emits an Organization and a WebSite node", () => {
    delete process.env.NEXT_PUBLIC_ADDRESS_1;
    delete process.env.NEXT_PUBLIC_EMAIL;

    expect(nodeTypes()).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
  });

  it("emits no LocalBusiness while the address is unconfirmed", () => {
    delete process.env.NEXT_PUBLIC_ADDRESS_1;
    delete process.env.NEXT_PUBLIC_EMAIL;

    expect(nodeTypes()).not.toContain("LocalBusiness");
  });

  it("never publishes the placeholder email address", () => {
    process.env.NEXT_PUBLIC_ADDRESS_1 = "12 Example Street";
    delete process.env.NEXT_PUBLIC_EMAIL;

    expect(output()).not.toContain(PLACEHOLDER_EMAIL);
  });

  it("publishes LocalBusiness with the confirmed address and email", () => {
    process.env.NEXT_PUBLIC_ADDRESS_1 = "12 Example Street";
    process.env.NEXT_PUBLIC_EMAIL = "office@example.test";

    expect(nodeTypes()).toContain("LocalBusiness");
    expect(output()).toContain("office@example.test");
    expect(output()).toContain("12 Example Street");
  });

  it("emits no review or rating schema without verified reviews", () => {
    process.env.NEXT_PUBLIC_ADDRESS_1 = "12 Example Street";
    process.env.NEXT_PUBLIC_EMAIL = "office@example.test";

    expect(output()).not.toContain("aggregateRating");
    expect(output()).not.toContain('"review"');
  });
});
