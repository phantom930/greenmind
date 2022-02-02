<template>
  <div id="category">
    <div class="navbar section">
        <div class="navbar__aside desktop-only">
            <SfBreadcrumbs
              class="breadcrumbs desktop-only"
              :breadcrumbs="breadcrumbs"
            />
        </div>
        <div class="navbar__main">
            <div class="navbar__title desktop-only">
            <LazyHydrate never>
            <SfHeading
                :title="$t('iPhones')"
            />
            </LazyHydrate>
            </div>
            <div class="navbar__sort desktop-only">
              <span class="navbar__label">{{ $t("Sort by") }}:</span>
              <LazyHydrate on-interaction>
                <SfSelect
                  :value="sortBy.selected"
                  placeholder="Select sorting"
                  data-cy="category-select_sortBy"
                  class="navbar__select"
                >
                <SfSelectOption
                  v-for="(option, index) in sortBy.options"
                  :key="index"
                  :value="option"
                  class="sort-by__option"
                  >{{ option }}</SfSelectOption
                >
                </SfSelect>
            </LazyHydrate>
            </div>
        </div>
    </div>    
    <div class="main section">
        <div class="sidebar desktop-only">
            <h3 class="main_title">Filter</h3>
            <SfAccordion
            showChevron
            transition="sf-expand"
            >
                <SfAccordionItem
                v-for="(accordion, index) in accordions1"
                :key="index"
                :header="accordion.name"
                >
                <template>
                <SfList class="list">
                    <SfListItem
                    class="list__item"
                    v-for="(item, id) in accordion.label"
                    :key="item"
                    >
                    <SfCheckbox
                        :label="item"
                        v-model="accordion.active[id]"
                    />
                    </SfListItem>
                </SfList>
                </template>
                </SfAccordionItem>
            </SfAccordion>
            <template>
                <h4 class="range_label">Pris</h4>
            </template>
            <SfRange 
              :value="[20,200]"
              :disabled="false"
              :config='{"start":[20,200],"range":{"min":20,"max":600},"step":10,"connect":true,"direction":"ltr","orientation":"horizontal","behaviour":"tap-drag","tooltips":true,"keyboardSupport":true}'
            />
            <SfAccordion
            showChevron
            transition="sf-expand"
            >
            <SfAccordionItem
                v-for="(accordion, index) in accordions2"
                :key="index"
                :header="accordion.name"
            >
            <template>
                <SfList class="list">
                    <SfListItem
                        class="list__item"
                        v-for="(item, id) in accordion.label"
                        :key="item"
                    >
                    <SfCheckbox
                        :label="item"
                        v-model="accordion.active[id]"
                    />
                    </SfListItem>
                </SfList>
            </template>
            </SfAccordionItem>
            </SfAccordion>
            <template>
                <h4 class="range_label">Farve</h4>
            </template>
            <SfColorPicker :isOpen="true" :hasClose="false">
                <SfColor style="margin: 0.4375rem" v-for="color in colors" :key="color.value" :color="color.color" :selected="color.selected" @click="color.selected = !color.selected"/>
            </SfColorPicker>
            <SfAccordion
            showChevron
            transition="sf-expand"
            >
            <SfAccordionItem
                v-for="(accordion, index) in accordions3"
                :key="index"
                :header="accordion.name"
            >
            <template>
                <SfList class="list">
                    <SfListItem
                        class="list__item"
                        v-for="(item, id) in accordion.label"
                        :key="item"
                    >
                    <SfCheckbox
                        :label="item"
                        v-model="accordion.active[id]"
                    />
                    </SfListItem>
                </SfList>
            </template>
            </SfAccordionItem>
            </SfAccordion>
        </div>
        <div class="products__grid">
            <GreenProductCard
            v-for="(product, index) in phones"
            :key="index"
            :product_card_title="product.title"
            :product_card_regularPrice="product.price"
            product_card_image="iPhone8"
            />
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import {
    SfBreadcrumbs,
    SfHeading,
    SfIcon,
    SfSelect,
    SfButton,
    SfAccordion,
    SfCheckbox,
    SfList,
    SfRange,
    SfColorPicker,
    SfColor
} from "@storefront-ui/vue";
export default {
  data() {
    return {
      item: ["iPhone8", "iPhone13", "iPhone8", "iPhone8", "iPhone8"],
      storage: ["128 Gb", "128 Gb", "128 Gb", "128 Gb", "128 Gb"],
      color: ["Gold", "Red", "Silver", "Black", "Gold"],
      price: ["2,999", "2,999", "2,999", "2,999", "2,999"],
      currency: ["$"],
      breadcrumbs: [
        {
          text: "Home",
          link: "#",
        },
        {
          text: "Women",
          link: "#",
        },
      ],
      sortBy: {options: ["Price from low to high", "Price from high to low", "From A to Z"]},
      accordions1: [
          {
            name: "Model",
            label: ["iPhone 8", "iPhone 10", "iPhone 13"],
            active: [false, false, false]
          },
          {
            name: "Stand",
            label: ["Ny vare", "Som ny", "Meget flot", "Okay", "Slidt"],
            active: [false, false, false, false, false]
          }
      ],
      accordions2: [
          {
            name: "Lagerplads",
            label: ["16 GB og under", "32 GB", "64 GB", "128 GB", "256 GB", "512 GB og over"],
            active: [false, false, false, false, false, false]
          }
      ],
      accordions3: [
          {
            name: "På lager i butik",
            label: [],
            active: []
          }
      ],
      colors: [
        {
            "label": "Sand",
            "value": "sand",
            "color": "#EDCBB9",
            "selected": false
        },
        {
            "label": "Mint",
            "value": "mint",
            "color": "#ABD9D8",
            "selected": false
        },
        {
            "label": "Light Gray",
            "value": "light gray",
            "color": "#F1F2F3",
            "selected": false
        },
        {
            "label": "Vivid rose",
            "value": "vivid rose",
            "color": "#DB5593",
            "selected": false
        },
        {
            "label": "Peach",
            "value": "peach",
            "color": "#F59F93",
            "selected": false
        },
        {
            "label": "Citrus",
            "value": "citrus",
            "color": "#FFEE97",
            "selected": false
        }
        ],
        phones: [
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          },
          {
            title: "iPhone 8",
            price: " Fra 2.999,-"
          }
        ]
    };
  },
  setup() {
      const selected = ref(false);

      return {
          selected
      }
  },
  components: {
    SfBreadcrumbs,
    SfHeading,
    SfIcon,
    SfSelect,
    SfButton,
    SfAccordion,
    SfCheckbox,
    SfList,
    SfRange,
    SfColorPicker,
    SfColor
  },
};
</script>

