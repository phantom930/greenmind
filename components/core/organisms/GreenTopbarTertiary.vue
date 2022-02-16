<template>
  <div class="dropdown-wrap">
    <SfHeader>
      <template #navigation>
        <div class="header-links">
          <SfHeaderNavigationItem
            v-for="(category, index) in sbCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :link="localePath(`/c/${category.slug}/${category.id}`)"
          />
        </div>
  <div class="dropdown">
    <SfMegaMenu title="Man" visible>
    <SfMegaMenuColumn title="Samsung">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Huawei">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Sony">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="One Plus">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Category">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Category">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Category">
      <SfList>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
        <a href="#"><SfListItem><SfMenuItem label="Skirts" />Boots</SfListItem></a>
      </SfList>
    </SfMegaMenuColumn>
    <!-- <SfMegaMenuColumn
      class="
        sf-mega-menu-column--pined-content-on-mobile
        sf-mega-menu-column--hide-header-on-mobile
      "
      title="Featured"
    >
      <div class="smartphone-only">
        <SfBanner
          title="THE OFFICE LIFE"
          subtitle="T-shirts"
          :image='{"mobile":"/assets/storybook/SfMegaMenu/bannerSandals.jpg","desktop":"/assets/storybook/SfMegaMenu/bannerSandals.jpg"}'
        />
        <SfBanner
          title="ECO SANDALS"
          subtitle="T-shirts"
          :image='{"mobile":"/assets/storybook/SfMegaMenu/bannerBeachBag.jpg","desktop":"/assets/storybook/SfMegaMenu/bannerBeachBag.jpg"}'
        />
      </div>
      <div class="desktop-only">
        <SfBanner
          title="THE OFFICE LIFE"
          subtitle="T-shirts"
          :image='{"mobile":"/assets/storybook/SfMegaMenu/bannerSandals.jpg","desktop":"/assets/storybook/SfMegaMenu/bannerSandals.jpg"}'
        />
        <SfBanner
          title="ECO SANDALS"
          subtitle="T-shirts"
          :image='{"mobile":"/assets/storybook/SfMegaMenu/bannerBeachBag.jpg","desktop":"/assets/storybook/SfMegaMenu/bannerBeachBag.jpg"}'
        />
      </div>
    </SfMegaMenuColumn> -->
  </SfMegaMenu>
  </div>
      </template>
  </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfMegaMenu } from '@storefront-ui/vue';
export default {
  components: {
    SfHeader,
    SfMegaMenu
  },
  data() {
      return {
      sbCategories: [
          {   name: "IPHONES"},
          {   name: "SMARTPHONES"},
          {   name: "TABLETS"},
          {   name: "COMPUTERE"},
          {   name: "ANDRE PRODUKTER"},
          {   name: "TILBEHØR"}
          ]
      }
  }
}
</script>

<style scoped>
::v-deep .sf-search-bar{
    display: none;
}
::v-deep .sf-header__icons{
    display: none;
}

::v-deep .header-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

::v-deep .sf-header-navigation-item {
  display: block;
}

::v-deep .sf-header__navigation {
  width: 100%;
  z-index: 1;
}

::v-deep .sf-header-navigation-item__link {
  font-weight: 500;
  font-size: 14px;
  color: #1D1F22;
}

::v-deep .dropdown {
  /* display: none; */
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  background: #fff;
}

::v-deep .sf-header:hover .dropdown {
  display: block;
}

.dropdown-wrap {
  position: relative;
}

::v-deep .sf-mega-menu__content {
  max-width: 1208px;
  width: 100%;
  padding-bottom: 80px;
}

::v-deep .sf-menu-item__label {
  font-size: 18px;
  font-weight: 400;
  color: #1D1F22;
  font-family: "Josefin Sans";
  text-transform: none;
  transition: all 0.3s;
}

::v-deep .sf-list__item::marker {
  content: none;
}

::v-deep .sf-list__item {
  color: #43464E;
  margin-bottom: 15px;
  border-bottom: 1px solid transparent;
}

::v-deep .sf-list__item:hover {
  border-bottom: 1px solid #7BA393;
  color: #7BA393;
}

::v-deep .sf-mega-menu-column {
  max-width: 100px;
  width: 100%;
}

::v-deep .sf-mega-menu-column .sf-mega-menu-column__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

::v-deep .sf-mega-menu-column:hover .sf-menu-item__label {
  color: #7BA393;
}

</style>
