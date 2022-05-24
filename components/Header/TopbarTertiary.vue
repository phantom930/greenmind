<template>
  <SfHeader>
    <template #navigation>
      <div class="header-links" @mouseleave="close">
        <div class="dropdown-wrap" @mouseover="open('iphones')">
          <nuxt-link to="/telefoner/iphones" class="custom-link">
            IPHONES
          </nuxt-link>
          <div class="dropdown iphones" />
        </div>
        <div class="dropdown-wrap" @mouseover="open('smartphones')">
          <nuxt-link to="/telefoner/smartphones" class="custom-link">
            SMARTPHONES
          </nuxt-link>
          <!-- <div class="dropdown smartphones">
        <SfMegaMenu title="Smartphones" visible />
      </div> -->
        </div>
        <div class="dropdown-wrap" @mouseover="open('tablets')">
          <nuxt-link to="/tablets" class="custom-link">
            TABLETS
          </nuxt-link>
          <div class="dropdown tablets">
            <!-- <SfMegaMenu
          title="Tablets"
          visible
        /> -->
          </div>
        </div>
        <div
          class="dropdown-wrap"
          @mouseover="open('computers')"
        >
          <nuxt-link
            to="/computere"
            class="custom-link"
          >
            {{ $t("COMPUTERS") }}
          </nuxt-link>
          <!-- <div class="dropdown computers">
        <SfMegaMenu title="Computers" visible />
      </div> -->
        </div>
        <div class="dropdown-wrap" @mouseover="open('other')">
          <nuxt-link to="/" class="custom-link">
            {{ $t("Other Products") }}
          </nuxt-link>
          <!-- <div class="dropdown other-products">
        <SfMegaMenu title="Other Products" visible />
      </div> -->
        </div>
        <div class="dropdown-wrap" @mouseover="open('accessories')">
          <nuxt-link to="/tilbehoer" class="custom-link">
            {{ $t("Accessories") }}
          </nuxt-link>
          <!-- <div class="dropdown accessories">
        <SfMegaMenu title="Accessories" visible />
      </div> -->
        </div>
        <HeaderMegaMenu
          :is-visible="isVisible"
          :current-opened="currentOpened"
          :is-absolute="true"
        />
      </div>
    </template>
  </SfHeader>
</template>

<script lang="ts">
import { SfHeader } from '@storefront-ui/vue';
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
    SfHeader
  },
  setup() {
    const isVisible = ref(false);
    const currentOpened = ref('');

    const open = (value) => {
      currentOpened.value = value;
      isVisible.value = true;
    };

    const close = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      open,
      close,
      currentOpened
    };
  }
});
</script>

<style scoped lang="scss">
@import url("~/assets/css/TopbarTertiary.scss");

</style>
