<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="NavComponent">
    <nav>
      <!-- Brand -->
      <div class="brand">
        <img src="/public/logo.gif" alt="logo" class="logo-img" />
        <span class="logo-text">GGONIDOU</span>
      </div>

      <!-- Desktop links -->
      <ul class="menu-desktop">
        <li><router-link to="/" draggable="false">Home</router-link></li>
        <li><router-link to="/About" draggable="false">About</router-link></li>
        <li><router-link to="/Projects" draggable="false">Projects</router-link></li>
      </ul>

      <!-- Actions -->
      <div class="actions">
        <router-link to="/contact" class="contact-btn" draggable="false">
          Contact
        </router-link>

        <!-- Burger (mobile) -->
        <button
            class="burger"
            @click="toggleMenu"
            :aria-expanded="isOpen"
            aria-label="Menu"
            type="button"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile panel -->
      <div class="menu-mobile" :class="{ open: isOpen }">
        <router-link to="/" @click="closeMenu" draggable="false">Home</router-link>
        <router-link to="/About" @click="closeMenu" draggable="false">About</router-link>
        <router-link to="/Projects" @click="closeMenu" draggable="false">Projects</router-link>
        <button class="contact-btn mobile" type="button" @click="closeMenu" draggable="false">
          Contact
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.NavComponent {
  position: fixed;
  top: 18px;
  width: 100%;
  height: 80px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  nav {
    width: min(1100px, 78%);
    height: 76px;
    padding: 0 26px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    background: linear-gradient(135deg, rgba(48, 48, 54, 0.65), rgba(48, 48, 54, 0.35));
    backdrop-filter: blur(18px);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(48, 188, 237, 0.08) inset;

    position: relative;
    overflow: visible; /* ✅ IMPORTANT pour que le menu mobile dépasse */
  }

  /* scan */
  nav::before {
    content: "";
    position: absolute;
    top: -120%;
    left: -40%;
    width: 180%;
    height: 220%;
    background: linear-gradient(90deg, transparent, rgba(48, 188, 237, 0.14), transparent);
    transform: rotate(12deg);
    animation: scan 5.5s linear infinite;
    pointer-events: none;
  }

  @keyframes scan {
    0% { transform: translateY(0) rotate(12deg); opacity: 0.25; }
    50% { opacity: 0.45; }
    100% { transform: translateY(120%) rotate(12deg); opacity: 0.25; }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 2;

    .logo-img {
      height: 40px;
      filter: drop-shadow(0 0 10px rgba(48, 188, 237, 0.25));
    }

    .logo-text {
      font-family: "Kode Mono", monospace;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--text-color);
      text-shadow: 0 0 14px rgba(48, 188, 237, 0.2);
    }
  }

  .menu-desktop {
    display: flex;
    align-items: center;
    gap: 26px;
    padding: 0;
    margin: 0;
    z-index: 2;

    li {
      list-style: none;

      a {
        font-family: "Kode Mono", monospace;
        font-size: 14px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(225, 204, 183, 0.88);
        text-decoration: none;
        padding: 10px 10px;
        border-radius: 10px;
        position: relative;
        transition: 0.25s ease;

        &::after {
          content: "";
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 6px;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
          transition: transform 0.25s ease;
          opacity: 0.9;
        }

        &:hover {
          color: var(--text-color);
          background: rgba(48, 188, 237, 0.06);
          box-shadow: 0 0 0 1px rgba(48, 188, 237, 0.16) inset;
        }

        &:hover::after { transform: scaleX(1); }
      }

      .router-link-active {
        color: var(--text-color);
        background: rgba(252, 83, 49, 0.08);
        box-shadow: 0 0 0 1px rgba(252, 83, 49, 0.22) inset, 0 0 18px rgba(252, 83, 49, 0.18);

        &::after { transform: scaleX(1); }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 2;
  }

  .contact-btn {
    font-family: "Kode Mono", monospace;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 13px;

    padding: 10px 16px;
    border-radius: 12px;
    cursor: pointer;

    background: linear-gradient(135deg, rgba(252, 83, 49, 0.95), rgba(48, 188, 237, 0.75));
    color: #0c0c0e;
    border: 1px solid rgba(255, 255, 255, 0.10);

    box-shadow: 0 10px 22px rgba(0,0,0,0.25), 0 0 22px rgba(48,188,237,0.22), 0 0 22px rgba(252,83,49,0.18);
    transition: 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      filter: brightness(1.05);
    }
  }

  /* Burger */
  .burger {
    display: none; /* caché desktop */
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid rgba(48, 188, 237, 0.22);
    background: rgba(48, 188, 237, 0.06);
    box-shadow: 0 0 0 1px rgba(48, 188, 237, 0.10) inset;
    cursor: pointer;

    span {
      display: block;
      width: 18px;
      height: 2px;
      margin: 4px auto;
      background: var(--text-color);
      opacity: 0.9;
      transition: 0.2s ease;
    }
  }

  /* Mobile menu panel */
  .menu-mobile {
    position: absolute;
    top: calc(100% + 10px); /* ✅ fiable */
    left: 0;
    right: 0;
    margin: 0 10px;

    border-radius: 16px;
    background: rgba(48, 48, 54, 0.88);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 60px rgba(0,0,0,0.40);

    padding: 12px;
    display: grid;
    gap: 10px;

    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: 0.2s ease;
    z-index: 9999; /* ✅ au-dessus */

    a {
      font-family: "Kode Mono", monospace;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      font-size: 13px;
      color: var(--text-color);
      text-decoration: none;
      padding: 12px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);

      &:hover {
        border-color: rgba(48, 188, 237, 0.22);
        background: rgba(48, 188, 237, 0.06);
      }
    }

    .contact-btn.mobile {
      width: 100%;
    }

    &.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  }

  /* ✅ Breakpoints */
  @media (max-width: 900px) {
    nav { width: min(1000px, 90%); padding: 0 18px; }
    .menu-desktop { gap: 18px; }
  }

  @media (max-width: 760px) {
    nav { width: 92%; }
    .menu-desktop { display: none; }
    .contact-btn.desktop { display: none; }
    .burger { display: inline-flex; align-items: center; justify-content: center; }
  }

  @media (max-width: 420px) {
    nav { height: 72px; }
    .brand .logo-text { font-size: 16px; letter-spacing: 2px; }
    .brand .logo-img { height: 36px; }
  }
}
</style>
