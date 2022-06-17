<template>
  <div class="sf-gallery">
    <div class="sf-gallery__stage">
      <div ref="glide" class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li
              v-for="(picture, index) in images"
              :key="'slide-' + index"
              class="glide__slide"
              @mouseover="startZoom(picture)"
              @mousemove="moveZoom($event, index)"
              @mouseout="removeZoom(index)"
            >
              <slot
                name="big-image"
                v-bind="{
                  enableZoom,
                  picture,
                  index,
                  imageWidth,
                  imageHeight,
                  imageTag,
                  nuxtImgConfig,
                }"
              >
                <SfImage
                  ref="sfGalleryBigImage"
                  class="sf-gallery__big-image"
                  :class="{ 'sf-gallery__big-image--has-zoom': enableZoom }"
                  :src="picture.desktop.url"
                  :alt="picture.alt"
                  :placeholder="picture.placeholder"
                  :width="imageWidth"
                  :height="imageHeight"
                  :image-tag="imageTag"
                  :nuxt-img-config="nuxtImgConfig"
                  @click="$emit('click:stage', { picture, index })"
                />
              </slot>
            </li>
          </ul>
        </div>
        <div
          v-if="bullets"
          class="glide__bullets"
          data-glide-el="controls[nav]"
        >
          <button
            v-for="(picture, index) in images"
            :key="index"
            class="glide__bullet"
            :data-glide-dir="`=${index}`"
          />
        </div>
      </div>
      <transition name="sf-fade">
        <div
          ref="outSide"
          :class="{
            'display-none':
              !outsideZoom || !isZoomStarted || (!outsideZoom && !enableZoom),
          }"
          :style="{ width: `${imageWidth}px`, height: `${imageHeight}px` }"
        >
          <slot
            name="outside-zoom"
            v-bind="{
              definedPicture,
              imageWidth,
              imageHeight,
              imageTag,
              nuxtImgConfig,
            }"
          >
            <SfImage
              ref="imgZoom"
              class="sf-gallery__zoom"
              :src="definedPicture.url"
              :width="imageWidth"
              :height="imageHeight"
              :lazy="false"
              :alt="definedPicture.alt"
              :placeholder="definedPicture.placeholder"
              :image-tag="imageTag"
              :nuxt-img-config="nuxtImgConfig"
            />
          </slot>
        </div>
      </transition>
    </div>
    <div class="sf-gallery__thumbs">
      <slot name="thumbs" v-bind="{ images, active: activeIndex, go }">
        <SfButton
          v-for="(image, index) in images"
          :key="'img-' + index"
          class="sf-button--pure sf-gallery__item"
          :class="{ 'sf-gallery__item--selected': index === activeIndex }"
          :aria-label="'Image ' + index"
          @click="go(index)"
        >
          <SfImage
            class="sf-gallery__thumb"
            :src="image.mobile.url"
            :alt="image.alt"
            :placeholder="image.placeholder"
            :width="thumbWidth"
            :height="thumbHeight"
            :image-tag="thumbImageTag"
            :nuxt-img-config="thumbNuxtImgConfig"
          />
        </SfButton>
      </slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api';
import { SfGallery } from '@storefront-ui/vue';
import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';

export default defineComponent({
  extends: SfGallery,
  props: {
    bullets: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      // handle slider with swipe and transitions with Glide.js
      // https://glidejs.com/docs/
      if (this.images.length < 1) return;
      const glide = new Glide(this.$refs.glide, this.updatedSliderOptions);
      glide.on('run', () => {
        this.go(glide.index);
      });
      glide.mount({ Controls });
      this.glide = glide;
    });
  }

});
</script>
<style lang="scss">
@import "~@storefront-ui/shared/styles/components/molecules/SfGallery.scss";
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";
.glide__bullets {
    text-align: center;
}
.glide__bullet{
    background-color: var(--_c-greenmind-primary-grey);
    border: 3px solid var(--_c-greenmind-primary-grey);
    width: 8px;    height: 8px;
    &:hover {
        border: 3px solid var(--_c-greenmind-fern-secondary-medium-green) !important;
        background-color: var(--_c-greenmind-fern-secondary-medium-green) !important;;
        box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.6);

    }
}
.glide__bullet--active{
    background-color: var(--_c-greenmind-fern-secondary-medium-green) !important;
    box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.6);
    border: none;
}

</style>
