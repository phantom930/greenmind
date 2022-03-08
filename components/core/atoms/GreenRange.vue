<template>
  <SfRange
    :disabled="false"
    :config="config"
    @change="$emit('change', arguments[0])"
  />
</template>

<script>
import { SfRange } from '@storefront-ui/vue';
import { useCurrency } from '~/composables';
import { reactive } from '@nuxtjs/composition-api';
export default {
  components: {
    SfRange
  },
  props: {
    initialPrice: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['change'],
  setup(props) {
    const { formatDolar } = useCurrency();

    const config = reactive({
      start: props.initialPrice,
      range: { min: 0, max: 4000 },
      step: 10,
      connect: true,
      direction: 'ltr',
      orientation: 'horizontal',
      behaviour: 'tap-drag',
      tooltips: true,
      keyboardSupport: true,
      format: {
        to: (value) => formatDolar(value),
        from: (value) => value
      }
    });

    return {
      config
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-range {
  margin: 65px 0px 60px 7px;
  width: 91%;
  height: 5px;
}
.sf-range::before {
  content: url("assets/images/category/range-graph-part-one.svg");
  bottom: 53px;
  left: 30px;
  position: relative;
}
.sf-range::after {
  content: url("assets/images/category/range-graph-part-two.svg");
  bottom: 98px;
  left: 125px;
  position: relative;
}

::v-deep .noUi-handle {
  width: 20px;
  height: 20px;
  top: -3px;
  background-color: var(--_c-greenmind-fern-primary-medium-green);
  border: none;
  cursor: pointer;
}
::v-deep .noUi-handle:hover {
  background-color: var(--_c-greenmind-mint-primary-light-green);
}

::v-deep .noUi-handle:active {
  background-color: blue;
}

::v-deep .noUi-touch-area:active {
  background-color: blue;
}
::v-deep .noUi-tooltip {
  bottom: -200%;
}
::v-deep .noUi-touch-area {
  background-color: var(--_c-greenmind-fern-primary-medium-green);
}

::v-deep .noUi-touch-area:hover {
  background-color: var(--_c-greenmind-mint-primary-light-green);
}
::v-deep .noUi-base,
::v-deep .noUi-connects {
  position: initial !important;
}
</style>
