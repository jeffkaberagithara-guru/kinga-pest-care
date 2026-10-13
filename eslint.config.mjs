import next from "eslint-config-next/core-web-vitals";

/** Flat ESLint config. Next's recommended rules plus Next-specific ignores. */
const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
