# Omkar Aware — DevOps Engineer Portfolio

A cinematic, interactive personal portfolio for **Omkar Santosh Aware**, an aspiring DevOps Engineer. Built with React, TypeScript, Tailwind CSS and Framer Motion. Original design and illustration — inspired by the *interaction quality* of character-based portfolio sites, but implemented entirely from scratch with original code and an original SVG character.

This portfolio is **production-ready, containerized, and prepared for DevOps and DevSecOps integration**.

---

## Quick Start

### Local Development
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Production Build
```bash
npm run build
```

Outputs static files to `dist/`. Verified to build cleanly with zero type errors.

Preview the production build:
```bash
npm run preview
```

### Testing
```bash
npm test              # Run tests once (CI-friendly)
npm run test:watch    # Watch mode for development
```

### Linting
```bash
npm run lint          # Check code quality with oxlint
```

---

## Docker — Production Container

### Build the Docker Image
```bash
docker build -t omkar-devops-portfolio:local .
```

This creates a **multi-stage production image**:
- **Stage 1 (Builder):** Node.js 20 LTS → npm ci → npm run build → dist/
- **Stage 2 (Runtime):** Nginx 1.27 Alpine → serves dist/ via production Nginx

### Run the Container
```bash
docker run -d -p 8080:80 --name omkar-portfolio omkar-devops-portfolio:local
```

Access at `http://localhost:8080`

### Docker Compose (Local Testing)
```bash
docker-compose up -d
```

Stops with:
```bash
docker-compose down
```

### Health Check
The container includes a health check that verifies Nginx is serving the application:
```bash
docker ps  # STATUS will show "healthy"
```

---

## Production Architecture

```
React + TypeScript + Vite
    ↓
npm run build (TypeScript check + optimized production bundle)
    ↓
Dockerfile (multi-stage)
    ├── Build stage: Node.js → npm ci → build
    └── Runtime stage: Nginx → serves dist/
    ↓
dist/ → Nginx on port 80
    ↓
SPA routing fallback (try_files $uri $uri/ /index.html)
    ↓
Static asset caching + gzip compression
    ↓
Container health check
```

---

## Project Structure

```
src/
├── components/
│   ├── Navigation/        Floating glass nav + mobile fullscreen menu
│   ├── Hero/               Cinematic hero: title, character stage, CTAs
│   ├── Character/          Original SVG-illustrated DevOps engineer
│   ├── SkillCards/         Orbiting skill cards (desktop) + mobile ticker
│   ├── About/              "Who am I" + animated terminal panel
│   ├── Experience/         Timeline of work experience
│   ├── Skills/             Categorized skills grid (01–05)
│   ├── DevSecOpsProject/   Animated CI/CD → DevSecOps pipeline
│   ├── TechStack/          Hover-to-animate tech stack
│   ├── Education/          Vertical education timeline
│   ├── Contact/            Terminal-style contact block
│   ├── Footer/
│   ├── Cursor/             Custom cursor (desktop only)
│   └── shared/             Glyph icon set + SectionHeading
│
├── data/                 Single source of truth for all content
│   ├── profile.ts        Name, contact info, summary, resume path
│   ├── skills.ts         Hero card skills + categorized skill groups
│   ├── experience.ts
│   ├── project.ts        Pipeline stages + highlights
│   └── education.ts
│
├── animations/           Reusable Framer Motion variants
│   ├── heroAnimations.ts
│   ├── scrollAnimations.ts
│   └── cardAnimations.ts
│
├── hooks/
│   ├── useReducedMotion.ts
│   └── useMediaQuery.ts
│
├── test/
│   ├── setup.ts          Vitest setup + browser API mocks
│   └── App.test.tsx      Example component tests
│
├── App.tsx
└── main.tsx

public/
└── resume/
    └── Omkar-Santosh-Aware.pdf   Your resume file

root/
├── Dockerfile               Multi-stage production build
├── Jenkinsfile              Jenkins CI/CD and DevSecOps pipeline
├── sonar-project.properties SonarQube project configuration
├── .dockerignore            Files excluded from Docker context
├── nginx.conf               Production Nginx configuration
├── docker-compose.yml       Local Docker Compose setup
├── vitest.config.ts         Vitest configuration
├── .env.example             Environment variable template (no secrets!)
├── .gitignore               Git exclusions (includes .env, node_modules, dist/)
└── package.json             Dependencies + NPM scripts
```

---

## Environment Variables

