<template>
  <SfButton
    :class="classes"
    v-bind="$props"
  >
    {{ text }}
  </SfButton>
</template>

<script lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { defineComponent, PropType, ComputedRef, computed } from '@nuxtjs/composition-api';
import { ButtonColor, ButtonShape, ButtonSize, ButtonType } from '~/green-api/types';
export default defineComponent({
  components: {
    SfButton
  },
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<ButtonType>,
      default: ButtonType.Primary
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: ButtonShape.Round
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: ButtonSize.Small
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: ButtonColor.Green
    }
  },
  setup (props) {

    const typeClasses : ComputedRef<string> = computed(() => {
      if (props.type === ButtonType.Primary && props.shape === ButtonShape.Round && props.color === ButtonColor.Green) {
        return 'bg-pine-primary-dark-green__with-hover big-text font-semibold';
      }
      if (props.type === ButtonType.Primary && props.shape === ButtonShape.Rectangle && props.color === ButtonColor.Green) {
        return 'bg-primary-green';
      }
      if (props.type === ButtonType.Primary && props.color === ButtonColor.Black) {
        return 'bg-primary-black big-text font-semibold';
      }
      if (props.type === ButtonType.Tertiary && props.color === ButtonColor.Grey) {
        return 'bg-tertiary-grey big-text text-primary-grey font-semibold';
      }

      switch (props.type) {
        case ButtonType.Secondary: return 'bg-fern-primary-medium-green__with-hover';
        default: break;
      }
    });

    const classes : ComputedRef<string> =
      computed(() => `btn ${typeClasses.value} ${props.shape.toLowerCase()} ${props.size.toLowerCase()} cursor-pointer`);

    return {
      classes
    };
  }
});
</script>

<style lang="scss" scoped>
$button-height: 50px;

.small {
  height: var($button-height);
  width: 168px;
  @include for-mobile {
    height: 52px;
    width: 216px;
  }
}
.medium {

  height: var($button-height);
  width: 280px;
}

.large {
  height: var($button-height);
  width: 400px;
  @include for-mobile {
    width: 343px;
  }
}

.big-text {
  font-size: 16px !important;
}
.round {
  border-radius: 100px;
}
.btn{
    font-family: var(--font-family--primary);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 19px 32px 19px 32px;
    @include for-mobile {
      padding: 18px 52px 18px 52px;
    }
}
.btn_primary__pine:hover{
    --button-background: #78A886;
    --button-box-shadow-opacity: 0.25;
    --button-background: #78A886 radial-gradient(circle, transparent 1%, #32463D 1%) center/15000%;
}
.btn_primary__pine:active {
    --button-box-shadow: none;
    --button-background: #32463D radial-gradient(circle, transparent 40%, #78A886 1%) center/15000%;
    --button-transition: background 0s ;
    --button-text-decoration: underline;
  background-size: 100%;
}
</style>
