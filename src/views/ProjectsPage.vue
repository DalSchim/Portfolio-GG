<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const GITHUB_USER = "DalSchim"; // ✅ Mets ton username GitHub

const loading = ref(true);
const error = ref<string | null>(null);
const repos = ref<Repo[]>([]);

/* cache */
const CACHE_KEY = `gh_repos_${GITHUB_USER}`;
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.time > CACHE_TTL_MS) return null;
    return data.repos as Repo[];
  } catch {
    return null;
  }
}

function setCached(list: Repo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), repos: list }));
  } catch {}
}

function normalizeUrl(url: string) {
  const u = url.trim();
  if (!u) return "";
  return u.startsWith("http") ? u : `https://${u}`;
}

function liveUrl(repo: Repo) {
  const hp = (repo.homepage ?? "").trim();
  return hp ? normalizeUrl(hp) : "";
}

async function fetchRepos() {
  loading.value = true;
  error.value = null;

  const cached = getCached();
  if (cached) {
    repos.value = cached;
    loading.value = false;
    return;
  }

  try {
    const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(import.meta.env.VITE_GH_TOKEN
            ? { Authorization: `Bearer ${import.meta.env.VITE_GH_TOKEN}` }
            : {}),
      },
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const data = (await res.json()) as Repo[];

    const cleaned = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    repos.value = cleaned;
    setCached(cleaned);
  } catch (e: any) {
    error.value = e?.message ?? "Erreur inconnue";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchRepos);

const hasRepos = computed(() => repos.value.length > 0);

const ICONS: Record<string, string> = {
  JavaScript: "JS",
  TypeScript: "TS",
  Vue: "VUE",
  HTML: "HTML",
  CSS: "CSS",
  SCSS: "SCSS",
  Python: "PY",
  Java: "JAVA",
  "C#": "C#",
  PHP: "PHP",
  Go: "GO",
  Rust: "RS",
};

const langBadge = (lang: string) => ICONS[lang] ?? lang.slice(0, 3).toUpperCase();
</script>

<template>
  <section class="ProjectsPage">
    <div class="container">
      <header class="head">
        <h1>Projets</h1>
        <p class="sub">
          Projets récupérés depuis GitHub. Le bouton <strong>Live</strong> apparaît si un site est
          renseigné dans la Homepage du repo.
        </p>
      </header>

      <div v-if="loading" class="state">Chargement…</div>

      <div v-else-if="error" class="state error">
        {{ error }}
        <div class="hint">
          Si tu as un “rate limit”, ajoute un token dans <code>.env</code> :
          <code>VITE_GH_TOKEN=xxxx</code>
        </div>
      </div>

      <div v-else-if="!hasRepos" class="state">Aucun repo trouvé.</div>

      <div v-else class="grid">
        <article v-for="r in repos" :key="r.id" class="card">
          <div class="top">
            <div class="title">
              <h2>{{ r.name }}</h2>

              <div class="meta">
                <span v-if="r.language" class="lang">
                  <span class="badge" :title="r.language">{{ langBadge(r.language) }}</span>
                  <span class="lang-name">{{ r.language }}</span>
                </span>

                <span class="stars">★ {{ r.stargazers_count }}</span>
              </div>
            </div>
          </div>

          <p class="desc">
            {{ r.description || "Pas de description." }}
          </p>

          <!-- ✅ Boutons Live + Repo -->
          <div class="links">
            <a
                v-if="liveUrl(r)"
                class="btn live"
                :href="liveUrl(r)"
                target="_blank"
                rel="noreferrer"
            >
              Live
            </a>

            <a
                class="btn repo"
                :href="r.html_url"
                target="_blank"
                rel="noreferrer"
            >
              Repo
            </a>

            <span class="date">Maj: {{ new Date(r.updated_at).toLocaleDateString() }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ProjectsPage {
  min-height: 100vh;
  padding-top: 120px;
  background: var(--background-color);
  color: var(--text-color);
  font-family: "Kode Mono", monospace;
  position: relative;
  overflow: hidden;
}

.ProjectsPage::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
      linear-gradient(rgba(48,188,237,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(48,188,237,0.05) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: 0.14;
  pointer-events: none;
}

.container {
  width: min(1200px, 88%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.head {
  margin-bottom: 28px;

  h1 {
    font-size: clamp(34px, 4.5vw, 54px);
    margin: 0 0 10px 0;
    letter-spacing: 2px;
  }

  .sub {
    opacity: 0.8;
    line-height: 1.6;
    max-width: 780px;
    margin: 0;
  }
}

.state {
  padding: 18px;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  margin-top: 18px;

  &.error { border-color: rgba(252, 83, 49, 0.25); }

  .hint {
    margin-top: 10px;
    opacity: 0.75;
    font-size: 13px;
  }

  code {
    background: rgba(255,255,255,0.06);
    padding: 2px 6px;
    border-radius: 8px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 22px 0 70px 0;
}

.card {
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 18px 60px rgba(0,0,0,0.22);
  padding: 18px;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(48,188,237,0.22);
    box-shadow: 0 22px 70px rgba(0,0,0,0.28);
  }
}

.title h2 {
  font-size: 18px;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.85;
  font-size: 13px;
}

.lang {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  padding: 6px 8px;
  border-radius: 999px;
  border: 1px solid rgba(48,188,237,0.22);
  background: rgba(48,188,237,0.06);
  color: var(--text-color);
  font-size: 11px;
  letter-spacing: 1px;
}

.desc {
  margin: 14px 0 10px 0;
  opacity: 0.85;
  line-height: 1.6;
  min-height: 52px;
}

/* ✅ Boutons */
.links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
  opacity: 0.9;
}

.btn {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  transition: 0.2s ease;
  font-family: "Kode Mono", monospace;
}

/* Live */
.live {
  background: linear-gradient(
          135deg,
          rgba(252, 83, 49, 0.95),
          rgba(48, 188, 237, 0.85)
  );
  color: #0c0c0e;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
  }
}

/* Repo */
.repo {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  color: var(--text-color);

  &:hover {
    background: rgba(48,188,237,0.08);
    border-color: rgba(48,188,237,0.25);
    transform: translateY(-2px);
  }
}

.date {
  opacity: 0.7;
  font-size: 12px;
}

/* Responsive */
@media (max-width: 1000px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
