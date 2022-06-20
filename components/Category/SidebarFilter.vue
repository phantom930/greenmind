<template>
  <div>
    <component
      :is="mobileOrTabletSize ? 'SfSidebar' : 'div'"
      class="sidebar sidebar-filters"
      :visible="isFilterSidebarOpen"
      title="Filters"
      @close="toggleFilterSidebar"
    >
      <SfHeading
        :class="{ hidden: mobileOrTabletSize }"
        :level="4"
        :title="$t('Filters')"
        class="filters-title pb-5 sf-heading--left"
      />
      <div class="filters">
        <SfHeading
          :key="`filter-title-price`"
          :class="{ hidden: !showFilters }"
          :level="4"
          :title="$t('Price')"
          class="filters__title sf-heading--left"
        />

        <LazyGreenRange
          v-model="price"
          :class="{ hidden: !showFilters }"
          :initial-price="price"
          :range-prices="rangeAttributes"
          @change="selectPrice"
        />
        <SfAccordion
          :multiple="false"
          transition="sf-fade"
          :open="openedHeaders"
        >
          <div v-for="(facet, i) in facets" :key="i">
            <SfAccordionItem
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
                    :class="{ hidden: !isOpen }"
                    :src="require('/assets/images/category/arrow-up.svg')"
                    alt="arrow-up"
                    class="pr-3.5"
                  >
                  <img
                    :class="{ hidden: isOpen }"
                    :src="require('/assets/images/category/arrow-down.svg')"
                    alt="arrow-down"
                    class="pr-5"
                  >
                </div>
              </template>
              <div v-show="isFacetColor(facet)" class="flex flex-wrap">
                <SfColor
                  v-for="option in facet.options"
                  :key="`${facet.id}-${option.value}`"
                  :data-cy="`category-filter_color_${option.value}`"
                  :color="option.htmlColor"
                  class="filters__color mr-3"
                  @click="() => selectFilter(facet, option)"
                />
              </div>
              <SfList v-show="!isFacetColor(facet)">
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
            </SfAccordionItem>
          </div>
        </sfaccordion>
      </div>
      <div class="smartphone-only mt-10">
        <GreenButton
          style-type="Primary"
          color="Green"
          shape="Round"
          size="Max"
          @click="applyFilters"
        >
          {{ $t("Done") }}
        </GreenButton>

        <nuxt-link :to="currentCategory.slug" :title="currentCategory.slug">
          <GreenButton
            class="mt-5"
            style-type="Tertiary"
            color="Grey"
            shape="Round"
            size="Max"
            @click="toggleFilterSidebar"
          >
            {{ $t("Cancel") }}
          </GreenButton>
        </nuxt-link>
      </div>
    </component>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent, useRoute, computed } from '@nuxtjs/composition-api';
import {
  SfAccordion,
  SfColor,
  SfHeading,
  SfList,
  SfCheckbox,
  SfSidebar
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useCurrency, useUiHelpers, useUiState } from '~/composables';

export default defineComponent({
  components: {
    SfColor,
    SfHeading,
    SfAccordion,
    SfList,
    SfCheckbox,
    SfSidebar,
    LazyHydrate
  },
  props: {
    facets: {
      type: Array,
      default: () => []
    },
    rangeAttributes: {
      type: Object,
      default: () => ({})
    },
    currentCategory: {
      type: Object,
      default: () => ({})
    },
    showFilters: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reset'],
  setup(props, { root, emit }) {
    const selectedFilters = ref([]);
    const price = ref([0, props.rangeAttributes.maxPrice]);
    const { toInteger } = useCurrency();
    const { query } = useRoute().value;
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();

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

    const reset = () => {
      emit('reset');
    };
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const openedHeaders = computed(() => Object.keys(query).map(item => item.replace('_', ' ')));

    onMounted(() => {
      selectedFilters.value = facetsFromUrlToFilter();
      setPrice();
    });

    const facetHasMoreThanOneOption = (facet) =>
      facet?.options?.length > 1 || false;

    const applyFilters = () => {
      changeFilters(selectedFilters.value);
      if (mobileOrTabletSize.value) {
        toggleFilterSidebar();
      }
    };

    const isFilterSelected = (option) => {
      return selectedFilters.value?.some((filter) => filter.id === option.id);
    };

    const selectFilter = (facet, option) => {
      const alreadySelectedIndex = selectedFilters.value.findIndex(
        (filter) => String(filter.id) === String(option.id)
      );

      if (alreadySelectedIndex === -1) {
        selectedFilters.value.push({
          filterName: facet.label.replace(' ', '_'),
          label: option.label,
          id: option.id
        });

        !mobileOrTabletSize.value ? applyFilters() : '';

        return;
      }

      selectedFilters.value.splice(alreadySelectedIndex, 1);
      !mobileOrTabletSize.value ? applyFilters() : '';
    };

    const selectPrice = (values) => {
      const min = toInteger(values[0]?.replace(',-', '').replace('.', ''));
      const max = toInteger(values[1]?.replace(',-', '').replace('.', ''));

      const newValue = `${min}-${max}`;

      price.value = [min, max];
      const selectedValue = selectedFilters.value.find(
        (item) => item?.filterName === 'price'
      );

      if (selectedValue) {
        selectedValue.id = newValue;
        !mobileOrTabletSize.value ? applyFilters() : '';

        return;
      }

      selectedFilters.value.push({
        label: 'Price',
        filterName: 'price',
        id: newValue
      });

      !mobileOrTabletSize.value ? applyFilters() : '';
    };

    return {
      mobileOrTabletSize,
      applyFilters,
      isFilterSidebarOpen,
      toggleFilterSidebar,
      openedHeaders,
      price,
      selectPrice,
      selectFilter,
      selectedFilters,
      facetHasMoreThanOneOption,
      isFilterSelected,
      isFacetColor,
      reset
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/sidebarFilter.scss";
</style>
