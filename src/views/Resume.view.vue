<script setup lang="ts">
import BuilderComponent from '@/components/builder/Builder.component.vue';
import ViewerComponent from '@/components/viewer/Viewer.component.vue';
import { ref, onMounted, onUnmounted } from "vue"

const isDesktop = ref(false)

const handleResize = () => {
  if (innerWidth >= 1100) isDesktop.value = true
  else isDesktop.value = false
}

onMounted(() => {
  handleResize()
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})

</script>

<template>
  <div id="resume-view" :class="{ isDesktop }">
    <BuilderComponent class="resume-view__builder" />
    <ViewerComponent v-if="isDesktop" />
  </div>
</template>

<style scoped>
.isDesktop {
  display: grid;
  gap: 2px;
  grid-template-columns: auto auto;
}
</style>
