<template>
  <!-- <SfHero
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
          style-type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
      </template>
      <template #withImgTag>
        <SfImage
          v-if="$device.isMobile"
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
          style-type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
      </template>
      <template #withImgTag>
        <SfImage
          v-if="$device.isMobile"
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
          style-type="Tertiary"
          color="Grey"
        >
          {{ $t('See More') }}
        </GreenButton>
      </template>
      <template #withImgTag>
        <SfImage
          v-if="$device.isMobile"
          :src="require('/assets/images/homeHero/home_page_phones.svg')"
          alt="banner_1"
          :width="214"
          :height="223"
        />
      </template>
    </SfHeroItem>
  </SfHero> -->
  <SfHero
    class="top-hero mt-1.5"
  >
    <nuxt-link :to="{ name: 'how-to-sell' }" :title="$t('How do you sell?')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero2_1.webp')"
      />
    </nuxt-link>
    <nuxt-link :to="{ name: 'about-us' }" :title="$t('How to buy?')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero2_2.webp')"
      />
    </nuxt-link>
    <nuxt-link to="/" :title="$t('Return home')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero2_3.webp')"
      />
    </nuxt-link>
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
<style scoped lang="scss">
::v-deep .glide__slides, ::v-deep .glide__track{
  @include for-mobile {
    overflow: visible !important;
  }

}
::v-deep .sf-image--wrapper {
  bottom: 30px;
  left: 54%;
  position: absolute;
  & img{
    z-index: 10;
    position: relative;
    object-fit: contain;
  }
}
::v-deep .sf-hero__bullets {
  @include for-mobile {
    display: none;;
  }
}

@media (min-width: 768px), (max-width: 1024px){
    ::v-deep .top-hero-item {
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    max-width: 100%;
    max-height: 250px;
    height: auto;
    width: auto\9;
    margin-top: 1%;
    margin-bottom: 2%;
  }
}
@media (max-width: 768px) {
  ::v-deep .top-hero {
    max-width: 100%;
    max-height: 250px;
    height: auto;
    width: auto\9;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  ::v-deep .top-hero-item {
    background-position: center;
    background-size: contain;
    border-radius: 10px;
    max-width: 100%;
    max-height: 250px;
    height: auto;
    width: auto\9;
    margin-top: 1%;
    margin-bottom: 2%;
  }
}
@media (min-width: 1024px) {
  /*::v-deep .top-hero {
    max-width: 100%;
    max-height: 250px;
    height: auto;
    width: auto;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 1%;
  }*/
  ::v-deep .top-hero-item {
    object-fit: contain;
    background-position: center;
    border-radius: 10px;
    max-width: 100%;
    max-height: 250px;
    height: auto;
    margin-bottom: 3%;
  }
}

</style>
