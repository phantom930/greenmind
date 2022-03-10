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
            :label="$t(item.name)"
            :link="localePath(`${item.slug}/${item.id}`)"
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
            <p class="menu-item_p">
              {{ $t(item) }}
            </p>
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
            {
              name: this.$i18n.t('iPhones'),
              slug: '/c/iphones',
              id: 3
            },
            {
              name: this.$i18n.t('Smartphones'),
              slug: '/c/cell-phones',
              id: 1
            },
            {
              name: this.$i18n.t('Tablets'),
              slug: '/c/tablets',
              id: 96
            },
            {
              name: this.$i18n.t('Computers'),
              slug: '/c/computers',
              id: 99
            },
            {
              name: this.$i18n.t('Accessories'),
              slug: '/c/accessories',
              id: 154
            },
            {
              name: this.$i18n.t('Other products'),
              slug: '/c/other-products',
              id: 138
            }
          ]
        },
        {
          title: 'About us',
          childs: [
            {
              name: this.$i18n.t('Why choose Greenmind?'),
              slug: '/why-greenmind',
              id: ''
            },
            {
              name: this.$i18n.t('How do you sell?'),
              slug: '/how-do-you-sell',
              id: ''
            },
            {
              name: this.$i18n.t('How to buy?'),
              slug: '/how-to-buy',
              id: ''
            },
            {
              name: this.$i18n.t('Reparation'),
              slug: '/reparation',
              id: ''
            },
            {
              name: this.$i18n.t('Blog'),
              slug: '/blog',
              id: ''
            }
          ]
        },
        {
          title: 'Help',
          childs: [
            {
              name: this.$i18n.t('Customer service'),
              slug: '/customer-service',
              id: ''
            },
            {
              name: this.$i18n.t('Shipping and returns'),
              slug: '/shipping-and-returns',
              id: ''
            },
            {
              name: this.$i18n.t('Terms of trade'),
              slug: '/terms-of-trade',
              id: ''
            },
            {
              name: this.$i18n.t('GDPR'),
              slug: '/gdpr',
              id: ''
            },
            {
              name: this.$i18n.t('Cookies'),
              slug: '/cookies',
              id: ''
            },
            {
              name: this.$i18n.t('FAQ'),
              slug: '/faq',
              id: ''
            }
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
            {
              name: this.$i18n.t('Find store'),
              slug: '/stores',
              id: ''
            }
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
