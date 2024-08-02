<script setup lang="ts">
import CollapseComponent from '../collapsible/Collapse.component.vue';


const handleSubmit = () => {
  console.log('Submit')
}
</script>

<template>
  <div class="builder">
    <CollapseComponent title="Introduction" description="This is the introduction form">
      <form @submit.prevent="handleSubmit">
        <div class="form__content">
          <input class="field" type="text" name="name" id="name" placeholder="Name" required minlength="3">
          <input class="field" type="text" name="title" id="title" placeholder="Title - Ex: Software Developer"
            required>
          <input class="field" type="email" name="email" id="email" placeholder="Email" autocomplete="off" required>
          <input class="field" type="tel" name="phone" id="phone" placeholder="Phone number">
          <input class="field" type="text" name="address" id="address" placeholder="city, state or province">
          <input class="field" type="text" name="country" id="country" placeholder="Country">
        </div>
        <button class="btn-save" type="submit">Save</button>
      </form>
    </CollapseComponent>
  </div>
</template>

<style scoped>
.builder {}

form {
  background: tomato;
}

.form__content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form__content>* {
  flex-grow: 1;
}

.field {
  border: none;
  outline: none;
  padding-inline: 16px;
  background-color: var(--color-primary);
  box-shadow: var(--box-shadow);
  min-width: 0;
  height: 40px;
  word-break: break-all;
}

.btn-save {
  border: none;
}
</style>
