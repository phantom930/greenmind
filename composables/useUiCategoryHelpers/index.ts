import { computed, ComputedRef } from '@nuxtjs/composition-api';
import { FacetSearchResult } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { Category } from '@vue-storefront/odoo-api';
import { FacetResultsData } from '@vue-storefront/odoo/lib/composables/types';

type useUiCategoryHelper = {
  currentRootCategory: ComputedRef<any>
  categoryTree: ComputedRef<any>
  currentCategory: ComputedRef<Category>
}

const useUiHelpers = (result : FacetSearchResult<FacetResultsData>): useUiCategoryHelper => {
  const categoryTree = computed(() =>
    facetGetters.getCategoryTree(result)
  );

  const currentCategory = computed<Category>(() => {
    const emptyCategory = {} as any;
    const categories = result?.data?.categories || [emptyCategory];
    return categories[0] || emptyCategory;
  });

  const currentRootCategory = computed(() => result?.data?.categories?.[0]?.parent || {});

  return {
    currentRootCategory,
    currentCategory,
    categoryTree

  };
};

export default useUiHelpers;
