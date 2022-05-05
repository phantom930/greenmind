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
              <SfMegaMenuColumn title="iPhones">
                <SfList>
                  <a href="/telefoner/iphones/iphone-13"><SfListItem><SfMenuItem :label="$t('iPhone 13 Series')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-12"><SfListItem><SfMenuItem :label="$t('iPhone 12 Series')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-se-2020"><SfListItem><SfMenuItem :label="$t('iPhone SE 2020')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-11"><SfListItem><SfMenuItem :label="$t('iPhone 11 Series')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="iPhones">
                <SfList>
                  <a href="/telefoner/iphones/iphone-xs"><SfListItem><SfMenuItem :label="$t('iPhone Xs Series')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-xr"><SfListItem><SfMenuItem :label="$t('iPhone Xr')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-x"><SfListItem><SfMenuItem :label="$t('iPhone X')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-8"><SfListItem><SfMenuItem :label="$t('iPhone 8')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="iPhones">
                <SfList>
                  <a href="/telefoner/iphones"><SfListItem><SfMenuItem :label="$t('All iPhones')" /></SfListItem></a>
                  <a href="/telefoner/iphones/iphone-tilbehoer"><SfListItem><SfMenuItem :label="$t('iPhone Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/telefoner/smartphones"
            class="custom-link"
          >SMARTPHONES</a>
          <div class="dropdown smartphones">
            <SfMegaMenu
              title="Smartphones"
              visible
            >
              <SfMegaMenuColumn title="Smartphones">
                <SfList>
                  <a href="/telefoner/smartphones/samsung-galaxy"><SfListItem><SfMenuItem :label="$t('Samsung Galaxy')" /></SfListItem></a>
                  <a href="/telefoner/smartphones/huawei"><SfListItem><SfMenuItem :label="$t('Huawei')" /></SfListItem></a>
                  <a href="/telefoner/smartphones/oneplus"><SfListItem><SfMenuItem :label="$t('OnePlus')" /></SfListItem></a>
                  <a href="/telefoner/smartphones/sony"><SfListItem><SfMenuItem :label="$t('Sony')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Smartphones">
                <SfList>
                  <a href="/telefoner/smartphones/motorola"><SfListItem><SfMenuItem :label="$t('Motorola')" /></SfListItem></a>
                  <a href="/telefoner/smartphones/google-pixel"><SfListItem><SfMenuItem :label="$t('Google Pixel')" /></SfListItem></a>
                  <a href="/telefoner/smartphones/xiaomi"><SfListItem><SfMenuItem :label="$t('Xiaomi')" /></SfListItem></a>
                  <a href="/telefoner/smartphones"><SfListItem><SfMenuItem :label="$t('All Smartphones')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Smartphones">
                <SfList>
                  <a href="/telefoner/telefon-tilbehoer"><SfListItem><SfMenuItem :label="$t('Smartphone Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
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
              <SfMegaMenuColumn title="Tablets">
                <SfList>
                  <a href="/tablets/ipads/"><SfListItem><SfMenuItem :label="$t('Apple iPads')" /></SfListItem></a>
                  <a href="/tablets/android"><SfListItem><SfMenuItem :label="$t('Android Tablets')" /></SfListItem></a>
                  <a href="/tablets/windows"><SfListItem><SfMenuItem :label="$t('Windows Tablets')" /></SfListItem></a>
                  <a href="/tablets"><SfListItem><SfMenuItem :label="$t('All Tablets')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Tablets">
                <SfList>
                  <a href="/tablets/tilbehoer"><SfListItem><SfMenuItem :label="$t('Tablet Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/computere"
            class="custom-link"
          >{{ $t("COMPUTERS") }}</a>
          <div class="dropdown computers">
            <SfMegaMenu
              title="Computers"
              visible
            >
              <SfMegaMenuColumn title="Computers">
                <SfList>
                  <a href="/computere/laptops/apple/macbooks"><SfListItem><SfMenuItem :label="$t('Apple MacBooks')" /></SfListItem></a>
                  <a href="/computere/desktops/apple"><SfListItem><SfMenuItem :label="$t('Apple Desktops')" /></SfListItem></a>
                  <a href="/computere/laptops/windows/"><SfListItem><SfMenuItem :label="$t('Windows Laptops')" /></SfListItem></a>
                  <a href="/computere/stationaere/windows-stationaere"><SfListItem><SfMenuItem :label="$t('Windows Desktops')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Computers">
                <SfList>
                  <a href="/computere/gaming-pc/gaming-stationaer"><SfListItem><SfMenuItem :label="$t('Gaming Desktops')" /></SfListItem></a>
                  <a href="/computere/gaming-pc/gaming-baerbar"><SfListItem><SfMenuItem :label="$t('Gaming Laptops')" /></SfListItem></a>
                  <a href="/computere/computer-tilbehoer"><SfListItem><SfMenuItem :label="$t('Computer Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/andre"
            class="custom-link"
          >{{ $t("Other Products") }}</a>
          <div class="dropdown other-products">
            <SfMegaMenu
              title="Other Products"
              visible
            >
              <SfMegaMenuColumn title="Other Products">
                <SfList>
                  <a href="/smartwatches"><SfListItem><SfMenuItem :label="$t('Smartwatches')" /></SfListItem></a>
                  <a href="/tv-og-lyd"><SfListItem><SfMenuItem :label="$t('TV & Sound')" /></SfListItem></a>
                  <a href="/kamera-og-billede"><SfListItem><SfMenuItem :label="$t('Camera & Photo')" /></SfListItem></a>
                  <a href="/konsoller"><SfListItem><SfMenuItem :label="$t('Consoles')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
            </SfMegaMenu>
          </div>
        </div>
        <div class="dropdown-wrap">
          <a
            href="/tilbehoer"
            class="custom-link"
          >{{ $t("Accessories") }}</a>
          <div class="dropdown accessories">
            <SfMegaMenu
              title="Accessories"
              visible
            >
              <SfMegaMenuColumn title="Accessories">
                <SfList>
                  <a href="/telefoner/iphones/iphone-tilbehoer"><SfListItem><SfMenuItem :label="$t('iPhone Accessories')" /></SfListItem></a>
                  <a href="/telefoner/telefon-tilbehoer"><SfListItem><SfMenuItem :label="$t('Smartphone Accessories')" /></SfListItem></a>
                  <a href="/computere/computer-tilbehoer"><SfListItem><SfMenuItem :label="$t('Computer Accessories')" /></SfListItem></a>
                  <a href="/konsoller/konsol-tilbehoer"><SfListItem><SfMenuItem :label="$t('Consoles Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn title="Accessories">
                <SfList>
                  <a href="/tv-og-lyd/tilbehoer"><SfListItem><SfMenuItem :label="$t('TV & Sound Accessories')" /></SfListItem></a>
                </SfList>
              </SfMegaMenuColumn>
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

<style scoped lang="scss">
@import url("~/assets/css/greenTopbarTertiary.scss");
</style>
