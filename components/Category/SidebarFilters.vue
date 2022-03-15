<template>
  <div>
    <div class="sidebar desktop-only">
      <SfHeading
        :level="4"
        :title="$t('Filters')"
        class="filters-title pb-5 sf-heading--left"
      />
      <div class="filters desktop-only">
        <SfHeading
          :key="`filter-title-price`"
          :level="4"
          title="Price"
          class="filters__title sf-heading--left"
        />

        <LazyGreenRange
          v-model="price"
          :initial-price="price"
          @change="selectPrice"
        />
        <SfAccordion
          :multiple="false"
          transition="sf-expand"
          :open="openedHeaders"
        >
          <SfAccordionItem
            v-for="(facet, i) in facets"
            :key="i"
            :header="facet.label"
            class="mt-10"
          >
            <template #header="{ header, isOpen, accordionClick }">
              <div
                :style="{ cursor: 'pointer' }"
                class="flex justify-between"
                @click="accordionClick"
              >
                <h4 class="sf-heading__title h4">
                  {{ header }}
                </h4>

                <img
                  v-if="isOpen"
                  :src="require('/assets/images/category/arrow-down.svg')"
                  class="pr-5"
                >
                <img
                  v-else
                  :src="require('/assets/images/category/arrow-up.svg')"
                  class="pr-3.5"
                >
              </div>
            </template>
            <div
              v-if="isFacetColor(facet)"
              class="flex flex-wrap"
            >
              <SfColor
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_color_${option.value}`"
                :color="option.htmlColor"
                class="filters__color mr-3"
                @click="() => selectFilter(facet, option)"
              />
            </div>
            <template v-else>
              <SfList>
                <SfListItem
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                >
                  <SfCheckbox
                    class="mt-3"
                    :label="option.label"
                    :selected="isFilterSelected(option)"
                    @change="() => selectFilter(facet, option)"
                  />
                </SfListItem>
              </SfList>
            </template>
          </SfAccordionItem>
        </SfAccordion>
        </categorysfgreenaccordion>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, useRoute, computed } from '@nuxtjs/composition-api';
import {
  SfAccordion,
  SfColor,
  SfHeading,
  SfList,
  SfCheckbox
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useCurrency, useUiHelpers } from '~/composables';

export default defineComponent({
  components: {
    SfColor,
    SfHeading,
    SfAccordion,
    SfList,
    SfCheckbox,
    LazyHydrate
  },
  props: {
    facets: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const selectedFilters = ref([]);
    const price = ref([1, 1200]);
    const { toInteger } = useCurrency();
    const { query } = useRoute().value;
    const { changeFilters, isFacetColor, facetsFromUrlToFilter } =
      useUiHelpers();

    const setPrice = () => {
      const selectedValue = selectedFilters.value.find(
        (item) => item?.filterName === 'price'
      );

      if (selectedValue) {
        const splitedPriceFromUrl = selectedValue?.id?.split('-');

        price.value = splitedPriceFromUrl.map((item) => parseInt(item));
      }
    };

    const openedHeaders = computed(() => Object.keys(query));

    onMounted(() => {
      selectedFilters.value = facetsFromUrlToFilter();
      setPrice();
    });

    const facetHasMoreThanOneOption = (facet) =>
      facet?.options?.length > 1 || false;

    const applyFilters = () => {
      changeFilters(selectedFilters.value);
    };

    const isFilterSelected = (option) => {
      return selectedFilters.value?.some((filter) => filter.id === option.value);
    };

    const selectFilter = (facet, option) => {
      const alreadySelectedIndex = selectedFilters.value.findIndex(
        (filter) => String(filter.id) === String(option.value)
      );

      if (alreadySelectedIndex === -1) {
        selectedFilters.value.push({
          filterName: facet.label,
          label: option.label,
          id: option.value
        });
        applyFilters();
        return;
      }

      selectedFilters.value.splice(alreadySelectedIndex, 1);
      applyFilters();
    };

    const selectPrice = (values) => {
      const newValue = `${toInteger(values[0])}-${toInteger(values[1])}`;
      newValue[0];
      price.value = values;
      const selectedValue = selectedFilters.value.find(
        (item) => item?.filterName === 'price'
      );

      if (selectedValue) {
        selectedValue.id = newValue;
        applyFilters();

        return;
      }

      selectedFilters.value.push({
        label: 'Price',
        filterName: 'price',
        id: newValue
      });

      applyFilters();
    };

    return {
      openedHeaders,
      price,
      selectPrice,
      selectFilter,
      selectedFilters,
      facetHasMoreThanOneOption,
      isFilterSelected,
      isFacetColor
    };
  }
});
</script>

<style lang="scss" scoped>
@import url('~/assets/css/sidebarFilter.scss');
</style>
