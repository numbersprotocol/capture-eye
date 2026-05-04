# Workspace Context

<!-- This file is auto-maintained. The Repositories section is refreshed -->
<!-- by the system. The AI should maintain Environment & Key Discoveries. -->

**Workspace root (absolute path):** `/home/workspaces/conversations/af42200c-bf31-4914-9f0b-af6eacf96600`

## Repositories

- **`capture-eye/`** — Branch: `omni/af42200c/capture-eye`, Remote: `numbersprotocol/capture-eye`
  - [![](https://data.jsdelivr.com/v1/package/npm/@numbersprotocol/capture-eye/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@numbersprotocol/capture-eye)

## Environment & Tools

- Local runtime observed: Node v22.13.0, npm 10.9.2; npm Trusted Publishing requires npm CLI 11.5.1+ and Node 22.14.0+.
- GitHub Actions release workflows use Node 24; CI matrix covers Node 20.x, 22.x, and 24.x.

## Key Discoveries

- `capture-eye/.github/workflows/production-release.yml` publishes `@numbersprotocol/capture-eye` to npm from the `publish-npm` job using npm Trusted Publishing/OIDC; npm package is configured with GitHub Actions trusted publisher.
- npm vulnerability fix on 2026-05-04 only required `package-lock.json` updates for transitive dev dependencies: `brace-expansion`, `path-to-regexp`, and `smol-toml`.
- Version bump prepared on 2026-05-04 updates `@numbersprotocol/capture-eye` from 1.11.0 to 1.11.1 in both `package.json` and `package-lock.json`; npm registry still shows 1.11.0 until the version bump lands on main and publishes.

---
_Last system refresh: 2026-05-04 08:28 UTC_
