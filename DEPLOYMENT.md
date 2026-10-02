# GitHub Pages Deployment Guide (User "Magic Repo")

This repository, **`chinmay-sh.github.io`**, is a special repository type on GitHub known as a **User Site** (or **"Magic Repo"**).

---

## 🌟 Why is it called a "Magic Repo"?

1. **Root Domain Routing**:
   - Regular project repos deploy to: `https://<username>.github.io/<project-name>/`
   - **This repo** deploys directly to your apex root: **`https://chinmay-sh.github.io/`**
2. **Zero Base-Path Friction**:
   - Because it lives at the root `/`, relative asset paths (like `style.css`, `app.js`, `assets/...`) work without requiring path prefixes or special Vite/Webpack rewrites.
3. **Automatic Deployment from `main`**:
   - Any commit pushed to the `main` branch at root triggers an automatic deployment by GitHub Pages.

---

## 🚀 Step-by-Step Deployment

### Step 1: Commit and Push your files

Run the following commands in your terminal:

```bash
# 1. Check your changed files
git status

# 2. Stage all files (index.html, style.css, app.js, DESIGN_SYSTEM, etc.)
git add .

# 3. Commit your changes
git commit -m "feat: launch Raycast midnight portfolio with live voice agent, RAG showcase, and command palette"

# 4. Push to GitHub main branch
git push origin main
```

---

### Step 2: Verify GitHub Pages Settings

1. Open your browser and navigate to:
   **[https://github.com/chinmay-sh/chinmay-sh.github.io/settings/pages](https://github.com/chinmay-sh/chinmay-sh.github.io/settings/pages)**
2. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **`main`**
   - **Folder**: Select **`/ (root)`**
   - Click **Save** (if not already enabled by default).

---

### Step 3: Check Live Deployment Status

1. Go to the **Actions** tab:
   **[https://github.com/chinmay-sh/chinmay-sh.github.io/actions](https://github.com/chinmay-sh/chinmay-sh.github.io/actions)**
2. You will see a workflow named **`pages-build-deployment`** running.
3. Once the green checkmark appears (usually ~30–60 seconds), your portfolio is live at:
   👉 **[https://chinmay-sh.github.io/](https://chinmay-sh.github.io/)**

---

## 🌐 (Optional) Connecting a Custom Domain (e.g., `chinmay.sh`)

If you want to attach a custom domain like `chinmay.sh`:
1. In your DNS provider (Cloudflare, Namecheap, GoDaddy):
   - Add four `A` records pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a `CNAME` record for `www` pointing to `chinmay-sh.github.io`.
2. In **Settings > Pages > Custom domain**, enter `chinmay.sh` and click **Save**.
3. Check the box **Enforce HTTPS** once the SSL certificate finishes provisioning (~15 mins).

---

## 🛠 Local Previewing

To preview changes locally anytime:
```bash
# Start a simple HTTP server using Python
python -m http.server 8000
```
Open **`http://localhost:8000`** in your browser.
