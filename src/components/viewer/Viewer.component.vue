<script setup lang="ts">
import { useResumeStore } from '@/stores/resume.store';

const resumeStore = useResumeStore()
</script>

<template>
  <div class="viewer">
    <!-- Introduction -->
    <div class="viewer__section">
      <div class="col-1">
        <strong class="username">
          {{ resumeStore.introduction.name }}
        </strong>
        <strong class="username">
          {{ resumeStore.introduction.lastName }}
        </strong>
        <strong class="user-title">{{ resumeStore.introduction.title }}</strong>
      </div>
      <div class="col-2">
        <a :href="resumeStore.introduction.website" target="_blank">
          <strong>Portfolio Website</strong>
        </a>
        <a :href="'mailto' + resumeStore.introduction.email">
          <strong>{{ resumeStore.introduction.email }}</strong>
        </a>
        <br>
        <a class="muted" :href="'tel:' + resumeStore.introduction.phone">
          <strong>{{ resumeStore.introduction.phone }}</strong>
        </a>
        <strong class="muted">{{ resumeStore.introduction.city }}</strong>
        <strong class="muted">{{ resumeStore.introduction.country }}</strong>
      </div>
    </div>

    <!-- Skills -->
    <div class="viewer__section">
      <div class="col-1">
        <strong>Skills</strong>
      </div>
      <div class="col-2">
        <p>
          {{ resumeStore.skills }}
        </p>
      </div>
    </div>

    <!-- Experience -->
    <div class="viewer__section">
      <div class="col-1">
        <strong>Experience</strong>
      </div>
      <div class="col-2">
        <ol>
          <li v-for="experience, index in resumeStore.experiences" :key="index">
            <strong>{{ experience.employer }}</strong> / <span>{{ experience.position }}</span>
            <p class="item-address">{{ experience.address }}</p>
            <p>
              {{ experience.experience }}
            </p>
          </li>
        </ol>
      </div>
    </div>

    <!-- Education -->
    <div class="viewer__section">
      <div class="col-1">
        <strong>Education</strong>
      </div>
      <div class="col-2">
        <ol>
          <li v-for="education, index in resumeStore.educationList" :key="index">
            <strong>{{ education.institution }}</strong> / <span>{{ education.education }}</span>
            <p class="item-address">{{ education.location }}</p>
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
