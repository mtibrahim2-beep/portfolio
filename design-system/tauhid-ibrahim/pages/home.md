# Home page overrides (take precedence over MASTER.md)

Generated MASTER.md came from `search.py "personal portfolio finance fintech editorial" --design-system`.
Kept from it: Swiss grid discipline, IBM Plex Sans for body, trust/authority pattern,
hover 150–300ms, visible focus, reduced motion, 375/768/1024/1440 checks.

Overridden, with reasons:
- **Palette.** MASTER suggested amber + violet (#F59E0B / #8B5CF6). The brief bans purple and pins
  navy, emerald, gold and warm off-white. The `--domain color` "Banking/Traditional Finance" row
  (navy + gold) supports the direction below.
- **Motion.** MASTER suggested a GSAP stagger on grid items. `--domain ux` "Excessive Motion" says to
  animate 1–2 key elements per view, and frontend-design asks for one orchestrated moment. So there is
  one hero sequence and no GSAP.
- **Charts.** `--domain chart` says to use a stat card under 4 data points, so 100→75 is a stat, not a
  line chart. The tenure timeline is a CSS bar chart with a text equivalent.

## Tokens (all text pairs ≥ 4.5:1, checked)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| ink | #0F1B2D | dark sections | — |
| ink-2 | #16243A | raised panels on dark | — |
| ledger | #F3F0E6 | page background | — |
| graphite | #2E3644 | body text on ledger | 10.66 |
| muted | #5A6372 | secondary text on ledger | 5.32 |
| emerald | #1E6A50 | links, positive, primary button | 5.70 |
| gold-deep | #7D6230 | gold accents on light | 5.03 |
| loss | #A4483A | negative variance, light | 5.16 |
| on-ink | #ECE8DD | text on dark | 14.12 |
| on-ink-muted | #A3ADBD | secondary text on dark | 7.63 |
| emerald-bright | #5DB08F | positive figures on dark | 6.64 |
| gold | #C2A066 | totals rule and button on dark | 7.01 |
| loss-bright | #E08A78 | negative figures on dark | 5.99 (on ink-2) |

## Type
- Display: IBM Plex Serif 500. It replaced Bodoni Moda (Nov 2026), whose hairline strokes were hard to read on navy. Plex Serif comes from the `--domain typography` "Financial Trust" (IBM Plex) family, so it matches the body and figure faces.
- Body: IBM Plex Sans 17px, line-height 1.6, max 68ch.
- Figures: IBM Plex Mono with `font-variant-numeric: tabular-nums`, used only on real numbers.
