<template>
  <div>
    <div class="sidebar desktop-only">
      <SfHeading
        :level="4"
        :title="$t('Filters')"
        class="filters-title pt-5 sf-heading--left"
      />
      <div class="filters desktop-only">
        <SfHeading
          :level="4"
          title="Price"
          class="filters__title sf-heading--left"
          :key="`filter-title-price`"
        />

        <LazyGreenRange />

        <SfAccordion :multiple="true" transition="sf-expand">
          <SfAccordionItem
            v-for="(facet, i) in facets"
            :header="facet.label"
            class="mt-10"
            :key="i"
          >
            <template #header="{ header, isOpen, accordionClick }">
              <div
                @click="accordionClick"
                :style="{ cursor: 'pointer' }"
                class="flex justify-between"
              >
                <h4 class="sf-heading__title h4">{{ header }}</h4>

                <img
                  :src="require('/assets/images/category/arrow-down.svg')"
                  v-if="isOpen"
                  class="pr-5"
                />
                <img
                  :src="require('/assets/images/category/arrow-up.svg')"
                  v-else
                  class="pr-3.5"
                />
              </div>
            </template>
            <div v-if="isFacetColor(facet)" class="flex">
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
              <div
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
              >
                <SfCheckbox
                  class="mt-3"
                  :label="option.label"
                  :selected="isFilterSelected(option)"
                  @change="() => selectFilter(facet, option)"
                />
              </div>
            </template>
          </SfAccordionItem>
        </SfAccordion>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "@nuxtjs/composition-api";
import {
  SfAccordion,
  SfColor,
  SfFilter,
  SfMenuItem,
  SfHeading,
  SfSidebar,
  SfList,
  SfCheckbox,
} from "@storefront-ui/vue";
import LazyHydrate from "vue-lazy-hydration";
import { useUiHelpers } from "~/composables";

export default defineComponent({
  props: {
    facets: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SfSidebar,
    SfColor,
    SfFilter,
    SfMenuItem,
    SfHeading,
    SfAccordion,
    SfList,
    SfCheckbox,
    LazyHydrate,
  },
  setup() {
    const selectedFilters = ref([]);
    const { changeFilters, isFacetColor, facetsFromUrlToFilter } =
      useUiHelpers();

    onMounted(() => {
      selectedFilters.value = facetsFromUrlToFilter();
    });

    const facetHasMoreThanOneOption = (facet) =>
      facet?.options?.length > 1 || false;

    const clearFilters = () => {
      selectedFilters.value = [];
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      changeFilters(selectedFilters.value);
    };

    const isFilterSelected = (option) => {
      return selectedFilters.value?.some((filter) => filter.id == option.value);
    };

    const selectFilter = (facet, option) => {
      const alreadySelectedIndex = selectedFilters.value.findIndex(
        (filter) => String(filter.id) === String(option.value)
      );

      if (alreadySelectedIndex === -1) {
        selectedFilters.value.push({
          filterName: facet.label,
          label: option.label,
          id: option.value,
        });

        return;
      }

      selectedFilters.value.splice(alreadySelectedIndex, 1);
    };

    return {
      selectFilter,
      selectedFilters,
      facetHasMoreThanOneOption,
      isFilterSelected,
      isFacetColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.filters {
  &__title {
    margin: var(--spacer-xs) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-sm) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}

.filters-title .sf-heading__title {
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: var(--line-height--primary);
  color: var(--_c-greenmind-primary-black);
}
.filters__title .sf-heading__title {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: var(--line-height--primary);
  color: var(--_c-greenmind-primary-black);
}

.sidebar {
  margin-left: 8px;
  width: 290px;
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
::v-deep .sf-checkbox__checkmark {
  border-radius: 50%;
}
::v-deep .sf-checkbox__checkmark:not(.is-active) {
  border: var(--_c-greenmind-primary-black) solid 1px;
}
::v-deep .sf-checkbox__checkmark.is-active {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
::v-deep .sf-accordion-item__content {
  margin-top: 25px;
}
</style>