Environment variables are optional. No secrets are hardcoded.

### .env.example
Copy to `.env` (never commit `.env` to git):

```bash
cp .env.example .env
```

Example variables:
```
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=false

# Environment
VITE_APP_ENV=production
```

**IMPORTANT:** Never commit `.env` with real secrets. Use `.env.example` as a template only.

---

## NPM Scripts

| Script | Purpose | CI-Friendly |
|--------|---------|-----------|
| `npm run dev` | Start Vite dev server | ✓ (manual stop) |
| `npm run build` | TypeScript check + production build | ✓ |
| `npm test` | Run all tests once | ✓ |
| `npm run test:watch` | Watch mode | ✗ |
| `npm run lint` | Check code with oxlint | ✓ |
| `npm run preview` | Preview production build | ✗ |

---

## Jenkins Continuous Integration

This project includes a **Jenkinsfile** configured for automated CI/CD.

### CI Pipeline Architecture
```
GitHub Repository
    ↓
Webhook Trigger
    ↓
Jenkins
    ↓
├─ Checkout (from GitHub)
├─ Install Dependencies (npm ci)
├─ Lint (npm run lint)
├─ Unit Tests (npm test)
├─ Gitleaks Secret Scan
├─ SonarQube Analysis
├─ SonarQube Quality Gate
├─ Build (npm run build)
└─ Archive Build Artifacts (dist/)
    ↓
BUILD SUCCESS ✓
```

### Configuration
**Jenkins Global Tools Configuration Required:**

Configure a Node.js installation named `nodejs`:
- Jenkins > Manage Jenkins > Tools > NodeJS Installations
- Name: `nodejs`
- Version: **Node.js 20 LTS** (or later stable LTS)

### Running the Pipeline
1. Create a new Jenkins Pipeline job
2. Configure SCM to point to this GitHub repository
3. Set the pipeline definition to read from `Jenkinsfile` in the repository
4. Enable GitHub webhook trigger (optional)
5. Run the job

### Build Output
On success:
- All stages complete successfully
- Artifacts are archived at `dist/**` (downloadable from Jenkins UI)
- Build logs show timestamps for each stage
- Security scans pass (Gitleaks and SonarQube Quality Gate)
- Concurrent builds are disabled to prevent resource conflicts

### Build Failure
If any stage fails (checkout, lint, test, Gitleaks, SonarQube Quality Gate, build):
- The pipeline stops and reports the failed stage
- Logs are available for debugging
- Build is marked as failed

### No Credentials in Code
- GitHub credentials are managed through Jenkins credentials store (not in Jenkinsfile)
- SonarQube token is managed through Jenkins credentials (not in Jenkinsfile)
- Node.js path is resolved via Jenkins Global Tools (not hardcoded)
- No secrets, tokens, or API keys are embedded in the pipeline

---

## DevSecOps Pipeline (Security Stages)

The project includes **Gitleaks** and **SonarQube** security scanning in the CI pipeline.

### 1. Gitleaks — Secret Scanning

**Purpose:** Detect accidentally committed secrets such as API keys, passwords, tokens, private keys, and cloud access keys.

**How it works:**
- Scans entire repository history and current working tree
- Detects patterns matching known secret formats
- Fails the pipeline if secrets are found
- Runs before SonarQube to catch credentials early

**Configuration:** 
- No additional setup required if Docker is available
- Falls back to system-installed Gitleaks if available
- Uses official image: `zricethezav/gitleaks:latest`

**What it scans:**
- All files (except those in `.git/` and `.gitignore`)
- Specifically looks for patterns like AWS keys, GitHub tokens, private SSH keys, etc.

### 2. SonarQube — Static Code Analysis

**Purpose:** Analyze code for:
- Code smells (design and architecture issues)
- Bugs and potential runtime errors
- Vulnerabilities (security issues in code)
- Test coverage metrics
- Code duplications

**How it works:**
- Scans TypeScript and JavaScript source code
- Excludes `node_modules`, `dist/`, coverage reports, and test setup files
- Generates detailed report on SonarQube dashboard
- Passes results to Quality Gate for automated decision

**Configuration file:** `sonar-project.properties`
- Defines project key, name, and source directories
- Configures exclusions and test coverage paths
- Language-specific settings for React/TypeScript

### 3. Quality Gate — Automated Pass/Fail Decision

**Purpose:** Automatically pass or fail the build based on code quality metrics.

