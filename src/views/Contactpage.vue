<template>
  <section class="ContactPage">
    <div class="container">
      <h1>Contact</h1>

      <form class="form" @submit.prevent="sendEmail" novalidate>
        <div class="field">
          <label>Nom</label>
          <input v-model.trim="form.name" type="text" required />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model.trim="form.email" type="email" required />
        </div>

        <div class="field">
          <label>Sujet</label>
          <input v-model.trim="form.title" type="text" required />
        </div>

        <div class="field">
          <label>Message</label>
          <textarea v-model.trim="form.message" rows="6" required></textarea>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Envoi..." : "Envoyer" }}
        </button>

        <p v-if="success" class="success">Message envoyé ✅</p>
        <p v-if="error" class="error">Erreur lors de l'envoi ❌</p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import emailjs from "@emailjs/browser";

const form = reactive({
  name: "",
  email: "",
  title: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);
const error = ref(false);

async function sendEmail() {
  loading.value = true;
  success.value = false;
  error.value = false;

  try {
    // 🔎 debug rapide si besoin (à enlever après)
    // console.log(import.meta.env.VITE_EMAIL_SERVICE, import.meta.env.VITE_EMAIL_TEMPLATE, import.meta.env.VITE_EMAIL_PUBLIC);

    await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          // ✅ Doit matcher TON template EmailJS
          name: form.name,                      // {{name}}
          email: form.email,                    // {{email}}
          title: form.title,                    // {{title}}
          message: form.message,                // {{message}}
          time: new Date().toLocaleString(),    // {{time}}
        },
        import.meta.env.VITE_EMAIL_PUBLIC
    );

    success.value = true;

    // reset
    form.name = "";
    form.email = "";
    form.title = "";
    form.message = "";
  } catch (e: any) {
    error.value = true;
    console.error("EmailJS error:", e?.status, e?.text || e);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.ContactPage {
  min-height: 100vh;
  padding-top: 120px;
  background: var(--background-color);
  font-family: "Kode Mono", monospace;
  color: var(--text-color);

  .container {
    width: min(700px, 85%);
    margin: auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 40px;
    color: var(--secondary-color);
    letter-spacing: 3px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 22px;
    border-radius: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 12px;
      letter-spacing: 1px;
      opacity: 0.85;
      text-transform: uppercase;
    }

    input,
    textarea {
      padding: 12px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
      color: var(--text-color);
      outline: none;

      &:focus {
        border-color: var(--secondary-color);
      }
    }
  }

  button {
    margin-top: 6px;
    padding: 14px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: #0c0c0e;
    cursor: pointer;
    transition: 0.25s ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  .success { color: #4caf50; }
  .error { color: #f44336; }
}
</style>
