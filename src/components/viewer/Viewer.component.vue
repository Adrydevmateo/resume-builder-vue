<script setup lang="ts">
import { useResumeStore } from '@/stores/resume.store';

const resumeStore = useResumeStore()

const introduction = resumeStore.introduction
</script>

<template>
  <div class="viewer">
    <!-- Introduction -->
    <div class="viewer__section">
      <div class="col-1">
        <strong class="username" v-if="introduction.name">
          {{ introduction.name }}
        </strong>
        <strong class="username" v-if="introduction.lastName">
          {{ introduction.lastName }}
        </strong>
        <strong class="user-title" v-if="introduction.title">{{ resumeStore.introduction.title }}</strong>
      </div>
      <div class="col-2">
        <a :href="introduction.website" target="_blank" v-if="resumeStore.introduction.website">
          <strong>Portfolio Website</strong>
        </a>
        <a :href="'mailto' + introduction.email" v-if="resumeStore.introduction.email">
          <strong>{{ introduction.email }}</strong>
        </a>
        <br>
        <a class="muted" :href="'tel:' + introduction.phone" v-if="resumeStore.introduction.phone">
          <strong>{{ introduction.phone }}</strong>
        </a>
        <strong class="muted" v-if="introduction.city">{{ resumeStore.introduction.city }}</strong>
        <strong class="muted" v-if="introduction.country">{{ resumeStore.introduction.country }}</strong>
      </div>
    </div>

    <!-- Skills -->
    <div class="viewer__section" v-if="resumeStore.skills">
      <div class="col-1">
        <strong>Skills</strong>
      </div>
      <div class="col-2" v-if="resumeStore.skills">
        <p>
          {{ resumeStore.skills }}
        </p>
      </div>
    </div>

    <!-- Experience -->
    <div class="viewer__section" v-if="resumeStore.experiences.length">
      <div class="col-1">
        <strong>Experience</strong>
      </div>
      <div class="col-2">
        <ol>
          <li v-for="experience, index in resumeStore.experiences" :key="index">
              <strong class="inline_block" v-if="experience.employer">{{ experience.employer }}</strong>
             <span class="inline_separator inline_block" v-if="experience.position">/</span> 
<span class="inline_block" v-if="experience.position">{{ experience.position }}</span>
            <p class="item-address" v-if="experience.address">{{ experience.address }}</p>
            <p v-if="experience.experience">
              {{ experience.experience }}
            </p>
          </li>
        </ol>
      </div>
    </div>

    <!-- Education -->
    <div class="viewer__section" v-if="resumeStore.educationList.length">
      <div class="col-1">
        <strong>Education</strong>
      </div>
      <div class="col-2">
        <ol>
          <li v-for="education, index in resumeStore.educationList" :key="index">
            <strong class="inline_block" v-if="education.institution">{{ education.institution }}</strong>
            <span class="inline_separator inline_block" v-if="education.education">/</span>
            <span class="inline_block" v-if="education.education">{{ education.education }}</span>
            <p class="item-address" v-if="education.location">{{ education.location }}</p>
          </li>
        </ol>
      </div>
    </div>

  </div>
</template>

<style scoped>
.muted {
  opacity: var(--opacity-primary);
}

.viewer {
  max-width: 800px;
  padding: 54px 40px 0;
  color: var(--ebony-clay);
  background-color: white;
  word-break: break-word;
  margin-inline: auto;
}

a {
  color: var(--ebony-clay);
}

strong {
  display: block;
}

p {
  margin: 0;
}

ol {
  list-style: none;
  padding: 0;
}

li:not(:last-child) {
  margin-bottom: 20px;
}

li>strong,
li>span {
  font-size: calc(var(--font-base) + 2px);
}

li strong {
  display: initial;
}

.item-address {
  opacity: var(--opacity-secondary);
  font-size: calc(var(--font-base) - 2px);
  margin-bottom: 8px;
}

.viewer__section {
  display: grid;
  padding-bottom: 20px;
}

.col-1 {
  position: relative;
  padding-top: 20px;
}

.col-1::before {
  position: absolute;
  content: '';
  top: 0;
  width: 20px;
  height: 5px;
  background: var(--ebony-clay);
}

.col-2 {
  padding-top: 20px;
  border-top: 5px solid var(--ebony-clay);
}

.username {
  font-size: var(--font-big);
  line-height: 30px;
  margin-bottom: 4px;
}

.user-title {
  font-size: calc(var(--font-base) + 2px);
  color: var(--reddish-orange);
}

@media (min-width: 640px) {
  .viewer__section {
    gap: 30px;
    grid-template-columns: 220px 1fr;
  }
}

@media (max-width: 900px) {
  .viewer {
    font-size: var(--font-small);
  }
}
</style>
