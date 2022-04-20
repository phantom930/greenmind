<template>
  <SfHeader class="top-header">
    <template #navigation>
      <div class="header-links">
        <div class="dropdown-wrap">
          <a
            href="/iphones"
            class="custom-link"
          >IPHONES</a>
          <div class="dropdown iphones">
            <SfMegaMenu
              title="iPhones"
              visible
            >
              <SfMegaMenuColumn title="iPhone 13">
                <SfList>
                  <nuxt-link to="/iphones/iphone13-pro-max">
                    <SfListItem><SfMenuItem label="iPhone 13 Pro Max" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/iphones/iphone13-pro">
                    <SfListItem><SfMenuItem label="iPhone 13 Pro" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/category/iphones-13/3260 ">
                    <SfListItem><SfMenuItem label="iPhone 13" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/iphones/iphone13-mini">
                    <SfListItem><SfMenuItem label="iPhone 13 Mini" /></SfListItem>
                  </nuxt-link>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="iPhone 12">
                <SfList>
                  <nuxt-link to="/iphones/iphone12-pro-max">
                    <SfListItem><SfMenuItem label="iPhone 12 Pro Max" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/iphones/iphone12-pro">
                    <SfListItem><SfMenuItem label="iPhone 12 Pro" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/iphones/iphone12">
                    <SfListItem><SfMenuItem label="iPhone 12" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/iphones/iphone12-mini">
                    <SfListItem><SfMenuItem label="iPhone 12 Mini" /></SfListItem>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <nuxt-link to="/iphones/iphonese-2020">
                <SfMegaMenuColumn title="iPhone SE (2020)" />
              </nuxt-link>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/smartphones"
            class="custom-link"
          >SMARTPHONES</a>
          <div class="dropdown smartphones">
            <SfMegaMenu
              title="Smartphones"
              visible
            >
              <SfMegaMenuColumn title="Samsung Galaxy">
                <SfList>
                  <nuxt-link to="/smartphones/galaxy-s-series">
                    <SfListItem><SfMenuItem label="Galaxy S Series" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/smartphones/galaxy-z-series">
                    <SfListItem><SfMenuItem label="Galaxy Z Series" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/smartphones/galaxy-note-series">
                    <SfListItem><SfMenuItem label="Galaxy Note Series" /></SfListItem>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <nuxt-link to="/smartphones/oneplus">
                <SfMegaMenuColumn title="OnePlus" />
              </nuxt-link>
              <nuxt-link to="/smartphones/huawei">
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
          <a
            href="/tablets"
            class="custom-link"
          >TABLETS</a>
          <div class="dropdown tablets">
            <SfMegaMenu
              title="Tablets"
              visible
            >
              <nuxt-link to="/tablets/ipads">
                <SfMegaMenuColumn title="iPads" />
              </nuxt-link>
              <nuxt-link to="/tablets/android-tablets">
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
          <a
            href="/computers"
            class="custom-link"
          >{{ $t("COMPUTERS") }}</a>
          <div class="dropdown computers">
            <SfMegaMenu
              title="Computers"
              visible
            >
              <SfMegaMenuColumn :title="$t('Portable')">
                <SfList>
                  <nuxt-link to="/computers/laptops/apple/macbooks">
                    <SfListItem><SfMenuItem label="Apple MacBooks" /></SfListItem></a>
                    <nuxt-link to="/computers/laptops/windows">
                      <SfListItem><SfMenuItem label="Windows portable" /></SfListItem>
                    </nuxt-link>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Stationary">
                <SfList>
                  <nuxt-link to="/computers/desktop/apple">
                    <SfListItem><SfMenuItem label="Apple stationary" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/computers/desktop/windows">
                    <SfListItem><SfMenuItem label="Windows stationary" /></SfListItem>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <!-- <SfMegaMenuColumn title="Gaming PC">
                <SfList>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Gaming Portable" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Gaming Stationary" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Computer accessories')">
                <SfList>
                  <nuxt-link to="#"
                    ><SfListItem><SfMenuItem label="PC screens" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Mouse & Keyboard" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/other-products"
            class="custom-link"
          >{{ $t("Other Products") }}</a>
          <div class="dropdown other-products">
            <SfMegaMenu
              title="other-products"
              visible
            >
              <SfMegaMenuColumn :title="$t('Consoles')">
                <SfList class="justify-between flex-wrap">
                  <nuxt-link to="/consoles/sony-playstation">
                    <SfListItem><SfMenuItem label="Sony Playstation" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/consoles/microsoft-xbox">
                    <SfListItem><SfMenuItem label="Microsoft Xbox" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/consoles/nintendo">
                    <SfListItem><SfMenuItem label="Nintendo" /></SfListItem>
                  </nuxt-link>
                  <nuxt-link to="/consoles/accessories">
                    <SfListItem><SfMenuItem label="Console accessories" /></SfListItem>
                  </nuxt-link>
                </SfList>
              </SfMegaMenuColumn>
              <!-- <SfMegaMenuColumn :title="$t('TV & Sound')">
                <SfList>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="TV accessories" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem><SfMenuItem label="Headphones" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Speakers & Hi-Fi" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem><SfMenuItem label="Projectors" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Camera & picture')">
                <SfList>
                  <nuxt-link to="#"
                    ><SfListItem><SfMenuItem label="Camera" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Camera lenses" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Camera accessories" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn :title="$t('Smartwatches')">
                <SfList>
                  <nuxt-link to="#"
                    ><SfListItem><SfMenuItem label="Apple watch" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Android smartwatch" /></SfListItem
                  ></a>
                  <nuxt-link to="#"
                    ><SfListItem
                      ><SfMenuItem label="Smartwatch accessories" /></SfListItem
                  ></a>
                </SfList>
              </SfMegaMenuColumn> -->
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/accessories"
            class="custom-link"
          >{{ $t("Accessories") }}</a>
          <div class="dropdown accessories">
            <SfMegaMenu
              title="accessories"
              visible
            >
              <nuxt-link to="/iphones/accessories">
                <SfMegaMenuColumn :title="$t('iPhone accessories')" />
              </nuxt-link>
              <nuxt-link to="/smartphones/accessories">
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

</style>
