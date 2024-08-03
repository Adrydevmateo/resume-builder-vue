<script setup lang="ts">
const { id } = defineProps<{
  id: number,
  title: string,
  description: string
}>()

const componentId = "collapse-component-" + id

const collapse = () => {
  const collapseComponent = document.getElementById(componentId) as HTMLElement
  collapseComponent?.classList.toggle('active')
}
</script>

<template>
  <div :id="componentId" class="collapse-component">
    <div class="head collapse-component__head" @click="collapse">
      <div class="head__content">
        <p class="title">{{ title }}</p>
        <p class="description">{{ description }}</p>
      </div>
      <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24">
        <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z" />
      </svg>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.collapse-component {
  box-shadow: var(--box-shadow);
}

.head {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.head__content>* {
  padding: 0;
  margin: 0;
}

.title {
  font-size: calc(var(--font-base) + 2px);
  font-weight: var(--font-weight-bold);
}

.description {
  font-size: var(--font-small);
  font-weight: var(--font-weight-semi-bold);
}

.head__content>*:first-child {
  margin-bottom: 4px;
}

.icon-arrow {
  transition: rotate var(--transition-primary);
}

.active .icon-arrow {
  rotate: 180deg;
}

.body {
  opacity: 0;
  pointer-events: none;
  height: 0;
  transition: height var(--transition-primary), opacity var(--transition-primary);
}

.active .body {
  pointer-events: initial;
  opacity: 1;
  height: auto;
  padding: 10px;
}


@media (hover:hover) {
  .collapse-component {
    opacity: var(--opacity-primary);
    transition: opacity var(--transition-primary);
  }

  .collapse-component:hover {
    opacity: 1;
  }
}
</style>
