# PM Contracts Client Copy Design

**Goal**

Create a new standalone sibling project in `/Users/jack/Documents/GitHub/pm-contracts` by copying this Dominion Trade codebase, then rebrand and repopulate it for PM Contract using the provided markdown brief, the synced Drive asset pack, and public business details where the brief is incomplete.

**Approach**

The current repository is already structured as a data-first trade website template. The safest path is to duplicate the repository as-is, then treat `src/data/*` as the primary editing surface for brand, content, services, areas, and SEO. Shared components should only be touched if they still contain Dominion-specific copy or hard-coded base URL details that would leak into the new client build.

**Source Inputs**

- Primary brief: `/Users/jack/Downloads/PM Contract (1).md`
- Synced Drive folder: `/Users/jack/Library/CloudStorage/GoogleDrive-jack@aspectstudio.net/My Drive/UK Trade Leads Clients/PM Contract`
- Synced work photos/logo pack: `.../PM Contract/Assets/`
- Supporting public references: `https://pm-contracts.com` and directory listings only where the brief leaves gaps

**Normalized Brief Summary**

1. Business identity
- Business name: `PM Contract`
- Contact name: `Peter McPhee`
- Short brand name: `PM Contracts`
- Positioning: family-run roofing and exterior property repair contractor
- Differentiators: 24/7 service, 30 years of experience, family-run

2. Contact and operations
- Phone: `+44 7748 391835`
- Email: `pmcontracts99@gmail.com`
- Address from brief: `Balfour Street, Port Glasgow PA14 5HF, UK`
- Desired domain: `https://rooferglasgow.uk`
- Current website: `https://pm-contracts.com`
- Service coverage: 60-mile radius from `G69 9AT` / Glasgow area

3. Services
- Primary roofing: roof replacement, roof repairs, emergency roof repairs, leadwork, chimney repairs, skylight repairs/replacement
- Supporting exterior/building: roof and wall coatings, roughcasting, UPVC upgrades/gutters, dry rot repair, damp proofing, jet washing
- Lower-priority ancillary: media wall building, general joinery

4. Areas
- Glasgow-led coverage with supporting Scottish town/city pages
- Initial target areas from brief: Glasgow, Edinburgh, Paisley, East Kilbride, Livingston, Dunfermline, Hamilton, Cumbernauld, Kirkcaldy, Kilmarnock, Ayr, Coatbridge, Greenock, Stirling, Airdrie

5. Trust signals
- 30 years experience
- Family-run
- 24/7 service
- Fully liability insured
- Existing Google Business Profile
- Referral offer: free gutter clean
- Review incentive: `GBP 50` off next job

6. Assets
- Existing PM Contracts social/marketing graphics and work photos are present in the synced Drive asset folder
- Logo exists inside the asset pack imagery; if no transparent standalone logo is found, a cropped raster logo may be used as an interim placeholder and flagged

**Architecture Decisions**

- Keep the same route structure and page/component system unless PM Contract content clearly needs different routes.
- Rebuild services and areas around roofing-first intent to align with the desired `rooferglasgow.uk` domain.
- Reuse the asset pack immediately for hero, about, gallery, service, and project imagery, while documenting any image-role assumptions.
- Update all hard-coded base URLs, metadata, JSON-LD, robots, sitemap generation outputs, and favicon/manifest branding so Dominion details do not leak.

**Constraints**

- Do not modify the current Dominion repo in-place beyond these planning documents.
- The new PM Contracts project must live as a sibling folder in `~/Documents/GitHub/`.
- Prefer factual statements from the brief; avoid inventing awards, review counts, or certifications.
- Use public-source details only to fill genuine gaps, and call out any conflicts or assumptions in the handoff.

**Verification**

- `npm run validate:data`
- `npm run generate:seo`
- `npm run build`

**Expected Outcome**

A separate, buildable PM Contracts project with PM-specific branding, roofing-led services and areas, updated assets, client contact/domain details, and regenerated SEO/prerender artifacts.
