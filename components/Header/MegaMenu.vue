<template>
  <SfMegaMenu
    ref="megaMenu"
    :visible="isVisible"
    :is-absolute="isAbsolute"
  >
    <SfMegaMenuColumn v-show="isOpened('iphones')" title="iPhones">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone 13 Series')" link="/telefoner/iphones/iphone-13" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone 12 Series')" link="/telefoner/iphones/iphone-12" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone SE 2020')" link="/telefoner/iphones/iphone-se-2020" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone 11 Series')" link="/telefoner/iphones/iphone-11" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Xs')" link="/telefoner/iphones/iphone-xs" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Xr')" link="/telefoner/iphones/iphone-xr" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone X')" link="/telefoner/iphones/iphone-x" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone 8')" link="/telefoner/iphones/iphone-8" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('All iPhones')" link="/telefoner/iphones" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Accessories')" link="/telefoner/iphones/iphone-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('smartphones')" title="Smartphones">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Samsung Galaxy')" link="/telefoner/smartphones/samsung-galaxy" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Huawei')" link="/telefoner/smartphones/huawei" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('OnePlus')" link="/telefoner/smartphones/oneplus" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Sony')" link="/telefoner/smartphones/sony" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Motorola')" link="/telefoner/smartphones/motorola" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Google Pixel')" link="/telefoner/smartphones/google-pixel" />
        </SfListItem>
        <!-- <nuxt-link to="/telefoner/smartphones/xiaomi">
                    <SfListItem><SfMenuItem :label="$t('Xiaomi')" /></SfListItem>
                  </nuxt-link> -->
        <SfListItem>
          <SfMenuItem :label="$t('All Smartphones')" link="/telefoner/smartphones" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Smartphone Accessories')" link="/telefoner/telefon-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('tablets')" title="Tablets">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Apple iPads')" link="/tablets/ipads/" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Android Tablets')" link="/tablets/android" />
        </SfListItem>
        <!-- <nuxt-link to="/tablets/windows">
                    <SfListItem><SfMenuItem :label="$t('Windows Tablets')" /></SfListItem>
                  </nuxt-link> -->
        <nuxt-link to="/tablets">
          <SfListItem><SfMenuItem :label="$t('All Tablets')" /></SfListItem>
        </nuxt-link>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Tablet Accessories')" link="/tablets/tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('computers')" title="Computers">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Apple MacBooks')" link="/computere/baerbare/apple-macbooks" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Apple Desktops')" link="/computere/apple-stationaere" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Windows Laptops')" link="/computere/baerbare/windows-baerbare" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Windows Desktops')" link="/computere/stationaere/windows-stationaere" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Gaming Desktops')" link="/computere/gaming-pc/gaming-stationaer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Gaming Laptops')" link="/computere/gaming-pc/gaming-baerbar" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Computer Accessories')" link="/computere/computer-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('other')" title="Other Products">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('Smartwatches')" link="/smartwatches" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('TV & Sound')" link="/tv-og-lyd" />
        </SfListItem>
        <!-- <nuxt-link to="/kamera-og-billede">
                    <SfListItem><SfMenuItem :label="$t('Camera & Photo')" /></SfListItem>
                  </nuxt-link> -->
        <SfListItem>
          <SfMenuItem :label="$t('Consoles')" link="/konsoller" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn v-show="isOpened('accessories')" title="Accessories">
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Accessories')" link="/telefoner/iphones/iphone-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Smartphone Accessories')" link="/telefoner/telefon-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Computer Accessories')" link="/computere/computer-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Consoles Accessories')" link="/konsoller/konsol-tilbehoer" />
        </SfListItem>
      </SfList>
      <SfList>
        <SfListItem>
          <SfMenuItem :label="$t('TV & Sound Accessories')" link="/tv-og-lyd/tilbehoer" />
        </SfListItem>
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
