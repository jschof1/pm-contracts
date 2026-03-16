# Docs Index

This docs set is designed so you can implement a new client from one messy markdown brief and still know exactly what to update.

## Start Here (One Prompt Workflow)

1. `docs/new-client-from-messy-brief.md`
2. `docs/skills/client-project-from-brief/SKILL.md`
3. `docs/skills/client-project-from-brief/references/business-brief-template.md`
4. `docs/skills/client-project-from-brief/references/file-map.md`

## Theme System Reference

- `docs/theming-handover.md`

Use this after core content migration when adjusting visual style/tokens.

## Minimum execution standard

The implementation is complete only when all three pass:

```bash
npm run validate:data
npm run generate:seo
npm run build
```

## Quick sanity checklist

- No template placeholders remain (`example.com`, placeholder emails/phones, webhook placeholders, form ID placeholders).
- `src/data/*` reflects the new client brief.
- If source URLs were provided, extracted data has been merged and any uncertain image licensing is flagged.
- SEO and prerender outputs are regenerated.
- Final handoff includes assumptions + manual follow-ups.
