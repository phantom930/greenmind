
<template>
  <div>
    <span
      class="clerk"

      data-api="search/predictive"
      data-limit="6"

      data-instant-search="MacBook"
    >

      <dl class="product-search-result-list">
        <dt>Products matching <i>{{ }}</i></dt>

        {% for product in products %}
        {% endfor %}
      </dl>
    </span>

    <div id="clerk-search-filters" />

    <span
      class="clerk"
      data-template="@ssearch"
      data-query="MacBook"
      data-facets-target="#clerk-search-filters"
      data-facets-price-prepend="€"
      data-facets-in-url="true"
      data-facets-view-more-text="View More"
      data-facets-searchbox-text="Search for "
      data-facets-design="149603"
    >
      <h1>123</h1>
    </span>
  </div>
</template>
<script lang="ts">

export default {
};
</script>
