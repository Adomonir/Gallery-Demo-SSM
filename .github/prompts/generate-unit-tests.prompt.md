---
agent: agent
description: 'Generate unit tests for a selected UI component in this Next.js + TypeScript project'
tools: ['codebase', 'editFiles']
---

# Generate Unit Tests

## Context
Create or update unit tests for a selected UI component in this repository.

## Inputs
1. Component file path (required), for example: `src/components/ui/cards/FeatureCard.tsx`
2. Optional focus areas (for example: accessibility, edge cases, loading states)

## Requirements
1. Use TypeScript for test files where possible.
2. Place tests next to the component or in a clear local test folder.
3. If no test framework is configured, set one up first using project-appropriate tools (for example, Vitest or Jest with Testing Library), then continue with tests.
4. Keep production behavior unchanged unless a small, justified testability refactor is required.
5. Cover:
   - Rendering of key UI content
   - Prop-driven behavior
   - Conditional branches and edge cases
   - Basic accessibility checks (labels/roles/text)
6. Use clear, behavior-focused test names.
7. Keep tests deterministic and avoid timing flakes.
8. Execute the relevant test command and report whether tests passed or failed.

## Project-Specific Guidance
- Follow existing component patterns used in:
  - `src/components/ui/`
  - `src/components/gallery/`
  - `src/components/upload/`
- Reuse existing mock data from `src/lib/` where useful.
- Prefer testing user-visible behavior over implementation details.

## Output Format
1. Summary of what was tested.
2. List of created/updated test files.
3. Key test scenarios covered (with short rationale).
4. Test command executed and result summary.
5. Any gaps or follow-up tests still recommended.

## File Reference Format
- Use clickable file references such as `src/components/ui/cards/FeatureCard.test.tsx`.
- Include one reference per file that was created or changed.

## Example Request
"Generate unit tests for `FeatureCard.tsx` covering default render, icon/title/description display, and accessibility text assertions."
