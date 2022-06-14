
<template>
  <SfMegaMenu
    ref="megaMenu"
    :visible="isVisible"
    :is-absolute="isAbsolute"
  >
    <SfMegaMenuColumn
      v-show="isOpened('iphones')"
      class="menu-column-iphones"
      title="iPhones"
    >
      <SfList @click.native="handleCloseMenu">
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
      <SfList @click.native="handleCloseMenu">
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
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('All iPhones')" link="/telefoner/iphones" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Accessories')" link="/tilbehoer/iphone-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn
      v-show="isOpened('smartphones')"
      class="menu-column-smartphones"
      title="Smartphones"
    >
      <SfList @click.native="handleCloseMenu">
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
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Motorola')" link="/telefoner/smartphones/motorola" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Google Pixel')" link="/telefoner/smartphones/google-pixel" />
        </SfListItem>
      </SfList>
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('All Smartphones')" link="/telefoner/smartphones" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Smartphone Accessories')" link="/tilbehoer/smartphone-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn
      v-show="isOpened('tablets')"
      class="menu-column-tablets"
      title="Tablets"
    >
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Apple iPads')" link="/tablets/ipads/" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Android Tablets')" link="/tablets/android" />
        </SfListItem>
      </SfList>
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('All Tablets')" link="/tablets" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Tablet Accessories')" link="/tilbehoer/tablet-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn
      v-show="isOpened('computers')"
      class="menu-column-apple"
      title="Computere"
    >
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Apple MacBooks')" link="/computere/baerbare/apple-macbooks" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Apple Desktops')" link="/computere/apple-stationaere" />
        </SfListItem>
      </SfList>
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Windows Laptops')" link="/computere/baerbare/windows-baerbare" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Windows Desktops')" link="/computere/stationaere/windows-stationaere" />
        </SfListItem>
      </SfList>
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Computer Accessories')" link="/tilbehoer/computer-tilbehoer" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn
      v-show="isOpened('other')"
      class="menu-column-others"
      title="Andre produkter"
    >
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Smartwatches')" link="/smartwatches" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('TV & Sound')" link="/tv-og-lyd" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Consoles')" link="/konsoller" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>

    <SfMegaMenuColumn
      v-show="isOpened('accessories')"
      class="menu-column-accessories"
      title="Tilbehør"
    >
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('iPhone Accessories')" link="/tilbehoer/iphone-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Smartphone Accessories')" link="/tilbehoer/smartphone-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Tablet Accessories')" link="/tilbehoer/tablet-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('Computer Accessories')" link="/tilbehoer/computer-tilbehoer" />
        </SfListItem>
      </SfList>
      <SfList @click.native="handleCloseMenu">
        <SfListItem>
          <SfMenuItem :label="$t('Consoles Accessories')" link="/tilbehoer/konsol-tilbehoer" />
        </SfListItem>
        <SfListItem>
          <SfMenuItem :label="$t('TV & Sound Accessories')" link="/tilbehoer/tv-og-lyd" />
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from '@nuxtjs/composition-api';
import { SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

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
  emits: ['bar-active', 'clicked'],
  setup (props, { root, emit }) {

    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);
    const isOpened = (title: string) : boolean => (title === props.currentOpened) || mobileOrTabletSize.value;
    const megaMenu = ref(null);

    const menuBar = computed(() => megaMenu.value?.$children?.[0]);
    const barIsActive = computed(() => megaMenu.value?.$data.active);
    const { toggleHamburguerMenu, isHamburguerMenuOpen } = useUiState();

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

    const handleCloseMenu = () => {
      if (isHamburguerMenuOpen.value) {
        toggleHamburguerMenu();
      }
    };

    return {
      handleCloseMenu,
      barIsActive,
      megaMenu,
      isOpened
    };
  }

});
</script>
<style scoped lang="scss">

</style>
