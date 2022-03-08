<template>
  <div class="description-wrap">
    <div class="title-main">
      Meget flot
    </div>
    <p class="description-main">
      Screen: May have micro-scratches which are not noticeable when<br>
      the screen is turned on. Body: Has visible scratches and/or dents
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup() {

  }
});
</script>
