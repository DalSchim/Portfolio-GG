<script setup lang="ts">
</script>

<template>
  <header class="Hero" id="home">

    <!-- Background layers -->
    <span class="Htyle1"></span>
    <span class="Fstyle2"></span>

    <div class="hero-content">

      <!-- LEFT -->
      <div class="hero-text">
        <p class="kicker">PORTFOLIO • TRANSFORMATION DIGITALE • WEB • UI/UX</p>

        <h1>
          Chef de projet<br />
          <span class="accent">Transformation Digitale</span>
        </h1>

        <p class="subtitle">
          Je pilote des projets digitaux de bout en bout et je conçois des interfaces modernes.
          Passionné par le développement web et le design UI/UX, j’aime transformer des idées
          en produits clairs, rapides et centrés utilisateur.
        </p>

        <div class="actions">
          <router-link to="/Projects" class="btn primary">
            Voir mes projets
          </router-link>

          <router-link to="/About" class="btn ghost">
            En savoir plus
          </router-link>
        </div>

        <div class="chips">
          <span class="chip">Gestion de projet</span>
          <span class="chip">Transfo digitale</span>
          <span class="chip">Dev Web</span>
          <span class="chip">UI/UX</span>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="hero-visual">
        <img src="/robot.gif" alt="Illustration futuriste" />
      </div>

    </div>
  </header>
</template>

<style scoped lang="scss">
.Hero {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--background-color);

  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 120px; /* espace pour nav fixed */
}

/* Gradients */
.Htyle1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(
          180deg,
          rgba(48, 188, 237, 0.18) 0%,
          rgba(48, 48, 54, 0.95) 85%
  );
  z-index: 0;
}

.Fstyle2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(
          0deg,
          rgba(252, 83, 49, 0.16) 0%,
          rgba(48, 48, 54, 0.92) 85%
  );
  z-index: 0;
}

/* Subtle grid */
.Hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
      linear-gradient(rgba(48,188,237,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(48,188,237,0.05) 1px, transparent 1px);
  background-size: 70px 70px;
  opacity: 0.2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(1200px, 86%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.hero-text {
  flex: 1;
  font-family: "Kode Mono", monospace;
  color: var(--text-color);

  .kicker {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  h1 {
    font-size: clamp(42px, 5vw, 64px);
    line-height: 1.05;
    margin-bottom: 20px;
    font-weight: 800;

    .accent {
      color: var(--primary-color);
      text-shadow: 0 0 20px rgba(252,83,49,0.4);
    }
  }

  .subtitle {
    font-size: 16px;
    line-height: 1.7;
    opacity: 0.85;
    max-width: 550px;
    margin-bottom: 30px;
  }

  .actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .btn {
      padding: 12px 20px;
      border-radius: 12px;
      text-decoration: none;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: 0.3s ease;
    }

    .primary {
      background: linear-gradient(
              135deg,
              var(--primary-color),
              var(--secondary-color)
      );
      color: #0c0c0e;
      box-shadow:
          0 10px 28px rgba(0,0,0,0.35),
          0 0 20px rgba(48,188,237,0.25);

      &:hover {
        transform: translateY(-3px);
      }
    }

    .ghost {
      border: 1px solid rgba(48,188,237,0.3);
      background: rgba(48,188,237,0.05);
      color: var(--text-color);

      &:hover {
        background: rgba(48,188,237,0.1);
        transform: translateY(-3px);
      }
    }
  }

  .chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .chip {
      font-size: 12px;
      padding: 8px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
    }
  }
}

/* ===== VISUAL ===== */

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
}

.hero-visual img {
  width: min(600px, 100%);
  max-width: 100%;
  height: auto;

  transform: scale(1.15);
  filter: drop-shadow(0 0 36px rgba(48, 188, 237, 0.22));
  animation: float 7s ease-in-out infinite;
  opacity: 0.98;
}

@keyframes float {
  0%, 100% { transform: scale(1.15) translateY(0px); }
  50% { transform: scale(1.15) translateY(-14px); }
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-visual {
    min-height: 340px;
  }

  .hero-visual img {
    width: min(520px, 92%);
    transform: scale(1.05);
  }
}

@media (max-width: 480px) {
  .hero-visual {
    min-height: 260px;
  }

  .hero-visual img {
    width: 92%;
    transform: scale(1);
  }
}
</style>
