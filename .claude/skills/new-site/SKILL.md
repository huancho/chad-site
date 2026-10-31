---
name: new-site
description: "Build a complete landing page from BRIEF.md by orchestrating subagents through four phases: foundations (type, color, components), page, per-section design, and finish. Use when the user runs /new-site or asks to build the site from the brief."
disable-model-invocation: true
---

# New Site

You are the orchestrator. Subagents do the design and the code; you resolve the brief, write their prompts, enforce which agent owns which file, and verify the result. Never do a subagent's job yourself. Each subagent starts with a clean context focused on one aspect, which is why the result beats one agent doing everything.

Run the phases in order. Within a phase, launch every agent in a single message so they run in parallel, and wait for all of them before starting the next phase, because each phase builds on files the previous one wrote.

## Writing a subagent prompt

Use the `general-purpose` agent type. A subagent knows only what its prompt says, so every prompt contains, in this order:

1. The resolved brief from phase 0, verbatim.
2. "Load these skills with the Skill tool before writing any code: <names>." Subagents don't load skills unless told to.
3. The files it owns and the files it may only read.
4. Its task, copied from this file.
5. "Report back: files changed, each decision you made in one line, and anything you couldn't do." You only see the report, never the work.

## Phase 0: Resolve the brief

1. Read `BRIEF.md`. If the user passed text with `/new-site`, that text is the job post and replaces the brief's Job post section. If neither has a job post, stop and ask the user to paste it. Everything downstream is inferred from it.
2. Read the client's current site:

   ```
   Does the brief or the job post name the client's current website?
   ├── Yes → open it with the browser tools: read the page text and take screenshots
   │         while scrolling. Many client sites are single-page apps that return an
   │         empty shell to a plain fetch.
   │         ├── No browser tools → use WebFetch. If it returns no real copy, treat
   │         │   the answer as No and note it for the report.
   │         └── Write `existing-site.md`: every section in page order, its copy
   │             verbatim, and every business detail on the page.
   └── No → skip this step.
   ```

   A redesign that keeps the client's content is one they recognize as theirs. Copy the agent writes from scratch reads as someone else's business.
3. Write the resolved brief: every field filled in, inferring blanks from the job post and the industry. Resolve blanks once, here. If each subagent infers them separately, they invent different business names, moods, and phone numbers.
   - Sections: if `existing-site.md` exists, its sections in its order, unless the job post names the sections it wants. Otherwise the ticked ones in the brief.
   - Default theme: light, unless the brief says dark.
   - Business details: list every one the page shows (prices, phone, email, address, hours, social links, team, credentials, stats, testimonials, projects), each tagged `[site]` or `[invented]`. Decide each with this tree:

     ```
     Is the detail on the existing site?
     ├── Yes → use it exactly as the site shows it. Tag [site].
     └── No
         ├── Does the site show other items of the same kind?
         │   (Instagram and LinkedIn, but no X)
         │   └── Yes → leave it out. The site's set is complete; an extra
         │       item is one the client knows is false.
         └── No → invent a plausible value. Tag [invented].
     ```

     With no existing site, every detail takes the invent branch. Invent rather than leave a slot empty, because a page with blank prices, contacts, or proof looks half finished, and the demo exists to look finished. Invented values match the market: local phone format and currency, a real city, prices in the industry's range.
4. Show the user the resolved brief in 10 lines or fewer, including whether the existing site was read and how many details are invented, and continue without waiting. They can interrupt if you misread the job.

Never write the resolved brief into `BRIEF.md`. That file belongs to the user.

## Phase 1: Foundations

Launch the typography and color agents in one message.

Both agents edit `app/globals.css` at the same time, so both prompts say: "Another agent is editing other blocks of `app/globals.css` right now. Re-read the file immediately before every edit, and never rewrite the whole file."

### Typography agent

- **Skills:** `typography`
- **Owns:** the font imports in `app/layout.tsx`, the `--font-*` lines in the `@theme inline` block of `app/globals.css`, and `components/typography.tsx`.
- **Task:**
  - Choose a heading font and a body font from `next/font/google` that fit the mood words. Geist is the template placeholder, so replace it. Geist on every site is the clearest sign that nothing was chosen.
  - `components/typography.tsx` exports one `Typography` component with a `variant` prop and an `as` prop. The variants are exactly `h1`, `h2`, `h3`, `h4`, `lead`, `body`, `small`, `eyebrow`. If the file exists, keep the names and replace every value. If it doesn't, create it. The names are fixed because phases 2 and 3 write against them. `as` exists because the visual level and the semantic level differ: a section title can be an `<h2>` styled as `h1`.

