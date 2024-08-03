<script setup lang="ts">
import CollapseComponent from '../collapsible/Collapse.component.vue';


const submitIntroduction = (e: Event) => {
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const honey = formData.get('_honey')

  if (honey) throw new Error('Bot detected!')

  let collectedData: any = {}

  for (const field of formData) {
    collectedData[field[0]] = field[1]
  }

  console.log(collectedData)

}

const resizeTextArea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}
</script>

<template>
  <div class="builder">
    <!-- Introduction -->
    <CollapseComponent :id="1" title="Introduction" description="This is the introduction form">
      <form @submit.prevent="submitIntroduction">
        <input type="text" name="_honey" style="display: none;">
        <div class="form__content">
          <input type="text" name="name" id="name" placeholder="Name" minlength="3" autocomplete="off" required>
          <input type="text" name="title" id="title" placeholder="Title - Ex: Software Developer" autocomplete="off"
            required>
          <input type="email" name="email" id="email" placeholder="Email" autocomplete="off" required>
          <input type="tel" name="phone" id="phone" placeholder="Phone number" autocomplete="off">
          <input type="text" name="address" id="address" placeholder="city, state or province" autocomplete="off">
          <input type="text" name="country" id="country" placeholder="Country" autocomplete="off">
        </div>
        <br>
        <div class="btn-wrapper">
          <button class="btn-save" type="submit">Save</button>
        </div>
      </form>
    </CollapseComponent>

    <br>

    <!-- Skills -->
    <CollapseComponent :id="2" title="Skills" description="Write about your skills">
      <form @submit.prevent="submitIntroduction">
        <input type="text" name="_honey" style="display: none;">
        <div class="form__content">
          <textarea name="skills" id="skills" placeholder="I possess a comprehensive skill-set in ..."
            @input="({ target }) => resizeTextArea(target as HTMLTextAreaElement)" minlength="3"></textarea>
        </div>
        <br>
        <div class="btn-wrapper">
          <button class="btn-save" type="submit">Save</button>
        </div>
      </form>
    </CollapseComponent>

    <br>

    <!-- Experience -->
    <CollapseComponent :id="3" title="Experience" description="Add your experiences!">
      <form class="experience-form" @submit.prevent="submitIntroduction">
        <input type="text" name="_honey" style="display: none;">
        <div class="form__content">
          <input type="text" name="employer" placeholder="Employer" autocomplete="off" required>
          <input type="text" name="position" placeholder="Position" autocomplete="off" required>
          <input type="date" name="startDate">
          <input type="date" name="endDate">
          <input type="text" name="address" placeholder="Address" autocomplete="off">
          <textarea name="skills" id="skills" placeholder="My experience .."
            @input="({ target }) => resizeTextArea(target as HTMLTextAreaElement)" minlength="3"></textarea>
        </div>
        <br>
        <div class="btn-wrapper">
          <button class="btn-save" type="submit">Save</button>
        </div>
      </form>
    </CollapseComponent>
  </div>
</template>

<style scoped>
.experience-form .form__content textarea {
  width: 100%;
}

.form__content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form__content>* {
  flex-grow: 1;
}

input,
textarea {
  border: none;
  outline: none;
  padding-inline: 16px;
  background-color: var(--color-primary);
  box-shadow: var(--box-shadow);
  min-width: 0;
  height: 40px;
  word-break: break-all;
}

textarea {
  resize: none;
  padding-top: 10px;
  padding-bottom: 0;
}

.btn-wrapper {
  display: flex;
  justify-content: end;
}

.btn-save {
  border: none;
}
</style>