<style lang="scss" scoped>
:root {
  --font-family--primary: "Josefin Sans";
  @include generate-color-variants(--_c-green-primary, #7ba393);
  @include assign-color-variants(--c-primary, --_c-green-primary);
  @include assign-color-variants(--c-secondary, --_c-green-secondary);
}
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0 0 15px 0;
    }
  }
}
::v-deep .breadcrumbs {
  --breadcrumbs-font: var(--font-family--primary);
  margin-top: auto;
}
::v-deep .sf-heading__title{
  --heading-title-font: var(--font-family--primary);
  --heading-title-font-weight: 700;
  --heading-title-font-size: 34px;
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 0px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    padding: var(--spacer-sm) var(--spacer-sm);
  }
  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    display: flex;
    align-items: center;
    margin: 0 auto 0 auto;
  }
  &__label {
    font-family: var(--font-family--primary);
    font-weight: 400;
    color: #72757E;
    @include for-desktop {
      color: #72757E;
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      font-size: 16px;
      font-family: var(--font-family--primary);
      font-weight: 400;
      color: #1D1F22;
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: 16px;
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 0 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 18%;
  padding: var(--spacer-sm);
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
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: space-between;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
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
.before-results {
  box-sizing: border-box;
  padding: var(--spacer-lg) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
::v-deep .sf-accordion-item__content {
    list-style: none;
    padding: 0px 0px;
    font-size: 20px;
    font-weight: 500;
}
::v-deep .sf-range {
    margin: 20px 0px 35px 15px;
    width: 85%;
}
::v-deep .sf-range .noUi-tooltip {
    bottom: -200%;
}
::v-deep .sf-range .noUi-handle {
    width: 16px;
    height: 16px;
    transform: translate3d(-5px, 5%, 0);
}
::v-deep .sf-range .noUi-touch-area {
    background-color: var(--c-primary);
}
::v-deep .sf-color-picker {
    position: relative;
    width: 115%;
    margin: 0px 0px 0px -37px;
}
::v-deep .range-label {
    font-family: 'Josefin Sans', sans-serif;
    line-height: 24px;
    font-size: 20px;
    font-weight: 500;
}
::v-deep .main_title {
    font-family: 'Josefin Sans', sans-serif;
    line-height: 24px;
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 20%;
}
</style>