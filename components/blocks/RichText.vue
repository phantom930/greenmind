<template>
  <div v-html="richtext" />
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'RichText',
  props: {
    text: {
      type: Object,
      default: null
    }
  },
  computed: {
    richtext() {
      return this.$storyapi.richTextResolver.render(this.text);
    }
  }

});
</script>

