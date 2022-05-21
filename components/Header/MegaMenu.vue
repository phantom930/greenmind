<template>
  <SfMegaMenu
    ref="megaMenu"
    :visible="isVisible"
    :is-absolute="isAbsolute"
  >
    <SfMegaMenuColumn v-show="isOpened('iphones')" title="iPhones">
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
      <SfList>
        <nuxt-link to="/telefoner/iphones">
          <SfListItem><SfMenuItem :label="$t('All iPhones')" /></SfListItem>
        </nuxt-link>
        <nuxt-link to="/telefoner/iphones/iphone-tilbehoer">
          <SfListItem><SfMenuItem :label="$t('iPhone Accessories')" /></SfListItem>
        </nuxt-link>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('smartphones')" title="Smartphones">
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
      <SfList>
        <nuxt-link to="/telefoner/telefon-tilbehoer">
          <SfListItem><SfMenuItem :label="$t('Smartphone Accessories')" /></SfListItem>
        </nuxt-link>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('tablets')" title="Tablets">
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
      <SfList>
        <nuxt-link to="/tablets/tilbehoer">
          <SfListItem><SfMenuItem :label="$t('Tablet Accessories')" /></SfListItem>
        </nuxt-link>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('computers')" title="Computers">
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

    <SfMegaMenuColumn v-show="isOpened('other')" title="Other Products">
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

    <SfMegaMenuColumn v-show="isOpened('accessories')" title="Accessories">
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
      <SfList>
        <nuxt-link to="/tv-og-lyd/tilbehoer">
          <SfListItem><SfMenuItem :label="$t('TV & Sound Accessories')" /></SfListItem>
        </nuxt-link>
      </SfList>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from '@nuxtjs/composition-api';
import { SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    isAbsolute: {
      type: Boolean,
      default: false
    },
    currentOpened: {
      type: String,
      default: ''
    }
  },
  emits: ['bar-active'],
  setup (props, { root, emit }) {
    const isOpened = (title: string) : boolean => (title === props.currentOpened) || root.$device.isMobile;
    const megaMenu = ref(null);

    const menuBar = computed(() => megaMenu.value?.$children?.[0]);
    const barIsActive = computed(() => megaMenu.value?.$data.active);

    watch(
      () => barIsActive.value,
      () => {
        if (!barIsActive.value) {
          emit('bar-active', false);
          return menuBar.value.$el.style.display = 'none';
        }
        emit('bar-active', true);
        return menuBar.value.$el.style.display = 'flex';
      }
    );

    return {
      barIsActive,
      megaMenu,
      isOpened
    };
  }

});
</script>
<style scoped lang="scss">

</style>
