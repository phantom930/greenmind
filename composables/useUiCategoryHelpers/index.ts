import { computed, useRoute, ComputedRef } from '@nuxtjs/composition-api';
import { FacetSearchResult } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { Category } from '@vue-storefront/odoo-api';
import { FacetResultsData } from '@vue-storefront/odoo/lib/composables/types';

type useUiCategoryHelper = {
  currentCategoryNameForAccordion: ComputedRef<any>
  currentRootCategory: ComputedRef<any>
  categoryTree: ComputedRef<any>
  currentCategory: ComputedRef<Category>
}

const useUiHelpers = (result : FacetSearchResult<FacetResultsData>): useUiCategoryHelper => {
  const route = useRoute();
  const { params } = route.value;

  const categoryTree = computed(() =>
    facetGetters.getCategoryTree(result)
  );

  const currentCategory = computed<Category>(() => {
    const emptyCategory = {} as any;
    const categories = result?.data?.categories || [emptyCategory];
    return categories[0] || emptyCategory;
  });

  const currentCategoryNameForAccordion = computed(() => {
    const name =
      currentCategory?.value?.parent?.name ||
      categoryTree.value?.items[0]?.label ||
      '';
    return name;
  });

  const currentRootCategory = computed(() => {
    const categories = result?.data?.categories || [];
    const category = categories.find((category) => {
      return category.slug === params.slug_1;
    });

    const categoryFromParent = currentCategory?.value?.parent?.parent;

    return category || categoryFromParent || {};
  });

  return {
    currentCategoryNameForAccordion,
    currentRootCategory,
    currentCategory,
    categoryTree

  };
};

export default useUiHelpers;