**How it works:**
1. SonarQube Analysis completes and publishes results
2. SonarQube server evaluates Quality Gate rules
3. Webhook notifies Jenkins of the result
4. Pipeline waits up to 5 minutes for the result
5. If Quality Gate = PASS → Build continues
6. If Quality Gate = FAIL → Pipeline stops, build fails

**Default Rules (SonarQube defaults):**
- No new bugs allowed
- No new code smells
- No new vulnerabilities
- Minimum code coverage requirements

**Configuration:** Defined in SonarQube dashboard (not in source code)

---

## Jenkins Configuration for DevSecOps

### Required Jenkins Plugins
1. **SonarQube Scanner** — For running SonarQube analysis
2. **SonarQube Generic Coverage Report** — For processing coverage reports
3. **Pipeline** — For Declarative/Scripted pipelines (usually pre-installed)
4. **Timestamper** — For timestamped logs (usually pre-installed)

### Required Jenkins Credentials

Configure these in: **Jenkins > Manage Jenkins > Credentials > System > Global credentials**

1. **sonarqube-token** (Secret text)
   - Description: `SonarQube API Token`
   - Secret: Your SonarQube user token (generated in SonarQube UI)

2. **sonarqube-host-url** (Secret text)
   - Description: `SonarQube Server URL`
   - Secret: URL of your SonarQube server (e.g., `http://sonarqube:9000`)

### SonarQube Configuration in Jenkins

**Jenkins > Manage Jenkins > System > SonarQube Servers**

