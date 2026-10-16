# Project architecture

- Keep homepage-specific editorial styles scoped to `.editorial-home` and use semantic CSS tokens, so changes do not restyle the CMS or other public pages.
- Reuse the existing embedded implant calculator on the homepage without duplicating its pricing logic, so estimates remain consistent across entry points.
- Scope payment-calculator reference styling to `.payment-reference` and reuse `LoanCalculator`, so presentation changes cannot alter sibling tools or financing calculations.
- Regenerate `pnpm-lock.yaml` whenever `package.json` dependency versions change, even when installing with Bun, because Vercel installs with pnpm's frozen lockfile.