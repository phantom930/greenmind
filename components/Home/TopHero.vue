<template>
  <SfHero
    class="top-hero"
    :class="$device.isMobile ? 'mt-8' : null"
  >
    <SfHeroItem
      :title="$t('Colorful summer dresses are already in store')"
      class="top-hero"
      :button-text="$t('See more')"
      :background="$device.isMobile ? '#668F72' : ''"
      :image="!$device.isMobile ? require('/assets/images/homeHero/homeHero_1.svg') : ''"
      style="background-size: contain; background-position-y: center;"
    >
      <template #call-to-action>
        <GreenButton
          v-if="!$device.isMobile"
          type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
        <SfImage
          v-else
          :src="require('/assets/images/homeHero/home_page_phones.svg')"
          alt="banner_1"
          :width="214"
          :height="223"
        />
      </template>
      <template #withImgTag>
        <SfImage
          :src="require('/assets/images/homeHero/home_page_phones.svg')"
          alt="banner_1"
          :width="214"
          :height="223"
        />
      </template>
    </SfHeroItem>

    <SfHeroItem
      :title="$t('Colorful summer dresses are already in store')"
      :button-text="$t('See more')"
      class="top-hero"
      :background="$device.isMobile ? '#668F72' : ''"
      :image="!$device.isMobile ? require('/assets/images/homeHero/homeHero_1.svg') : ''"
      style="background-size: contain; background-position-y: center"
    >
      <template #call-to-action>
        <GreenButton
          v-if="!$device.isMobile"
          type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
        <SfImage
          v-else
          :src="require('/assets/images/homeHero/home_page_phones.svg')"
          alt="banner_1"
          :width="214"
          :height="223"
        />
      </template>
    </SfHeroItem>

    <SfHeroItem
      :title="$t('Colorful summer dresses are already in store')"
      :button-text="$t('See more')"
      class="top-hero"
      :background="$device.isMobile ? '#668F72' : ''"
      :image="!$device.isMobile ? require('/assets/images/homeHero/homeHero_1.svg') : ''"
      style="background-size: contain; background-position-y: center"
    >
      <template #call-to-action>
        <GreenButton
          v-if="!$device.isMobile"
          type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
        <SfImage
          v-else
          :src="require('/assets/images/homeHero/home_page_phones.svg')"
          alt="banner_1"
          :width="214"
          :height="223"
        />
      </template>
    </SfHeroItem>
  </SfHero>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfHero, SfImage } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfHero, SfImage
  },
  setup() {

  }
});
</script>