1. **Name:** `SonarQube` (must match Jenkinsfile's `withSonarQubeEnv('SonarQube')`)
2. **Server URL:** `http://sonarqube:9000` (or your SonarQube server URL)
3. **Server authentication token:** Select the `sonarqube-token` credential
4. **Enable SonarQube:** ✓

### SonarQube Webhook Configuration

**SonarQube > Administration > Webhooks**

1. **Name:** `Jenkins`
2. **URL:** `http://jenkins:8080/sonarqube-webhook/` (or your Jenkins URL)
3. **Secret:** (optional, for HMAC-SHA256 signing)
4. **Events:** Select "Quality Gate Event"

**Purpose:** Allows SonarQube to notify Jenkins when Quality Gate evaluation completes, enabling the pipeline to continue or fail based on the result.

---

## Pipeline Failure Modes

The pipeline will FAIL and STOP at:

| Stage | Failure Condition | Severity |
|-------|-------------------|----------|
| **Gitleaks Scan** | Secrets detected in repository | 🔴 CRITICAL |
| **SonarQube Quality Gate** | Code quality thresholds not met | 🔴 CRITICAL |
| **Any CI stage** | Linting, tests, or build fails | 🔴 CRITICAL |

**No workarounds:** Failures are not suppressed or hidden. Developers must fix the issue to proceed.

---

## Testing Security Stages

### Testing Gitleaks (Safe Method)

To verify Gitleaks is working without actually committing secrets:

1. Create a test branch
2. Add a fake AWS key pattern in a test file:
   ```
   AWS_KEY=AKIA1234567890ABCDEF  # Fake key for testing
   ```
3. Run pipeline
4. Gitleaks will detect it and fail
5. Remove the pattern and re-run
6. Gitleaks passes

**Never commit actual secrets to any branch.**

### Testing SonarQube Quality Gate

1. Run the pipeline normally
2. After "SonarQube Analysis" completes, check:
   - **Jenkins > Build Logs** — Should show "Waiting for Quality Gate"
   - **SonarQube Dashboard** — New project appears with analysis results
   - **Quality Gate Status** — Check if PASS or FAIL
3. If Quality Gate is FAIL, pipeline stops (expected behavior)
4. Fix issues shown in SonarQube and re-run pipeline

---

## Not Yet Implemented

The following DevSecOps stages are **planned for future phases**:

- ❌ OWASP Dependency-Check (dependency vulnerability scanning)
- ❌ Trivy (container image vulnerability scanning)
- ❌ OWASP ZAP (dynamic application security testing)
- ❌ Docker image building and registry push
- ❌ Container deployment (Kubernetes, ECS, etc.)
- ❌ Infrastructure as Code (Terraform, Ansible)

---

## Build Failure

### Dependency Management
```bash
npm audit              # Check for vulnerabilities
npm ci                 # Reproducible installs (CI/CD)
npm install            # Development installs
```

### Configuration
- No hardcoded secrets
- No exposed API keys
- Environment variables in `.env.example` (placeholder only)
- `package-lock.json` committed for reproducible builds
- `.env` files excluded from git

### Testing & Linting
- Automated tests with Vitest + React Testing Library
- Code quality checks with oxlint
- TypeScript strict mode enabled
- Browser API mocks for jsdom testing

---

## Features

### Design & Motion
- **Scroll-triggered reveals** with Framer Motion
- **Parallax hero** (scroll-linked character drift)
- **Orbiting skill cards** on desktop, mobile ticker on mobile
- **Glowing DevSecOps pipeline** with animated gradient
- **Reduced motion** support (`prefers-reduced-motion`)

### Accessibility
- Semantic HTML structure
- `:focus-visible` states on all interactive elements
- Keyboard-navigable components
- Screen reader friendly
- Custom cursor disabled on touch devices

### Responsive
- Mobile-first design
- Desktop optimizations (orbiting cards vs. mobile ticker)
- Touch-friendly navigation
- Tested on modern browsers

---

## Customization

### Edit Content
All content lives in `src/data/`:
- `profile.ts` — name, title, tagline, contact
- `experience.ts` — work history
- `skills.ts` — skill cards and skill groups
- `education.ts` — degrees and coursework
- `project.ts` — DevSecOps pipeline stages

No component rewrite needed — just update the data files.

### Replace Character
The character is pure SVG code in `Character.tsx`. Either:
1. **Edit the SVG gradients/shapes** directly in the code
2. **Replace with an image:** swap `<motion.svg>` for `<motion.img>` pointing to `src/assets/character.png`

### Customize Animations
Edit `src/animations/`:
- `heroAnimations.ts` — hero text entrance
- `scrollAnimations.ts` — scroll-triggered reveals
- `cardAnimations.ts` — skill card cycle and transitions

### Skill Card Glyphs
Available icons in `src/components/shared/Glyph.tsx`:
`jenkins`, `docker`, `kubernetes`, `aws`, `sonarqube`, `trivy`, `zap`, `github`, `git`, `maven`, `terminal`, `network`, `test`, `deploy`, `cloud`, `code`

---

## Future DevSecOps Integration

This project is prepared for the following CI/CD and DevSecOps pipeline (planned for future phases):

```
Source Code (GitHub)
    ↓
Webhook → Jenkins
    ↓
Stages:
  1. Checkout (Git)
  2. Build (npm ci → npm run build)
  3. Test (npm test)
  4. Lint (npm run lint)
  5. SAST (SonarQube)
  6. Dependency Check (npm audit + Dependency-Check)
  7. Secret Scan (Gitleaks)
  8. Docker Build (docker build)
  9. Image Scan (Trivy)
  10. Push to Registry (Docker Hub / ECR)
  11. Deploy (Kubernetes / ECS / EC2)
  12. DAST (OWASP ZAP)
    ↓
Production
```

**Current Status:** Application is production-ready and containerized. Jenkins pipeline, Kubernetes manifests, and security scanning tools will be added in the next phases.

---

## Known Limitations & Notes

- **No Backend:** This is a frontend-only portfolio. Future versions may integrate a backend API.
- **Testing:** Minimal test suite covers component rendering. Add more tests as needed.
- **Linting:** Oxlint is configured. ESLint can be added if preferred.
- **Performance:** Vite's tree-shaking and code-splitting keep the bundle small (~377KB gzipped).

---

## Troubleshooting

### Build fails with TypeScript errors
```bash
npm run build
```
If errors occur, check `tsconfig.app.json` for strict mode settings. The project enforces `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.

### Tests fail with missing mocks
Tests require browser API mocks for Framer Motion and media queries. These are defined in `src/test/setup.ts`. If you add new browser-dependent code, update the setup file.

### Docker container won't start
Check:
```bash
docker logs omkar-portfolio
```
Ensure port 8080 is available:
```bash
docker run -d -p 8081:80 --name omkar-portfolio omkar-devops-portfolio:local
```

### CORS or API errors
Currently, the portfolio doesn't fetch external APIs. If you add API calls, ensure `.env` variables are set and requests respect CORS.

---

## License

Personal portfolio project. Use and modify for your own portfolio.

---

## Contact

- **GitHub:** [omkarawaregithub](https://github.com/omkarawaregithub)
- **LinkedIn:** [Omkar Aware](https://linkedin.com/in/omkar-aware)
- **Email:** omkaraware1301@gmail.com
