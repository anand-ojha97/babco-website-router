# Upload your Babco website code to GitHub

You are uploading the extracted **source files**, not the ZIP and not only
`dist/`. The repository root should contain `package.json`, `src/`, `public/`,
and the single root `index.html`. The project includes a `.gitignore` that leaves
installed dependencies, builds, local environment files, and ZIPs out of Git.

Choose either method A or method B. You do not need both.

## Method A — GitHub Desktop

This method uses a visual application and is a good starting point if you are
new to Git. Download it from https://desktop.github.com/ and sign in to your
GitHub account.

### First upload

1. In GitHub Desktop, choose **File > New repository**.
2. Name it `babco-website`. Choose a parent folder where your projects will live,
   such as `Documents/GitHub`. The application creates the repository folder.
3. Do not add a license or a generated gitignore; the package already contains
   its project files and ignore rules. Create the repository.
4. In your file manager, open the extracted `babco-website` folder. Copy its
   **contents** into the new repository folder created by Desktop. Do not copy
   the outer folder inside itself. Keep the new repository's Git metadata.
5. Check that `package.json` is directly in the repository folder and that
   `src/` and `public/` are beside it. The provided `.gitignore` must be there too.
6. Back in Desktop, review the files listed under Changes. Use the summary
   `Add complete Babco website` and choose **Commit to main** (or the current
   default branch shown by Desktop).
7. Click **Publish repository**. Check the repository name and destination
   account/organization. Choose whether to keep the repository private; keep
   **Keep this code private** selected if you want an owner-controlled upload.
8. Click **Publish Repository**, then use **View on GitHub** to confirm the
   source and assets are visible in your repository.

For future work, open and edit the **repository folder** in VS Code. It is now
your working project. The old extracted download is a separate copy.

### Upload later changes

1. Edit and test the website in that repository folder.
2. Run `npm test` and `npm run build` to check the update.
3. In Desktop, review Changes and enter a useful summary, for example
   `Update leadership titles`.
4. Commit, then click **Push origin**.

A commit saves a version on your computer. A push sends those commits to
GitHub. If someone else updated the repository, fetch/pull their changes
before pushing and review any conflicts.

## Method B — Git commands

Install Git from https://git-scm.com/downloads and create/sign in to your
GitHub account. Use VS Code's terminal or Git Bash in the extracted project
folder containing `package.json`.

### Create the empty destination on GitHub

On GitHub, use **New repository** and choose a name such as `babco-website`.
Select the visibility you want. Leave the options to add a README, gitignore,
or license off, because this source package already supplies its own files.
Create the repository and copy its HTTPS URL.

### Initialize, commit, and push

Run the following commands one line at a time. Replace `YOUR-USERNAME` in the
URL with your actual GitHub username or organization, and use your actual
repository name if it differs.

```bash
git init -b main
git status
git add .
git commit -m "Add complete Babco website"
git remote add origin https://github.com/YOUR-USERNAME/babco-website.git
git remote -v
git push -u origin main
```

If Git asks for your author identity before committing, set it for this
repository, then retry the commit:

```bash
git config user.name "Your Name"
git config user.email "YOUR-GITHUB-VERIFIED-OR-NOREPLY-EMAIL"
```

Replace both example values. Your GitHub email settings show your verified
or noreply address. Follow the Git credential sign-in/browser prompt when
pushing, or use GitHub Desktop for authentication. A GitHub account password
is not used as a Git-over-HTTPS password.

The ZIP has no old Git history or `origin` remote. These initialization steps
are for this new download. If you later repeat them in an existing repository,
use `git remote -v` first; do not add a second `origin` blindly.

### Push later edits

```bash
git status
git add .
git commit -m "Update Babco website content"
git push
```

Use a specific commit message describing the actual edit. If another person
has pushed changes, pull and resolve any conflicts before pushing your work.

## What belongs in the repository

| Include | Leave out |
| --- | --- |
| `src/`, `public/`, `tests/`, root `index.html` | `node_modules/` |
| `package.json`, `package-lock.json` | `dist/`, which you can rebuild |
| Vite/PostCSS configuration and label script | Downloaded ZIP archives |
| `.gitignore`, README, guides | Local environment files and credentials |

Commit `package-lock.json`; it records the exact dependency versions used by
`npm ci`. Keep the provided ignore rules. `private: true` in `package.json`
prevents accidental npm-package publication; GitHub repository visibility is
a separate setting selected when you publish the repository.

The supplied source/media files are below GitHub's 100 MiB per-file Git limit.
GitHub's browser uploader has a smaller 25 MiB per-file limit, so Desktop/Git
is the more practical approach for this full folder structure. Do not upload
the whole ZIP as a substitute for the source tree. For a future video above
GitHub's limit, use an appropriate media host or Git LFS and update its URL.

## GitHub upload and website hosting are separate

GitHub stores versions of your code. A static host serves the built website.
Uploading the source does not itself replace your currently hosted Babco site.

For a host that builds from GitHub, typical settings for this package are:

| Setting | Value |
| --- | --- |
| Project root | The folder containing `package.json` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | Node 24 LTS (24.15.0+ in 24.x), matching package.json |
| Public URL shape | A domain root, such as `https://example.com/` |

For manual static hosting, run the build locally and upload the **contents**
of `dist/`, and configure an SPA fallback to index.html. See DEPLOYMENT.md. Do not run `npm run dev`
or `npm run preview` as a production hosting service.

### GitHub Pages note

This version uses BrowserRouter. GitHub Pages does not provide the arbitrary
SPA fallback needed for direct visits/refreshes of inner paths. A custom domain
alone does not solve that routing issue. This package is not configured for
GitHub Pages; prefer a host supporting SPA rewrites and use DEPLOYMENT.md.

A project Pages URL also adds a prefix such as `/babco-website/`. Supporting
that prefix requires coordinated route, asset and Vite base changes. No Pages
workflow, redirect workaround or HashRouter conversion is included here.

## Official references

Official references for the GitHub workflow:

- GitHub Desktop — creating a new local repository:
  https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop
- GitHub Desktop — publishing an existing project:
  https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop
- Git commands — importing local code:
  https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
- GitHub file limits:
  https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
- GitHub authentication:
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github
- Vite build and static deployment:
  https://vite.dev/guide/static-deploy
