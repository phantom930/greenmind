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

        <div v-for="(facet, i) in facets" :key="i">
          <template v-if="facetHasMoreThanOneOption(facet)">
            <SfHeading
              :level="4"
              :title="facet.label"
              class="filters__title sf-heading--left"
              :key="`filter-title-${facet.value}`"
            />
            <div
              v-if="isFacetColor(facet)"
              class="filters__colors"
              :key="`${facet.value}-colors`"
            >
              <SfColor
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_color_${option.value}`"
                :color="option.htmlColor"
                :selected="isFilterSelected(facet, option)"
                class="filters__color mr-3"
                @click="() => selectFilter(facet, option)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.value}`"
                :data-cy="`category-filter_${facet.id}_${option.value}`"
                :label="
                  option.label + `${option.count ? ` (${option.count})` : ''}`
                "
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </template>
        </div>
      </div>
      <SfAccordion class="filters smartphone-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfAccordionItem
            :key="`filter-title-${facet.id}`"
            :header="facet.label"
            class="filters__accordion-item"
          >
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.label"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </SfAccordionItem>
        </div>
      </SfAccordion>
    </div>
    <LazyHydrate when-idle>
      <SfSidebar :visible="false" title="Filters" class="sidebar-filters">
        <template #content-bottom>
          <div class="filters__buttons">
            <SfButton class="sf-button--full-width" @click="applyFilters">{{
              $t("Done")
            }}</SfButton>
            <SfButton
              class="sf-button--full-width filters__button-clear"
              @click="clearFilters"
              >{{ $t("Clear all") }}</SfButton
            >
          </div>
        </template>
      </SfSidebar>
    </LazyHydrate>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "@nuxtjs/composition-api";
import {
  SfAccordion,
  SfColor,
  SfFilter,
  SfHeading,
  SfSidebar,
} from "@storefront-ui/vue";
import LazyHydrate from "vue-lazy-hydration";
import { useUiHelpers } from "~/composables";

export default defineComponent({
  props: {
    facets: {
      type: Array,
      defualt: () => [],
    },
  },
  components: {
    SfSidebar,
    SfAccordion,
    SfColor,
    SfFilter,
    SfHeading,
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

    const isFilterSelected = (facet, option) => {
      return selectedFilters.value.some(
        (filter) => String(filter.id) === String(option.value)
      );
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
</style>