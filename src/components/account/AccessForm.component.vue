<script setup lang="ts">
const { userAction } = defineProps<{
  userAction: 'sign-in' | 'sign-up'
}>();

defineEmits(['userActionChanged']);

const handleSubmit = async (e: Event) => {
  const form = e.target as HTMLFormElement

  setWaiting(form, 'start')

  const formData = new FormData(form)
  const honey = formData.get('_honey')

  if (honey) throw new Error('Bot detected!')

  const username = form.querySelector('#username') as HTMLInputElement
  const email = form.querySelector('#email') as HTMLInputElement
  const password = form.querySelector('#password') as HTMLInputElement

  const result = userAction === 'sign-in' ? await signIn(email.value, password.value) : await signUp(username.value, email.value, password.value)

  if (!result.success && result.msg) {
    if (result.msg.toLowerCase().includes('username')) setInvalidField(username)
    if (result.msg.toLowerCase().includes('email')) setInvalidField(email)
    if (result.msg.toLowerCase().includes('password')) setInvalidField(password)
  }

  if (result.success) form.reset()

  setWaiting(form, 'stop')
}

const setInvalidField = (field: HTMLInputElement) => {
  if (!field.value) field.classList.add('invalid')
  else field.classList.remove('invalid')
}

const setWaiting = (form: HTMLFormElement, action: 'start' | 'stop') => {
  if (action === 'start') form.classList.add('waiting')
  else form.classList.remove('waiting')
}

type UserActionResult = {
  success: boolean,
  data?: any
  status?: number,
  msg?: string
}

const signIn = async (email: string, password: string): Promise<UserActionResult> => {
  if (!email) return { success: false, msg: 'Email was not provided' }
  if (!password) return { success: false, msg: 'Password was not provided' }

  try {
    const url = import.meta.env.VITE_SIGN_IN_URL

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!res.ok) return { success: false, status: res.status }

    const data = await res.json()

    return { success: true, data }

  } catch (error: any) {
    throw new Error(error)
  }
}

const signUp = async (username: string, email: string, password: string): Promise<UserActionResult> => {
  if (!username) return { success: false, msg: 'Username was not provided' }
  if (!email) return { success: false, msg: 'Email was not provided' }
  if (!password) return { success: false, msg: 'Password was not provided' }

  try {
    const url = import.meta.env.VITE_SIGN_UP_URL

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    if (!res.ok) return { success: false, status: res.status }

    const data = await res.json()

    return { success: true, data }

  } catch (error: any) {
    throw new Error(error)
  }
}

</script>

<template>
  <form class="contact-form" netlify @submit.prevent="handleSubmit">
    <div class="contact-form__content">
      <input type="text" name="_honey" style="display:none">
      <input class="form__field" type="text" name="username" id="username" placeholder="Username" autocomplete="off"
        v-if="userAction === 'sign-up'" @input="(e) => setInvalidField(e.target as HTMLInputElement)">
      <input class="form__field" type="email" name="email" id="email" placeholder="Email" autocomplete="off"
        @input="(e) => setInvalidField(e.target as HTMLInputElement)">
      <input class="form__field" type="password" name="password" id="password" placeholder="Password" autocomplete="off"
        @input="(e) => setInvalidField(e.target as HTMLInputElement)">
    </div>
    <div class="action__wrapper">
      <button class="form__link" type="button"
        @click="$emit('userActionChanged', userAction === 'sign-in' ? 'sign-up' : 'sign-in')">
        {{ userAction === 'sign-in' ? 'Sign up' : 'Sign in' }}
      </button>
      <button class="submit__btn" type="submit">
        <span>
          {{ userAction === 'sign-in' ? 'Sign in' : 'Sign up' }}
        </span>
        <svg class="loading-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <circle cx="4" cy="12" r="3" fill="currentColor">
            <animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity"
              begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2" />
          </circle>
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
            <animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s"
              values="1;.2" />
          </circle>
          <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
            <animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity"
              begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;.2" />
          </circle>
        </svg>
      </button>
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

.form__field {
  border: none;
  outline: none;
  padding-inline: 16px;
  background-color: var(--color-primary);
  box-shadow: var(--box-shadow);
  min-width: 0;
  height: 40px;
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

.form__field.invalid {
  background: red;
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

.loading-icon {
  width: 0;
  height: 0;
}

.contact-form.waiting .submit__btn {
  pointer-events: none;
  opacity: 1;
}

.contact-form.waiting .submit__btn span {
  display: none;
}

.contact-form.waiting .loading-icon {
  width: initial;
  height: initial;
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
