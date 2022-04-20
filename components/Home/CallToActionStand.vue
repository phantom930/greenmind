<template>
  <SfCallToAction
    :title="title"
    :description="description"
    :background="background"
  >
    <template #button>
      <GreenButton
        class="sf-button-call-to-action"
        type="Primary"
        color="Green"
        shape="Round"
      >
        {{ $t('See More') }}
      </GreenButton>
      <SfImage
        v-if="image"
        :width="363"
        :height="358"
        :src="image"
        alt="image_01"
      />
    </template>
  </SfCallToAction>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfCallToAction, SfImage } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfCallToAction, SfImage
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ' '
    },
    description: {
      type: String,
      default: ' '
    },
    background: {
      type: String,
      default: ''
    }
  }
});
</script>
<style scoped lang="scss">
::v-deep .sf-call-to-action__text-container{
  flex-direction: column;
  width: 100%;
  align-self: center;

}
::v-deep .sf-call-to-action__title,
 ::v-deep .sf-call-to-action__description {
  color: var(--_c-greenmind-primary-black);
  text-align: center;
  padding: 0 39px;
  height: 115px;
}
::v-deep .sf-call-to-action__title {
  margin-bottom: 28px;
  padding: 80px 0 0 0;
}
::v-deep .sf-button-call-to-action{
  transform: translate(0, 478%);
}

::v-deep .sf-image--wrapper{
    transform: translate(0, -40px);
}

::v-deep .sf-image--wrapper img{
    object-fit: contain !important;
}

.sf-call-to-action {
  flex-direction: column;
  width: 386px;
  height: 660px;
  border-radius: 14px;
  padding: 0;
}
</style>