### Color agent

- **Skills:** `color`
- **Owns:** the `:root` and `.dark` blocks of `app/globals.css`.
- **Task:**
  - Replace every value in both blocks, and keep every token name. shadcn components read these names, so renaming one silently unstyles them.
  - If the brief gives brand colors, build the palette from them. Otherwise derive it from the mood words and the industry.
  - Never use indigo or violet as the primary unless the brief names it. It's the most common AI default and makes the site look generated.

### Installing a missing component

The template ships with the components a landing page uses in `components/ui/`. Only the phase 2 agent and you install more, never a phase 3 agent, because parallel installs overwrite each other's shared dependencies. To install:

1. Run `pnpm exec shadcn add --yes --overwrite <name>`. Without `--overwrite` the command stops at an overwrite prompt that a non-interactive shell can't answer, and nothing after it installs.
2. Run `git diff --name-only components/ui` and restore every file it lists with `git checkout -- <file>`. Components pull in dependencies such as `button`, and `--overwrite` replaces the template's customized copies (`button.tsx` adds `cursor-pointer`).

## Visuals

Copy this section into every phase 2 and phase 3 prompt.

Every section has one element that isn't text: a photo, a code-built illustration or diagram, a product or UI mock, a large number, or a data visualization. At most one section on the page is text-only, and never the hero. Text on a flat background is what makes a page look empty. Read "minimal", "clean", or "lots of space" in a brief as fewer elements per section, never as text-only sections.

The hero's visual shows the subject of the business (hair, for a hair-loss brand), never a generic mood image.

```
What does the visual show?
├── The business's core idea: a process, a scale, a mechanism, data
│   → build it in code as SVG or HTML. No stock site has it, and it's
│     specific to this client (the Norwood scale for a hair-loss brand).
└── People, places, objects, or textures
    → run `pnpm find-image "<query>" --orientation <landscape|portrait|squarish>`.
      ├── Pick by the result's description. Never use an image URL from
      │   memory: a guessed Unsplash ID loads the wrong photo or a 404.
      ├── Reject anything the brief's Avoid field rules out.
      ├── Render with `next/image` using the result's width and height, and
      │   its color as the background while it loads.
      ├── Credit each photographer in the footer's small print.
      └── The command fails (no key, rate limit) → build the visual in code
          and report it.
```

## Phase 2: Page

Launch one agent, because the copy and the section order need one voice.

