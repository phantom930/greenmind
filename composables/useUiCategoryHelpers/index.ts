import { computed, ComputedRef, useRoute } from '@nuxtjs/composition-api';
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
  const { path } = useRoute().value;

  const categoryTree = computed(() =>
    facetGetters.getCategoryTree(result)
  );

  const currentRootCategory = computed(() => result?.data?.categories?.[0] || { childs: []});

  const currentCategory = computed<Category>(() => {
    let category = null;
    currentRootCategory.value?.childs?.forEach(element => {
      element?.childs?.forEach(element => {
        if (element.slug === path) {
          category = element;
        }
      });
    });

    return category;
  });

  return {
    currentRootCategory,
    currentCategory,
    categoryTree

  };
};

export default useUiHelpers;
