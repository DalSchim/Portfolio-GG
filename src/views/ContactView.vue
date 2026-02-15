<template>
  <form ref="form" @submit.prevent="sendEmail">

    <label>Nom</label>
    <input type="text" name="name" required>

    <label>Email</label>
    <input type="email" name="email" required>

    <label>Sujet</label>
    <input type="text" name="title" required>

    <label>Message</label>
    <textarea name="message" required></textarea>

    <!-- time pour {{time}} -->
    <input type="hidden" name="time" :value="new Date().toLocaleString()" />

    <input type="submit" value="Envoyer">
  </form>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  methods: {
    sendEmail() {
      emailjs
          .sendForm(
              'service_xxxxx',      // 🔥 TON SERVICE ID
              'template_xxxxx',     // 🔥 TON TEMPLATE ID
              this.$refs.form,
              {
                publicKey: 'public_xxxxx', // 🔥 TA PUBLIC KEY
              }
          )
          .then(
              () => {
                alert('Message envoyé ✅');
                this.$refs.form.reset();
              },
              (error) => {
                console.log('FAILED...', error);
                alert('Erreur ❌');
              },
          );
    },
  },
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: auto;

  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  background-color: #f9f9f9;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      border-color: #007BFF;
      outline: none;
    }

    textarea {
      resize: vertical;
    }

  }
}

</style>
