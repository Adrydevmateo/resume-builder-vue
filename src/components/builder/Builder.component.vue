<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CollapseComponent from '../collapsible/Collapse.component.vue';

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
  const listOfTextareas = document.querySelectorAll("textarea")
  for (const textarea of listOfTextareas) {
    if (textarea.value) resizeTextArea(textarea)
  }
})

type Experience = {
  id: string,
  userId: string,
  employer: string,
  position: string,
  startDate: string,
  endDate: string,
  address: string,
  experience: string
}

const experiences = ref<Array<Experience>>([
  {
    id: crypto.randomUUID(),
    userId: "adrydev",
    employer: "Google",
    position: "Software Developer",
    startDate: "",
    endDate: "",
    address: "Santo Domingo Este, Santo Domingo, Dominican Republic",
    experience: "Develop and maintain responsive user interfaces for various web applications using HTML, CSS, and JavaScript, including frameworks and libraries like Vue.js, Bootstrap, 11ty, and Element Plus.Improve website performance, resulting in faster load times and a smoother user experience. I achieve this by utilizing tools like image converters, page speed analyzers, and code minifiers.Implement accessibility best practices to ensure a positive user experience for all visitors."
  }
])

const addExperience = () => {
  experiences.value.push({
    id: crypto.randomUUID(),
    userId: "adrydev",
    employer: "",
    position: "",
    startDate: "",
    endDate: "",
    address: "",
    experience: ""
  });
}

const deleteExperience = (id: string) => {
  const experience = experiences.value.find(find => find.id === id)
  if (!experience) return
  const index = experiences.value.indexOf(experience)
  experiences.value.splice(index, 1)
}

type Education = {
  id: string,
  userId: string,
  institution: string,
  education: string,
  location: string
}

const educationList = ref<Array<Education>>([
  {
    id: crypto.randomUUID(),
    userId: "adrydev",
    institution: "Google",
    education: "UI/UX Designer",
    location: "Coursera"
  }
])

const addEducation = () => {
  educationList.value.push({
    id: crypto.randomUUID(),
    userId: "adrydev",
    institution: "",
    education: "",
    location: ""
  });
}

const deleteEducation = (id: string) => {
  const education = educationList.value.find(find => find.id === id)
  if (!education) return
  const index = educationList.value.indexOf(education)
  educationList.value.splice(index, 1)
}

</script>

<template>
  <div class="builder">
    <!-- Introduction -->
    <CollapseComponent :id="1" title="Introduction" description="This is the introduction form">
      <form @submit.prevent="handleSubmit">
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
      <form @submit.prevent="handleSubmit">
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
      <div class="list-of-forms">
        <form class="experience-form" v-for="experience, index in experiences" :key="index"
          @submit.prevent="handleSubmit">
          <input type="text" name="_honey" style="display: none;">
          <input type="text" name="id" :value="experience.id" hidden>
          <input type="text" name="userId" :value="experience.userId" hidden>
          <div class="form__content">
            <input type="text" name="employer" placeholder="Employer" autocomplete="off" :value="experience.employer"
              required>
            <input type="text" name="position" placeholder="Position" autocomplete="off" :value="experience.position"
              required>
            <input type="date" name="startDate" :value="experience.startDate">
            <input type="date" name="endDate" :value="experience.endDate">
            <input type="text" name="address" placeholder="Address" autocomplete="off" :value="experience.address">
            <textarea name="experience" id="experience" placeholder="My experience .." minlength="3"
              :value="experience.experience"
              @input="({ target }) => resizeTextArea(target as HTMLTextAreaElement)"></textarea>
          </div>
          <br>
          <div class="btn-wrapper">
            <button class="btn-delete" type="button" @click="() => deleteExperience(experience.id)">Delete</button>
            <button class="btn-save" type="submit">Save</button>
          </div>
        </form>

        <br>

        <button class="btn-add" @click="addExperience">+</button>
      </div>
    </CollapseComponent>

    <br>

    <!-- Education -->
    <CollapseComponent :id="4" title="Education" description="Show your achievements!">
      <div class="list-of-forms">
        <form v-for="education, index in educationList" :key="index" @submit.prevent="handleSubmit">
          <input type="text" name="_honey" style="display: none;">
          <input type="text" name="id" :value="education.id" hidden>
          <input type="text" name="userId" :value="education.userId" hidden>
          <div class="form__content">
            <input type="text" name="institution" placeholder="Institution" autocomplete="off"
              :value="education.institution" required>
            <input type="text" name="education" placeholder="Education" autocomplete="off" :value="education.education"
              required>
            <input type="text" name="location" placeholder="Location" autocomplete="off" :value="education.location">
          </div>
          <br>
          <div class="btn-wrapper">
            <button class="btn-delete" type="button" @click="() => deleteEducation(education.id)">Delete</button>
            <button class="btn-save" type="submit">Save</button>
          </div>
        </form>

        <br>

        <button class="btn-add" @click="addEducation">+</button>
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
