<template>
  <SfFooter
    :multiple="false"
    :column="4"
    class="footer"
  >
    <SfFooterColumn
      v-for="(column, index) in columns"
      :key="index"
      :title="$t(column.title)"
    >
      <SfList>
        <SfListItem
          v-for="(item, indexChild) in column.childs"
          :key="indexChild"
        >
          <SfMenuItem
            :label="$t(item)"
            :link="localePath()"
          />
        </SfListItem>
      </SfList>

      <SfFooterColumn
        v-if="column.contact"
        class="desktop-only"
        :title="$t('Contact')"
      >
        <SfList>
          <SfListItem
            v-for="(item, contactIndex) in column.contactChilds"
            :key="contactIndex"
          >
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
    </SfFooterColumn>

    <div class="sf-footer-column smartphone-only border-t">
      <div>
        <div class="sf-footer-column__title">
          Social
        </div>
        <div class="flex justify-around">
          <SfImage
            v-for="item in social"
            :key="item"
            :src="require('/assets/images/icons/' + item + '.svg')"
            alt="item"
            :width="32"
            :height="32"
          />
        </div>
      </div>
    </div>

    <div class="sf-footer-column smartphone-only flex p-6 justify-between">
      <div class="flex flex-col">
        <span
          v-for="(item, contactIndex) in columns[3].contactChilds"
          :key="contactIndex"
        >
          {{ $t(item) }}
        </span>
      </div>

      <FooterEmailMarketIcons />
    </div>

    <SfFooterColumn
      :title="$t('Social')"
      class="bottom-columns-social desktop-only"
    >
      <div class="footer__socials ">
        <SfImage
          v-for="item in social"
          :key="item"
          class="footer__social-image mr-1"
          :src="require('/assets/images/icons/' + item + '.svg')"
          :alt="item"
          :width="32"
          :height="32"
        />
      </div>
    </SfFooterColumn>

    <div class="sf-footer-column desktop-only">
      <FooterEmailMarketIcons />
    </div>

    <GreenEmailForm class="col-start-3 col-end-5 " />

    <div class="mobile-only mt-12 mb-10 flex justify-center smartphone-only">
      <SfImage
        :width="35"
        :height="35"
        src="/icons/logo.svg"
        alt="Vue Storefront Next"
        class="sf-header__logo-image "
      />
    </div>
  </SfFooter>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfMenuItem,
  SfImage
} from '@storefront-ui/vue';

export default {
  components: {
    SfFooter,
    SfList,
    SfMenuItem,
    SfImage
  },
  data() {
    return {
      columns: [
        {
          title: 'Product',
          childs: [
            this.$i18n.t('iPhones'),
            this.$i18n.t('Smartphones'),
            this.$i18n.t('Tablets'),
            this.$i18n.t('Computer'),
            this.$i18n.t('Accessories'),
            this.$i18n.t('Other products')
          ]
        },
        {
          title: 'About us',
          childs: [
            this.$i18n.t('Why choose Greenmind?'),
            this.$i18n.t('How do you sell?'),
            this.$i18n.t('How to buy?'),
            this.$i18n.t('Reparation'),
            this.$i18n.t('Blog')
          ]
        },
        {
          title: 'Help',
          childs: [
            this.$i18n.t('Customer service'),
            this.$i18n.t('Shipping and returns'),
            this.$i18n.t('Terms of trade'),
            this.$i18n.t('GDPR'),
            this.$i18n.t('Cookies'),
            this.$i18n.t('FAQ')
          ]
        },
        {
          title: 'Shops',
          contact: true,
          contactChilds: [
            this.$i18n.t('Tlf: 78756535'),
            this.$i18n.t('email: hans@greenmind.dk')
          ],
          childs: [
            this.$i18n.t('Find butik')
          ]
        }
      ],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube']
    };
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/css/footer.scss');
</style>
