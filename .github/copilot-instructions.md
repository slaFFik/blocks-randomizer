# GitHub Copilot Instructions

GitHub Copilot cloud agent and Copilot code review load the root `AGENTS.md` automatically. It is the canonical project guide and must be read before working. Do not duplicate or override its repository facts here. `CLAUDE.md` is a symlink to the same guide.

## Copilot-Specific Guidance

- Base suggestions and reviews on the current worktree, not only the task description or this instruction file.
- In GitHub-hosted environments, the local `blocks.test` runtime may be unavailable. Run the applicable static/build checks and state exactly which WordPress behavior still needs local manual QA.
- For reviews, prioritize reachable functional, compatibility, security, serialization, and release issues. Cite concrete files and lines; distinguish blockers from optional cleanup.
- Do not edit generated `build/` files. Change `src/`, run the production build for validation, and leave ignored build output uncommitted.
- Do not update dependencies, workflows, versions, changelogs, or release assets unless the requested task includes them.
- Do not commit or push. Do not add AI attribution, generated-by text, or session links to code, issues, pull requests, or comments.
