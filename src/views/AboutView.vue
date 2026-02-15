<script setup lang="ts">
</script>

<template>
  <section class="AboutPage">

    <!-- HERO ABOUT -->
    <div class="about-hero">
      <h1>
        À propos de <span>GGONIDOU</span>
      </h1>
      <p>
        Chef de projet en transformation digitale et passionné de développement web & UI/UX.
      </p>
    </div>

    <!-- PRESENTATION -->
    <div class="container about-content">
      <div class="about-text">
        <h2>Mon positionnement</h2>
        <p>
          J’accompagne les organisations dans leur transformation digitale
          en combinant vision stratégique, pilotage opérationnel et expertise technique.
          Mon objectif : créer des solutions digitales performantes,
          durables et centrées utilisateur.
        </p>

        <p>
          Passionné par le développement web et le design d’interface,
          je m’investis autant dans l’architecture technique que dans
          l’expérience utilisateur.
        </p>
      </div>

      <div class="about-stats">
        <div class="stat">
          <h3>+10</h3>
          <span>Projets digitaux</span>
        </div>
        <div class="stat">
          <h3>Agile</h3>
          <span>Méthodologie</span>
        </div>
        <div class="stat">
          <h3>UX First</h3>
          <span>Approche produit</span>
        </div>
      </div>
    </div>

    <!-- VISION -->
    <div class="container vision">
      <h2>Ma vision</h2>
      <p>
        La transformation digitale ne se limite pas à la technologie.
        Elle repose sur une compréhension des usages, des besoins métiers
        et des enjeux stratégiques.
      </p>
    </div>

  </section>
</template>

<style scoped lang="scss">
.AboutPage {
  min-height: 100vh;
  padding-top: 120px;
  background: var(--background-color);
  color: var(--text-color);
  font-family: "Kode Mono", monospace;
  position: relative;
  overflow: hidden;
}

/* subtle grid background */
.AboutPage::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
      linear-gradient(rgba(48,188,237,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(48,188,237,0.06) 1px, transparent 1px);
  background-size: 70px 70px;
  opacity: 0.15;
  pointer-events: none;
}

.container {
  width: min(1100px, 85%);
  margin: auto;
  padding: 80px 0;
}

/* HERO */
.about-hero {
  text-align: center;
  margin-bottom: 80px;

  h1 {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 20px;

    span {
      color: var(--primary-color);
      text-shadow: 0 0 20px rgba(252,83,49,0.4);
    }
  }

  p {
    opacity: 0.8;
    font-size: 18px;
  }
}

/* CONTENT */
.about-content {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: center;
}

.about-text {
  flex: 1;

  h2 {
    margin-bottom: 20px;
    color: var(--secondary-color);
  }

  p {
    line-height: 1.7;
    margin-bottom: 20px;
    opacity: 0.85;
  }
}

.about-stats {
  flex: 1;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat {
  flex: 1;
  min-width: 150px;
  padding: 30px;
  border-radius: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(48,188,237,0.15);
  text-align: center;
  transition: 0.3s ease;

  h3 {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 30px rgba(48,188,237,0.2);
  }
}

/* Vision */
.vision {
  text-align: center;

  h2 {
    margin-bottom: 20px;
    color: var(--primary-color);
  }

  p {
    max-width: 700px;
    margin: auto;
    line-height: 1.7;
    opacity: 0.85;
  }
}

/* RESPONSIVE */
@media(max-width: 900px){
  .about-content{
    flex-direction: column;
  }

  .about-stats{
    justify-content: center;
  }
}
</style>
