<script setup lang="ts">
const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const honey = formData.get('_honey')

  if (honey) throw new Error('Bot detected!')

  const email = formData.get('email')
  const message = formData.get('message')

  form.reset()

}
</script>

<template>
  <form class="contact-form" netlify @submit.prevent="handleSubmit">
    <div class="contact-form__content">
      <input type="text" name="_honey" style="display:none">
      <input class="form__field" type="email" name="email" placeholder="Email" autocomplete="off">
      <input class="form__field" type="password" name="password" placeholder="Password" autocomplete="off">
    </div>
    <div class="action__wrapper">
      <RouterLink class="form__link" to="/">Sign up</RouterLink>
      <button class="submit__btn" type="submit">Sign in</button>
    </div>
  </form>
</template>

<style scoped>
.contact-form {
  max-width: 330px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: var(--box-shadow);
}

.contact-form__content {
  display: grid;
  gap: 10px;
}

.form__field,
.form__field::placeholder {
  font-weight: var(--font-weight-extra-bold);
  color: var(--color-secondary-muted);
  transition: color var(--transition-primary);
}

.form__field:focus,
.form__field:focus::placeholder {
  color: var(--color-secondary);
}

.form__field {
  border: none;
  outline: none;
  padding-inline: 16px;
  background-color: var(--color-primary);
  box-shadow: var(--box-shadow);
  min-width: 0;
}

.form__field {
  height: 40px;
}

.action__wrapper {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 14px;
}

.submit__btn {
  background-color: var(--color-accent);
  padding: 10px 20px;
  place-self: end;
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
}

.form__link {
  font-size: var(--font-small);
  opacity: var(--opacity-primary);
}

@media (hover:hover) {

  .form__field:hover,
  .form__field:hover::placeholder,
  .form__link:hover {
    color: var(--color-secondary);
  }

  .form__link {
    position: relative;
  }

  .form__link::before {
    position: absolute;
    content: '';
    background: var(--color-accent);
    left: 0;
    bottom: -8px;
    width: 0%;
    height: 2px;
    transition: width var(--transition-primary);
  }

  .form__link:hover::before {
    width: 100%;
  }

  .submit__btn {
    opacity: var(--opacity-primary);
    transition: opacity var(--transition-primary);
  }

  .submit__btn:hover {
    opacity: 1;
  }
}
</style>
