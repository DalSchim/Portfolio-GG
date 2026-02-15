<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type Repo = {
  id: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
};

const GITHUB_USER = "DalSchim"; // ✅ mets ton username

const loading = ref(true);
const error = ref<string | null>(null);
const repos = ref<Repo[]>([]);

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

/**
 * “Moyenne” = ici on calcule la part des repos dont le langage principal = X
 * Exemple : 12 repos au total, 6 en TS => 50%
 */
const languageStats = computed(() => {
  const counts = new Map<string, number>();
  const valid = repos.value
      .map((r) => r.language)
      .filter((l): l is string => !!l && l !== "Shell"); // tu peux enlever le filtre Shell si tu veux

  const total = valid.length;

  for (const lang of valid) {
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }

  const list = [...counts.entries()]
      .map(([lang, count]) => ({
        lang,
        count,
        pct: total ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

  return {
    totalRepos: repos.value.length,
    totalLangRepos: total,
    top: list.slice(0, 8), // top 8 langages affichés
  };
});

// petits labels “icône texte”
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

function badge(lang: string) {
  return ICONS[lang] ?? lang.slice(0, 3).toUpperCase();
}
</script>

<template>
  <section class="Impact">
    <div class="container">
      <div class="head">
        <h2>Impact & Stack</h2>
        <p class="sub">
          Analyse automatique de mes repos GitHub (langage principal par projet).
        </p>
      </div>

      <div v-if="loading" class="state">Analyse GitHub…</div>
      <div v-else-if="error" class="state error">{{ error }}</div>

      <div v-else class="content">
        <div class="summary">
          <div class="pill">
            <span class="label">Repos analysés</span>
            <span class="value">{{ languageStats.totalRepos }}</span>
          </div>

          <div class="pill">
            <span class="label">Repos avec langage</span>
            <span class="value">{{ languageStats.totalLangRepos }}</span>
          </div>

          <div class="pill accent">
            <span class="label">Top stack</span>
            <span class="value">
              {{ languageStats.top[0]?.lang ?? "—" }}
            </span>
          </div>
        </div>

        <div class="grid">
          <div v-for="item in languageStats.top" :key="item.lang" class="row">
            <div class="left">
              <span class="badge" :title="item.lang">{{ badge(item.lang) }}</span>
              <span class="name">{{ item.lang }}</span>
            </div>

            <div class="bar">
              <span class="fill" :style="{ width: item.pct + '%' }"></span>
            </div>

            <div class="right">
              <span class="pct">{{ item.pct }}%</span>
              <span class="count">({{ item.count }})</span>
            </div>
          </div>
        </div>

        <p class="note">
          % = part des projets dont le langage principal est celui-ci (donnée GitHub “language”).
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.Impact {
  padding: 120px 0;
  background: rgba(255,255,255,0.02);
  position: relative;
  overflow: hidden;

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
    text-align: center;
    margin-bottom: 34px;

    h2 {
      margin: 0 0 12px 0;
      color: var(--secondary-color);
      letter-spacing: 3px;
      text-transform: uppercase;
      font-size: 34px;
    }

    .sub {
      margin: 0 auto;
      max-width: 720px;
      opacity: 0.8;
      line-height: 1.7;
    }
  }

  .state {
    padding: 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);

    &.error {
      border-color: rgba(252, 83, 49, 0.25);
    }
  }

  .summary {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 24px;

    .pill {
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      min-width: 190px;

      .label { opacity: 0.75; font-size: 12px; }
      .value { display: block; margin-top: 6px; font-size: 18px; }
    }

    .accent {
      border-color: rgba(48,188,237,0.22);
      box-shadow: 0 0 0 1px rgba(48,188,237,0.10) inset;
    }
  }

  .grid {
    display: grid;
    gap: 12px;
  }

  .row {
    display: grid;
    grid-template-columns: 220px 1fr 90px;
    align-items: center;
    gap: 12px;

    padding: 14px;
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .left {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    .name { opacity: 0.9; }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(48,188,237,0.22);
    background: rgba(48,188,237,0.06);
    font-size: 11px;
    letter-spacing: 1px;
  }

  .bar {
    height: 10px;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);

    .fill {
      display: block;
      height: 100%;
      width: 0%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
      transition: width 400ms ease;
    }
  }

  .right {
    text-align: right;
    .pct { font-size: 13px; }
    .count { opacity: 0.7; font-size: 12px; margin-left: 6px; }
  }

  .note {
    margin-top: 14px;
    opacity: 0.65;
    font-size: 12px;
    text-align: center;
  }

  @media (max-width: 720px) {
    .row {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .right { text-align: left; }
  }
}
</style>
