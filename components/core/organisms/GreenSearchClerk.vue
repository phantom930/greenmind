<template>
  <div v-html="html" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  data: () => ({
    html: `<span class="clerk"
            data-template="@instant-search"
            data-instant-search="input"
            data-instant-search-suggestions="6"
            data-instant-search-categories="6"
            data-instant-search-pages="6"
            data-instant-search-positioning="right"
          ></span>`
  })
});
</script>
