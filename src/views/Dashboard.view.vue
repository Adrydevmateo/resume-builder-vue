<script setup lang="ts">
import { addToStorage } from '@/utils/storage';
import { ESessionStorage } from '@/types'
import { ref } from 'vue';

type Resume = {
  id: string,
  preview: string,
  name: string
}

const resumes = ref<Array<Resume>>([
  {
    id: crypto.randomUUID(),
    preview: 'https://images.unsplash.com/photo-1721633617180-97c67428a48e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'first'
  },
  {
    id: crypto.randomUUID(),
    preview: 'https://images.unsplash.com/photo-1711238572486-5b07c4a900c5?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'second'
  }
])

const handlePickedResume = (id: string) => {
  addToStorage('session', ESessionStorage.CURRENT_RESUME_ID, id)
}
</script>

<template>
  <div id="dashboard-view">
    <div class="dashboard__controls">
      <button class="btn-create-resume">Create Resume</button>
    </div>
    <div class="resume-list" role="list">
      <div class="resume" role="listitem" v-for="resume, index in resumes" :key="index"
        @click="() => handlePickedResume(resume.id)">
        <img class="resume__preview" :src="resume.preview" alt="resume image">
        <strong class="resume__name">{{ resume.name }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resume-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.resume {
  flex-grow: 1;
  max-width: 200px;
  box-shadow: var(--box-shadow);
  height: 200px;
  display: grid;
  grid-template-rows: 1fr 40px;
  cursor: pointer;
}

.resume>* {
  pointer-events: none;
}

.resume__preview {
  height: 100%;
}

.resume__name {
  display: grid;
  place-content: center;
}

@media (hover:hover) {
  .resume {
    opacity: var(--opacity-primary);
    overflow: hidden;
  }

  .resume:hover {
    opacity: 1;
  }

  .resume,
  .resume__preview {
    transform: scaleX(1);
    transition: transform var(--transition-primary);
  }

  .resume:hover,
  .resume:hover .resume__preview {
    transform: scaleX(1.02);
  }
}
</style>
