<template>
  <div>
    <component
      :is="component.component"
      v-for="(component, index) in content"
      :key="index"
      :data="component"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RenderContent',
  props: {
    content: {
      type: Array
    }
  }
});
</script>