- **Skills:** `marketing-pages`, `unslop-writing`
- **Owns:** everything except the phase 1 files, `BRIEF.md`, and `existing-site.md`, which it may only read.
- **Task:**
  1. Before writing code, write the section plan: one row per section with its layout, visual element, `tone`, and `spacing`.
     - Layouts: split (text and visual side by side), full-bleed visual band, card grid, numbered steps, timeline, comparison table, large-number stats, single statement, divided rows, accordion, gallery, quote, form split. No two sections share a layout. One layout repeated down the page is what makes it read as plain, even when each section is fine alone. If the content fits none of these, name a new layout; it still can't repeat.
     - Tones: no two adjacent sections share a `tone`, and the footer's background differs from the section above it. Without the contrast, sections run together and the page reads as one long block.
     - Include the plan in your report. Phase 3 gives each section its row.
  2. Wrap every section in `Section` and `Container` from `components/section.tsx`. Give each `Section` an `id` that matches the header's anchor links. Set vertical space with `spacing` (`sm`, `default`, `lg`), background with `tone` (`default`, `muted`, `primary`), and width with `Container`'s `size` (`sm` for text-heavy sections like FAQ, `default`, `lg`). Never override padding, background, or max width through `className`. Phase 3 agents run in parallel and would each pick different values; a fixed set of props keeps the page consistent. The header uses `Container` only; the footer sets its own background so it can contrast with the section above.
  3. Put each section in `components/sections/<name>.tsx` (kebab-case). `app/page.tsx` only imports the sections and sets their order. Phase 3 gives one agent per file.
  4. Route all text through `Typography` and all colors through tokens (`bg-primary`, `text-muted-foreground`). Never use raw hex or oklch values, or text-size classes like `text-4xl`, in section files. That way a later change to the scale or palette is a one-file edit.
  5. Write the final copy now. Phase 3 changes layout, not words.

     ```
     Does `existing-site.md` exist?
     ├── Yes → use its copy section by section. Keep every fact, claim,
     │         and the meaning of every headline; shorten wording to fit
     │         the layout.
     └── No → write copy specific to this business.
     ```

     Use the business details from the resolved brief exactly, and never add new ones. Details are decided once, in phase 0, so every section agrees and the report can list what's invented.
  6. Size every section to fit in one 1440×900 screen, except FAQ and lists longer than 6 items. `h2` headings wrap to at most 2 lines at 1440px, so never put a heading in a column narrower than half the container. A section taller than the screen makes the page feel long and sparse.
  7. Put a theme toggle in the header, in `components/theme-toggle.tsx` (create it if missing). Set `defaultTheme` in `components/theme-provider.tsx` to the resolved default theme.
  8. The contact form fakes its submit: a 1-second delay with a loading state, then a sonner success toast, then a reset. Mount sonner's `Toaster` in `app/layout.tsx`. There's no backend. The client will click the button, and a button that does nothing reads as unfinished.

## Phase 3: Sections

Launch one agent per file in `components/sections/`. Give each agent its section's row from the section plan.

- **Skills:** `design-foundations`, `unslop-design`. The contact section agent also loads `forms-and-inputs`.
- **Owns:** its one section file. Everything else is read-only.
- **Task:**
  - Improve layout, hierarchy, spacing inside the section, and visual treatment. Don't change the copy, except to cut words.
  - Keep the plan's layout, visual element, and `tone`. Agents run in parallel and can't see each other, so changing them can duplicate another section's layout or put two matching backgrounds next to each other.
  - Change `spacing` or `Container` `size` if the design needs it, but keep the section within one 1440×900 screen (FAQ and lists over 6 items excepted). Never override these through `className`.
  - If the section needs a change to a shared file (`typography.tsx`, `globals.css`, `section.tsx`, anything in `components/ui/`) or a component that isn't installed, don't make the change or install it. Report exactly what's needed instead. An edit to a shared file silently changes every other section, and parallel agents would overwrite each other's edits.

When they're done, handle the shared-file requests yourself. This is the one exception to not doing subagent work, because you're the only one who can see every section. Apply a request only if it improves every section that uses that file. Otherwise reject it and note it for the report.

## Phase 4: Finish

These steps run in order, not in parallel.

1. **Motion agent.** Skills: `animations`. Owns every section file. Adds motion across the whole page using `motion/react`. A single agent handles the whole page so easing, durations, and stagger match from section to section.
2. **Review agent.** Skills: `mobile-native`, `ui-review`. Owns everything. Fixes every finding that can be fixed in code and reports the rest.
3. **Build check (you).** Run `pnpm typecheck && pnpm lint && pnpm build` and fix failures until all three pass. Vercel runs the build, and a site that doesn't build can't be sent.
4. **Visual check (you).** Start `pnpm dev` and take screenshots at 1440px and 390px wide, in light and dark. List every case of:
   - horizontal overflow, text that disappears in one theme, or a broken image;
   - a section taller than 900px at 1440px wide (FAQ and lists over 6 items excepted);
   - an `h2` wrapping past 2 lines at 1440px;
   - two adjacent sections, or the footer and the section above it, with the same background.

   Send the list to one agent to fix, then take the screenshots again. If no browser tools are available, say so in the report. Never claim a check you didn't run.

## Report

End with 15 lines or fewer:

- The fonts and palette chosen, one line each.
- The sections built, and whether the existing site was read.
- Every `[invented]` business detail, so the user knows what to flag before sending.
- Everything skipped or failed: component installs, image searches, rejected shared-file requests, checks that didn't run.
- Where the client's real assets (logo, photos) should replace placeholders.

Don't deploy, because deploying publishes the site. Ask the user whether to deploy.
