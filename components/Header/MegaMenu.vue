<template>
  <div class="header-links">
    <div class="dropdown-wrap">
      <nuxt-link to="/telefoner/iphones" class="custom-link">
        IPHONES
      </nuxt-link>
      <div class="dropdown iphones">
        <SfMegaMenu title="megaMenu" visible>
          <SfMegaMenuColumn title="iPhones">
            <SfList>
              <nuxt-link to="/telefoner/iphones/iphone-13">
                <SfListItem><SfMenuItem :label="$t('iPhone 13 Series')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-12">
                <SfListItem><SfMenuItem :label="$t('iPhone 12 Series')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-se-2020">
                <SfListItem><SfMenuItem :label="$t('iPhone SE 2020')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-11">
                <SfListItem><SfMenuItem :label="$t('iPhone 11 Series')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="iPhones">
            <SfList>
              <nuxt-link to="/telefoner/iphones/iphone-xs">
                <SfListItem><SfMenuItem :label="$t('iPhone Xs')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-xr">
                <SfListItem><SfMenuItem :label="$t('iPhone Xr')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-x">
                <SfListItem><SfMenuItem :label="$t('iPhone X')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-8">
                <SfListItem><SfMenuItem :label="$t('iPhone 8')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="iPhones">
            <SfList>
              <nuxt-link to="/telefoner/iphones">
                <SfListItem><SfMenuItem :label="$t('All iPhones')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/iphones/iphone-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('iPhone Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </div>
    <div class="dropdown-wrap">
      <nuxt-link to="/telefoner/smartphones" class="custom-link">
        SMARTPHONES
      </nuxt-link>
      <div class="dropdown smartphones">
        <SfMegaMenu title="Smartphones" visible>
          <SfMegaMenuColumn title="Smartphones">
            <SfList>
              <nuxt-link to="/telefoner/smartphones/samsung-galaxy">
                <SfListItem><SfMenuItem :label="$t('Samsung Galaxy')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/smartphones/huawei">
                <SfListItem><SfMenuItem :label="$t('Huawei')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/smartphones/oneplus">
                <SfListItem><SfMenuItem :label="$t('OnePlus')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/smartphones/sony">
                <SfListItem><SfMenuItem :label="$t('Sony')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Smartphones">
            <SfList>
              <nuxt-link to="/telefoner/smartphones/motorola">
                <SfListItem><SfMenuItem :label="$t('Motorola')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/smartphones/google-pixel">
                <SfListItem><SfMenuItem :label="$t('Google Pixel')" /></SfListItem>
              </nuxt-link>
              <!-- <nuxt-link to="/telefoner/smartphones/xiaomi">
                    <SfListItem><SfMenuItem :label="$t('Xiaomi')" /></SfListItem>
                  </nuxt-link> -->
              <nuxt-link to="/telefoner/smartphones">
                <SfListItem><SfMenuItem :label="$t('All Smartphones')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Smartphones">
            <SfList>
              <nuxt-link to="/telefoner/telefon-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Smartphone Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </div>
    <div class="dropdown-wrap">
      <nuxt-link to="/tablets" class="custom-link">
        TABLETS
      </nuxt-link>
      <div class="dropdown tablets">
        <SfMegaMenu
          title="Tablets"
          visible
        >
          <SfMegaMenuColumn title="Tablets">
            <SfList>
              <nuxt-link to="/tablets/ipads/">
                <SfListItem><SfMenuItem :label="$t('Apple iPads')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/tablets/android">
                <SfListItem><SfMenuItem :label="$t('Android Tablets')" /></SfListItem>
              </nuxt-link>
              <!-- <nuxt-link to="/tablets/windows">
                    <SfListItem><SfMenuItem :label="$t('Windows Tablets')" /></SfListItem>
                  </nuxt-link> -->
              <nuxt-link to="/tablets">
                <SfListItem><SfMenuItem :label="$t('All Tablets')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Tablets">
            <SfList>
              <nuxt-link to="/tablets/tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Tablet Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </div>
    <div class="dropdown-wrap">
      <nuxt-link to="/computere" class="custom-link">
        {{ $t("COMPUTERS") }}
      </nuxt-link>
      <div class="dropdown computers">
        <SfMegaMenu title="Computers" visible>
          <SfMegaMenuColumn title="Computers">
            <SfList>
              <nuxt-link to="/computere/baerbare/apple-macbooks">
                <SfListItem><SfMenuItem :label="$t('Apple MacBooks')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/apple-stationaere">
                <SfListItem><SfMenuItem :label="$t('Apple Desktops')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/baerbare/windows-baerbare">
                <SfListItem><SfMenuItem :label="$t('Windows Laptops')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/stationaere/windows-stationaere">
                <SfListItem><SfMenuItem :label="$t('Windows Desktops')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Computers">
            <SfList>
              <nuxt-link to="/computere/gaming-pc/gaming-stationaer">
                <SfListItem><SfMenuItem :label="$t('Gaming Desktops')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/gaming-pc/gaming-baerbar">
                <SfListItem><SfMenuItem :label="$t('Gaming Laptops')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/computer-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Computer Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </div>
    <div class="dropdown-wrap">
      <nuxt-link to="/andre" class="custom-link">
        {{ $t("Other Products") }}
      </nuxt-link>
      <div class="dropdown other-products">
        <SfMegaMenu title="Other Products" visible>
          <SfMegaMenuColumn title="Other Products">
            <SfList>
              <nuxt-link to="/smartwatches">
                <SfListItem><SfMenuItem :label="$t('Smartwatches')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/tv-og-lyd">
                <SfListItem><SfMenuItem :label="$t('TV & Sound')" /></SfListItem>
              </nuxt-link>
              <!-- <nuxt-link to="/kamera-og-billede">
                    <SfListItem><SfMenuItem :label="$t('Camera & Photo')" /></SfListItem>
                  </nuxt-link> -->
              <nuxt-link to="/konsoller">
                <SfListItem><SfMenuItem :label="$t('Consoles')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
      </nuxt-link>
    </div>
    <div class="dropdown-wrap">
      <nuxt-link to="/tilbehoer" class="custom-link">
        {{ $t("Accessories") }}
      </nuxt-link>
      <div class="dropdown accessories">
        <SfMegaMenu title="Accessories" visible>
          <SfMegaMenuColumn title="Accessories">
            <SfList>
              <nuxt-link to="/telefoner/iphones/iphone-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('iPhone Accessories')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/telefoner/telefon-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Smartphone Accessories')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/computere/computer-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Computer Accessories')" /></SfListItem>
              </nuxt-link>
              <nuxt-link to="/konsoller/konsol-tilbehoer">
                <SfListItem><SfMenuItem :label="$t('Consoles Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn title="Accessories">
            <SfList>
              <nuxt-link to="/tv-og-lyd/tilbehoer">
                <SfListItem><SfMenuItem :label="$t('TV & Sound Accessories')" /></SfListItem>
              </nuxt-link>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem
  },
  setup() {

  }
});
</script>
<style scoped lang="scss">
@import url("~/assets/css/megamenu.scss");
</style>
