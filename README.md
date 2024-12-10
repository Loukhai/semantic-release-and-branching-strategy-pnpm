# semantic release and branching strategy workflow

work with a better workflow branching strategy, to organize your code, and automation releases by github actions. 

## steps

1- install dependencies 📦

```bash
pnpm add -D semantic-release @semantic-release/{git,github,changelog,commit-analyzer,release-notes-generator} conventional-changelog-conventionalcommits
```

<details>
<summary>why all those plugins</summary>

- pnpm add -D:
  Installs dependencies as dev-only (-D for devDependencies).

- semantic-release:
  Core library for automating versioning and releases.

- @semantic-release/git:
  Commits release files like CHANGELOG.md and updated version numbers.

- @semantic-release/github:
  Publishes releases and tags to GitHub.

- @semantic-release/changelog:
  Updates the CHANGELOG.md file.

- @semantic-release/commit-analyzer:
  Analyzes commit messages to determine the next version.

- @semantic-release/release-notes-generator:
  Generates release notes based on commits.

- conventional-changelog-conventionalcommits:
  Adopts the Conventional Commits standard for generating changelogs and versioning.

</details>

<br />

2- setup configuration semantic-release `.releaserc`

create in the root folder `.releaserc` file configuration for _Semantic Release_ that specify the release process, it can be json,yaml or JS module,
e.g. (simple config)

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    "@semantic-release/github"
  ]
}
```

<br />

3- setup Github Actions Workflow for automation release

Create the `.github/workflows/release.yml` file in the root folder.  
 Feel free to check out [my release workflow file](./.github/workflows/release.yml) directly in the repository for reference.

<details>
  <summary>
    Semantic Release Workflow Overview (explanation related to pnpm pkgManager)
  </summary>

1. **Code Checkout**  
   This step ensures the latest code from the repository is fetched securely using the `actions/checkout@v4` action. It provides a clean and reliable environment for the release process.

2. **Dynamic pnpm Setup**  
   Reads the `pnpm` version from the `package.json` file dynamically. This avoids version mismatches and ensures the workflow aligns with the exact version required by the project.

3. **Node.js Environment Setup**  
   Configures Node.js with the latest long-term support (LTS) version. It also enables caching for `pnpm` dependencies, speeding up subsequent runs and reducing CI costs.

4. **Dependency Installation**  
   Installs project dependencies with `pnpm install` using a strict lockfile check (`--frozen-lockfile`) to ensure deterministic builds and prevent discrepancies between environments.

5. **Semantic Release Execution**  
   Automates versioning, changelog generation, GitHub releases, and tagging. The process ensures that every release is consistent, professional, and aligned with the configured branching strategy.

6. **Security Best Practices**  
   Securely manages sensitive credentials, like `GITHUB_TOKEN`, through GitHub secrets. The workflow is scoped to run only on specific branches (`main`, `develop`, and `feat/*`), ensuring controlled and safe operations.

</details>
