# PM Contracts Premium Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten PM Contracts messaging and polish key homepage sections while preserving the premium corporate look and working SEO build.

**Architecture:** Keep the existing content-driven React structure, improve the central content model first, then make small presentational updates in the homepage hero, urgency, trust, about, services, and CTA sections. Preserve the current routing, SEO generation, and prerender flow.

**Tech Stack:** React, TypeScript, Vite, Framer Motion, utility-first CSS classes

---

### Task 1: Tighten PM Contracts homepage copy

**Files:**
- Modify: `src/data/content.ts`
- Test: `npm run build`

### Task 2: Polish premium homepage presentation

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/UrgencyBanner.tsx`
- Modify: `src/components/home/TrustSignals.tsx`
- Modify: `src/components/home/AboutSection.tsx`
- Modify: `src/components/home/ServicesSection.tsx`
- Modify: `src/components/home/CTASection.tsx`
- Test: `npm run build`

### Task 3: Verify build and prerender output

**Files:**
- Modify: `scripts/generate-seo-artifacts.mjs` only if verification surfaces output issues
- Test: `npm run build`
