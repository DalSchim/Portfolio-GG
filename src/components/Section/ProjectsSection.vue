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

const GITHUB_USER = "DalSchim"; // ✅

const loading = ref(true);
const error = ref<string | null>(null);
const repos = ref<Repo[]>([]);

function normalizeUrl(url: string) {
  const u = url.trim();
  if (!u) return "";
  return u.startsWith("http") ? u : `https://${u}`;
}

function liveUrl(repo: Repo) {
  const hp = (repo.homepage ?? "").trim();
  return hp ? normalizeUrl(hp) : "";
}

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
};

const langBadge = (lang: string) => ICONS[lang] ?? lang.slice(0, 3).toUpperCase();

async function fetchRepos() {
  loading.value = true;
  error.value = null;

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

    repos.value = data.filter((r) => !r.fork && !r.archived);
  } catch (e: any) {
    error.value = e?.message ?? "Erreur inconnue";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchRepos);

// ✅ 3 repos "featured" (les plus récents)
const featured = computed(() => {
  return [...repos.value]
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 3);
});
</script>

<template>
  <section class="Projects">
    <div class="container">
      <div class="head">
        <h2>Projets sélectionnés</h2>
        <router-link to="/Projects" class="see-all" draggable="false">Voir tout →</router-link>
      </div>

      <div v-if="loading" class="state">Chargement…</div>
      <div v-else-if="error" class="state error">{{ error }}</div>

      <div v-else class="grid">
        <article v-for="r in featured" :key="r.id" class="card">
          <div class="top">
            <h3>{{ r.name }}</h3>

            <span v-if="r.language" class="lang">
              <span class="badge">{{ langBadge(r.language) }}</span>
              <span class="lang-name">{{ r.language }}</span>
            </span>
          </div>

          <p class="desc">
            {{ r.description || "Pas de description." }}
          </p>

          <div class="actions">
            <a
                v-if="liveUrl(r)"
                class="btn live"
                :href="liveUrl(r)"
                target="_blank"
                rel="noreferrer"
                draggable="false"
            >
              Live
            </a>

            <a
                class="btn repo"
                :href="r.html_url"
                target="_blank"
                rel="noreferrer"
                draggable="false"
            >
              Repo
            </a>
          </div>

          <div class="meta">
            <span>★ {{ r.stargazers_count }}</span>
            <span class="dot">•</span>
            <span>Maj: {{ new Date(r.updated_at).toLocaleDateString() }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.Projects {
  padding: 110px 0;
  background: var(--background-color);
  position: relative;
  overflow: hidden;

  /* HUD grid subtil */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(rgba(48,188,237,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(48,188,237,0.05) 1px, transparent 1px);
    background-size: 72px 72px;
    opacity: 0.12;
    pointer-events: none;
  }

  .container {
    width: min(1100px, 85%);
    margin: auto;
    color: var(--text-color);
    font-family: "Kode Mono", monospace;
    position: relative;
    z-index: 1;
  }

  .head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 34px;
  }

  h2 {
    margin: 0;
    font-size: 34px;
    color: var(--secondary-color);
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .see-all {
    text-decoration: none;
    color: var(--text-color);
    opacity: 0.85;
    transition: 0.2s ease;

    &:hover {
      opacity: 1;
      color: var(--primary-color);
    }
  }

  .state {
    padding: 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    margin-top: 18px;

    &.error { border-color: rgba(252, 83, 49, 0.25); }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
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

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    h3 {
      margin: 0;
      font-size: 18px;
      color: var(--primary-color);
      letter-spacing: 1px;
    }
  }

  .lang {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    opacity: 0.9;
    font-size: 13px;
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
    margin: 14px 0 14px 0;
    opacity: 0.85;
    line-height: 1.6;
    min-height: 52px;
  }

  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 12px;
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

  .meta {
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.7;
    font-size: 12px;

    .dot { opacity: 0.6; }
  }

  @media (max-width: 1000px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 640px) {
    .head { flex-direction: column; align-items: flex-start; }
    .grid { grid-template-columns: 1fr; }
  }
}
</style>
