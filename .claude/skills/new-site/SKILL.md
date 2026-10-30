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
2. Write the resolved brief: every field filled in, inferring blanks from the job post and the industry. Resolve blanks once, here. If each subagent infers them separately, they invent different business names, moods, and phone numbers.
   - Sections: the ticked ones, in page order.
   - Default theme: light, unless the brief says dark.
3. Show the user the resolved brief in 10 lines or fewer and continue without waiting. They can interrupt if you misread the job.

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

## Phase 2: Page

Launch one agent, because the copy and the section order need one voice.

- **Skills:** `marketing-pages`, `unslop-writing`
- **Owns:** everything except the phase 1 files, which it may only read.
- **Task:**
  1. Wrap every section in `Section` and `Container` from `components/section.tsx`. Give each `Section` an `id` that matches the header's anchor links. Set vertical space with `spacing` (`sm`, `default`, `lg`), background with `tone` (`default`, `muted`, `primary`), and width with `Container`'s `size` (`sm` for text-heavy sections like FAQ, `default`, `lg`). Never override padding, background, or max width through `className`. Phase 3 agents run in parallel and would each pick different values; a fixed set of props keeps the page consistent. Header and footer use `Container` only.
  2. Put each section in `components/sections/<name>.tsx` (kebab-case). `app/page.tsx` only imports the sections and sets their order. Phase 3 gives one agent per file.
  3. Route all text through `Typography` and all colors through tokens (`bg-primary`, `text-muted-foreground`). Never use raw hex or oklch values, or text-size classes like `text-4xl`, in section files. That way a later change to the scale or palette is a one-file edit.
  4. Write the final copy now, specific to this business: names, numbers, places. Phase 3 changes layout, not words.
  5. Put a theme toggle in the header, in `components/theme-toggle.tsx` (create it if missing). Set `defaultTheme` in `components/theme-provider.tsx` to the resolved default theme.
  6. The contact form fakes its submit: a 1-second delay with a loading state, then a sonner success toast, then a reset. Mount sonner's `Toaster` in `app/layout.tsx`. There's no backend. The client will click the button, and a button that does nothing reads as unfinished.
  7. Use a photo only if its URL returns 200 to `curl -sIL`, and add its host to `images.remotePatterns` in `next.config.ts`. Otherwise build the visual in code, following `marketing-pages`. Never ship a broken image or an empty gray box.

## Phase 3: Sections

Launch one agent per file in `components/sections/`.

- **Skills:** `design-foundations`, `unslop-design`. The contact section agent also loads `forms-and-inputs`.
- **Owns:** its one section file. Everything else is read-only.
- **Task:**
  - Improve layout, hierarchy, spacing inside the section, and visual treatment. Don't change the copy, except to cut words.
  - Change the section's `spacing`, `tone`, or `Container` `size` props if the design needs it. Never override them through `className`.
  - If the section needs a change to a shared file (`typography.tsx`, `globals.css`, `section.tsx`, anything in `components/ui/`) or a component that isn't installed, don't make the change or install it. Report exactly what's needed instead. An edit to a shared file silently changes every other section, and parallel agents would overwrite each other's edits.

When they're done, handle the shared-file requests yourself. This is the one exception to not doing subagent work, because you're the only one who can see every section. Apply a request only if it improves every section that uses that file. Otherwise reject it and note it for the report.

## Phase 4: Finish

These steps run in order, not in parallel.

1. **Motion agent.** Skills: `animations`. Owns every section file. Adds motion across the whole page using `motion/react`. A single agent handles the whole page so easing, durations, and stagger match from section to section.
2. **Review agent.** Skills: `mobile-native`, `ui-review`. Owns everything. Fixes every finding that can be fixed in code and reports the rest.
3. **Build check (you).** Run `pnpm typecheck && pnpm lint && pnpm build` and fix failures until all three pass. Vercel runs the build, and a site that doesn't build can't be sent.
4. **Visual check (you).** Start `pnpm dev` and take screenshots at 1440px and 390px wide, in light and dark. Fix horizontal overflow, text that disappears in one theme, and broken images. If no browser tools are available, say so in the report. Never claim a check you didn't run.

## Report

End with 15 lines or fewer:

- The fonts and palette chosen, one line each.
- The sections built.
- Everything skipped or failed: component installs, rejected shared-file requests, checks that didn't run.
- Where the client's real assets (logo, photos) should replace placeholders.

Don't deploy, because deploying publishes the site. Ask the user whether to deploy.
