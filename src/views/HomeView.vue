<script setup lang="ts">
import AccessFormComponent from '@/components/account/AccessForm.component.vue';
import { ref } from 'vue';

type UserAction = 'sign-in' | 'sign-up'

const userAction = ref<UserAction>('sign-in')

const handleUserActionChanged = (action: UserAction) => userAction.value = action

</script>

<template>
  <main>
    <h1>Home</h1>
    <AccessFormComponent :user-action="userAction" @user-action-changed="(action) => handleUserActionChanged(action)" />
  </main>
</template>
