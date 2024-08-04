<script setup lang="ts">
import { onMounted } from 'vue';
import CollapseComponent from '../collapsible/Collapse.component.vue';
import { useResumeStore } from '@/stores/resume.store';

const resumeStore = useResumeStore()

const handleSubmit = (e: Event) => {
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

onMounted(() => {
  setTimeout(() => {
    const listOfTextareas = document.querySelectorAll("textarea")
    for (const textarea of listOfTextareas) {
      if (textarea.value) resizeTextArea(textarea)
    }
  }, 500)
})

</script>

<template>
  <div class="builder">
    <!-- Introduction -->
    <CollapseComponent :id="1" title="Introduction" description="This is the introduction form">
      <form @submit.prevent="handleSubmit">
        <input type="text" name="_honey" style="display: none;">
        <div class="form__content">
          <input type="text" name="name" id="name" placeholder="Name" minlength="3" autocomplete="off"
            v-model="resumeStore.introduction.name" required>
          <input type="text" name="title" id="title" placeholder="Title - Ex: Software Developer" autocomplete="off"
            v-model="resumeStore.introduction.title" required>
          <input type="email" name="email" id="email" placeholder="Email" autocomplete="off"
            v-model="resumeStore.introduction.email" required>
          <input type="tel" name="phone" id="phone" placeholder="Phone number" autocomplete="off"
            v-model="resumeStore.introduction.phone">
          <input type="text" name="address" id="address" placeholder="city, state or province" autocomplete="off"
            v-model="resumeStore.introduction.address">
          <input type="text" name="country" id="country" placeholder="Country" autocomplete="off"
            v-model="resumeStore.introduction.country">
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
      <form @submit.prevent="handleSubmit">
        <input type="text" name="_honey" style="display: none;">
        <div class="form__content">
          <textarea name="skills" id="skills" placeholder="I possess a comprehensive skill-set in ..." minlength="3"
            v-model="resumeStore.skills"
            @input="({ target }) => resizeTextArea(target as HTMLTextAreaElement)"></textarea>
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
      <div class="list-of-forms">
        <form class="experience-form" v-for="experience, index in resumeStore.experiences" :key="index"
          @submit.prevent="handleSubmit">
          <input type="text" name="_honey" style="display: none;">
          <input type="text" name="id" :value="experience.id" hidden>
          <div class="form__content">
            <input type="text" name="employer" placeholder="Employer" autocomplete="off" v-model="experience.employer"
              required>
            <input type="text" name="position" placeholder="Position" autocomplete="off" v-model="experience.position"
              required>
            <input type="date" name="startDate" v-model="experience.startDate">
            <input type="date" name="endDate" v-model="experience.endDate">
            <input type="text" name="address" placeholder="Address" autocomplete="off" v-model="experience.address">
            <textarea name="experience" id="experience" placeholder="My experience .." minlength="3"
              v-model="experience.experience"
              @input="({ target }) => resizeTextArea(target as HTMLTextAreaElement)"></textarea>
          </div>
          <br>
          <div class="btn-wrapper">
            <button class="btn-delete" type="button"
              @click="() => resumeStore.deleteExperience(experience.id)">Delete</button>
            <button class="btn-save" type="submit">Save</button>
          </div>
        </form>

        <br>

        <button class="btn-add" @click="resumeStore.addExperience">+</button>
      </div>
    </CollapseComponent>

    <br>

    <!-- Education -->
    <CollapseComponent :id="4" title="Education" description="Show your achievements!">
      <div class="list-of-forms">
        <form v-for="education, index in resumeStore.educationList" :key="index" @submit.prevent="handleSubmit">
          <input type="text" name="_honey" style="display: none;">
          <input type="text" name="id" :value="education.id" hidden>
          <div class="form__content">
            <input type="text" name="institution" placeholder="Institution" autocomplete="off"
              v-model="education.institution" required>
            <input type="text" name="education" placeholder="Education" autocomplete="off" v-model="education.education"
              required>
            <input type="text" name="location" placeholder="Location" autocomplete="off" v-model="education.location">
          </div>
          <br>
          <div class="btn-wrapper">
            <button class="btn-delete" type="button"
              @click="() => resumeStore.deleteEducation(education.id)">Delete</button>
            <button class="btn-save" type="submit">Save</button>
          </div>
        </form>

        <br>

        <button class="btn-add" @click="resumeStore.addEducation">+</button>
      </div>
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
