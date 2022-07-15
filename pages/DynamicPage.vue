<template>
  <div v-if="loading">
    Loading content...
  </div>
  <div v-else-if="content">
    <component :is="content.component" :data="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useContent } from '@vue-storefront/storyblok';
import { useGetLocale } from '~/composables';
import TextPage from './TextPage.vue';

export default defineComponent({
  name: 'DynamicPage',
  components: {
    TextPage
  },
  transition: 'fade',
  setup(_props, { root }) {
    const { path } = useRoute().value;
    const { search, content, loading, error } = useContent(path);
    const { getLocale } = useGetLocale();

    // get data
    onSSR(async () => {
      await search({ url: `/${path}`, locale: getLocale() }).then(() => {
        if (content.value && !content.value._uid) {
          root.$nuxt.error({ statusCode: 404, message: '' });
        }
      });

    });
    // return data
    return {
      content,
      loading,
      error
    };
  }
});
</script>
