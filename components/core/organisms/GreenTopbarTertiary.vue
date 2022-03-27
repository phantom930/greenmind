<template>
  <SfHeader class="top-header">
    <template #navigation>
      <div class="header-links">
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">IPHONES</a>
          <div class="dropdown iphones">
            <SfMegaMenu title="iPhones" visible>
              <SfMegaMenuColumn title="iPhone 13">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 13 Pro Max" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 13 Pro" /></SfListItem
                  ></a>
                  <a href="/c/iphones-13/3260 "
                    ><SfListItem><SfMenuItem label="iPhone 13" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 13 Mini" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="iPhone 12">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 12 Pro Max" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 12 Pro" /></SfListItem
                  ></a>
                  <a href="/c/iphones-12/3265"
                    ><SfListItem><SfMenuItem label="iPhone 12" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="iPhone 12 Mini" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <nuxt-link to="#">
                <SfMegaMenuColumn title="iPhone SE (2020)" />
              </nuxt-link>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">SMARTPHONES</a>
          <div class="dropdown smartphones">
            <SfMegaMenu title="Smartphones" visible>
              <SfMegaMenuColumn title="Samsung Galaxy">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Galaxy S Series" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Galaxy Z Series" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Galaxy Note Series" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <nuxt-link to="#">
                <SfMegaMenuColumn title="OnePlus" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn title="Huawei" />
              </nuxt-link>
              <!-- <nuxt-link to="#">
                <SfMegaMenuColumn title="Sony" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn title="Google Pixel" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('All Smartphones')" />
              </nuxt-link>
              <nuxt-link to="/c/smartphone-accessories/3405">
                <SfMegaMenuColumn :title="$t('Smartphone accessories')" />
              </nuxt-link> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">TABLETS</a>
          <div class="dropdown tablets">
            <SfMegaMenu title="Tablets" visible>
              <nuxt-link to="/c/apple-ipads/3349">
                <SfMegaMenuColumn title="iPads" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn title="Android tablets" />
              </nuxt-link>
              <!-- <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('All tablets')" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('Tablet accessories')" />
              </nuxt-link> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">{{ $t("COMPUTERS") }}</a>
          <div class="dropdown computers">
            <SfMegaMenu title="Computers" visible>
              <SfMegaMenuColumn :title="$t('Portable')">
                <SfList>
                  <a href="/c/apple-macbooks/3355"
                    ><SfListItem
                      ><SfMenuItem label="Apple MacBooks" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Windows portable" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Stationary">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Apple stationary" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Windows stationary" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <!-- <SfMegaMenuColumn title="Gaming PC">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Gaming Portable" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Gaming Stationary" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Computer accessories')">
                <SfList>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="PC screens" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Mouse & Keyboard" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">{{ $t("Other Products") }}</a>
          <div class="dropdown other-products">
            <SfMegaMenu title="other-products" visible>
              <SfMegaMenuColumn :title="$t('Consoles')">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Sony Playstation" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Microsoft Xbox" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="Nintendo" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Console accessories" />{{
                        $t("Console accessories")
                      }}</SfListItem
                    ></a
                  >
                </SfList>
              </SfMegaMenuColumn>
              <!-- <SfMegaMenuColumn :title="$t('TV & Sound')">
                <SfList>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="TV accessories" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="Headphones" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Speakers & Hi-Fi" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="Projectors" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Camera & picture')">
                <SfList>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="Camera" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Camera lenses" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Camera accessories" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Smartwatches')">
                <SfList>
                  <a href="#"
                    ><SfListItem><SfMenuItem label="Apple watch" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Android smartwatch" /></SfListItem
                  ></a>
                  <a href="#"
                    ><SfListItem
                      ><SfMenuItem label="Smartwatch accessories" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a href="#" class="custom-link">{{ $t("Accessories") }}</a>
          <div class="dropdown accessories">
            <SfMegaMenu title="accessories" visible>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('iPhone accessories')" />
              </nuxt-link>
              <nuxt-link to="/c/smartphone-accessories/154">
                <SfMegaMenuColumn :title="$t('Smartphone accessories')" />
              </nuxt-link>
              <!-- <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('Computer accessories')" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('Console accessories')" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('TV & Sound accessories')" />
              </nuxt-link>
              <nuxt-link to="#">
                <SfMegaMenuColumn :title="$t('Smartwatch accessories')" />
              </nuxt-link> -->
            </SfMegaMenu>
          </div>
        </div>
      </div>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue';
export default {
  components: {
    SfHeader,
    SfMegaMenu,
    SfList,
    SfMenuItem
  },
  data() {
    return {
      sbCategories: [
        { name: 'IPHONES'},
        { name: 'SMARTPHONES'},
        { name: 'TABLETS'},
        { name: 'COMPUTERE'},
        { name: 'ANDRE PRODUKTER'},
        { name: 'TILBEHØR'}
      ]
    };
  }
};
</script>

<style scoped>
@import url("~/assets/css/greenTopbarTertiary.scss");
.top-header {
  z-index: 1;
}

::v-deep .dropdown.iphones .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 25px;
}

::v-deep .dropdown.smartphones .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 208px;
}

::v-deep .dropdown.tablets .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 435px;
}

::v-deep .dropdown.computers .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 620px;
}

::v-deep .dropdown.other-products .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 815px;
}

::v-deep .dropdown.accessories .sf-mega-menu__menu {
  justify-content: flex-start;
  padding-left: 1030px;
  overflow: visible;
}

::v-deep .dropdown.accessories {
  overflow: hidden;
}

::v-deep .dropdown .sf-mega-menu-column {
  margin-left: 25px;
  margin-right: 25px;
}
</style>
