<script setup lang="ts">
</script>

<template>
  <header class="Hero" id="home">

    <span class="Htyle1"></span>
    <span class="Fstyle2"></span>

    <div class="hero-content">

      <!-- LEFT -->
      <div class="hero-text">

        <p class="kicker">
          PORTFOLIO • TRANSFORMATION DIGITALE • WEB • UI/UX
        </p>

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
          <router-link to="/Projects" class="btn primary" draggable="false">
            Voir mes projets
          </router-link>

          <router-link to="/About" class="btn ghost" draggable="false">
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

/* ===== GLOBAL NON-SELECTION ===== */

.Hero,
.Hero * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.hero-visual img {
  pointer-events: none;
  -webkit-user-drag: none;
}

/* ===== LAYOUT ===== */

.Hero {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--background-color);

  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 80px;
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

/* Grid */

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
  width: min(1300px, 90%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

/* ===== TEXT ===== */

.hero-text {
  flex: 1;
  font-family: "Kode Mono", monospace;
  color: var(--text-color);
}

.kicker {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.7;
}

h1 {
  font-size: clamp(46px, 5vw, 72px);
  line-height: 1.05;
  margin-bottom: 20px;
  font-weight: 800;
}

.accent {
  color: var(--primary-color);
  text-shadow: 0 0 25px rgba(252,83,49,0.5);
}

.subtitle {
  font-size: 17px;
  line-height: 1.7;
  opacity: 0.85;
  max-width: 600px;
  margin-bottom: 30px;
}

/* Buttons */

.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.btn {
  padding: 14px 24px;
  border-radius: 14px;
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
      0 0 30px rgba(48,188,237,0.3);

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

/* Chips */

.chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}

/* ===== IMAGE ===== */

.hero-visual {
  flex: 1.4;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 550px;
}

.hero-visual img {
  width: min(1000px, 140%);
  max-width: none;
  height: auto;
  transform: scale(1.3);
  filter: drop-shadow(0 0 60px rgba(48, 188, 237, 0.35));
  animation: float 7s ease-in-out infinite;
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: scale(1.3) translateY(0px); }
  50% { transform: scale(1.3) translateY(-18px); }
}

/* ===== RESPONSIVE ===== */

@media (max-width: 900px) {
  .Hero {
    padding-top: 96px; /* un peu moins que 120 */
    min-height: auto;  /* on laisse le contenu définir la hauteur */
    padding-bottom: 40px;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 28px;
  }

  .subtitle {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .actions {
    justify-content: center;
  }

  .hero-visual {
    min-height: 320px; /* au lieu de 550 */
  }

  .hero-visual img {
    width: min(560px, 100%);
    transform: scale(1.05);
  }
}

@media (max-width: 480px) {
  .Hero {
    padding-top: 88px;
    padding-bottom: 28px;
  }

  h1 {
    font-size: clamp(34px, 9vw, 44px);
    line-height: 1.08;
  }

  .subtitle {
    font-size: 15px;
    line-height: 1.65;
  }

  .btn {
    width: 100%;
    padding: 12px 18px;
  }

  .hero-visual {
    min-height: 240px;
  }

  .hero-visual img {
    width: 100%;
    transform: scale(1);
  }
}


</style>
