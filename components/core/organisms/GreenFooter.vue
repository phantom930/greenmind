<template>
  <SfFooter
    :multiple="false"
    :column="4"
    class="footer"
  >
    <SfFooterColumn
      :ref="productColumn.title"
      :title="$t(productColumn.title)"
    >
      <SfList>
        <SfListItem
          v-for="(item, indexChild) in productColumn.childs"
          :key="indexChild"
        >
          <SfMenuItem
            :label="$t(item.name)"
            :link="item.slug"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>

    <SfFooterColumn
      v-for="(column, index) in columns"
      :ref="column.title"
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
            :link="{ name: item.slug }"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>

    <SfFooterColumn class="desktop-only">
      <div class="sf-footer-column__title desktop-only sf-heading">
        {{ $t('Shops') }}
      </div>
      <SfList>
        <SfListItem
          v-for="(item, childIndex) in contactColumn.childs"
          :key="childIndex"
        >
          <nuxt-link :to="{ name: item.slug }" :title="$t(item.name)">
            <p class="menu-item_p">
              {{ $t(item.name) }}
            </p>
          </nuxt-link>
        </SfListItem>
      </SfList>

      <div class="sf-footer-column__title desktop-only sf-heading mt-5">
        {{ $t('Contact') }}
      </div>
      <SfList>
        <SfListItem
          v-for="(item, contactIndex) in contactColumn.contactChilds"
          :key="contactIndex"
        >
          <a :href="item.name" :title="$t(item.text)">
            <p class="menu-item_p">
              {{ $t(item.text) }}
            </p>
          </a>
        </SfListItem>
      </SfList>
    </SfFooterColumn>

    <div class="sf-footer-column smartphone-only border-t">
      <div>
        <div class="sf-footer-column__title">
          {{ $t('Social') }}
        </div>
        <div class="flex justify-around">
          <a
            v-for="item in social"
            :key="item.name"
            target="_blank"
            :href="item.url"
          >
            <SfImage
              
              :src="require(`/assets/images/icons/${item.name}.svg`)"
              :alt="item.name"
              :width="32"
              :height="32"
            />
          </a>
        </div>
      </div>
    </div>

    <div class="sf-footer-column smartphone-only flex p-6 justify-between">
      <div class="flex flex-col">
        <span
          v-for="(item, contactIndex) in contactColumn.contactChilds"
          :key="contactIndex"
        >
          {{ $t(item.text) }}
        </span>
      </div>

      <FooterEmailMarketIcons />
    </div>

    <SfFooterColumn
      :title="$t('Social')"
      class="bottom-columns-social desktop-only"
    >
      <div class="footer__socials ">
        <a
          v-for="item in social"
          :key="item.name"
          target="_blank"
          :href="item.url"
        >
          <SfImage
            
            class="footer__social-image mr-1"
            :src="require(`/assets/images/icons/${item.name}.svg`)"
            :alt="item.name"
            :width="32"
            :height="32"
          />
        </a>
      </div>
    </SfFooterColumn>

    <div class="sf-footer-column desktop-only">
      <FooterEmailMarketIcons />
    </div>

    <!--<GreenEmailForm class="col-start-3 col-end-5 " />-->

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

<script lang="ts">
import { SfFooter, SfList, SfMenuItem, SfImage } from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: {
    SfFooter,
    SfList,
    SfMenuItem,
    SfImage
  },
  data() {
    return {
      productColumn: {
        title: 'Product',
        childs: [
          {
            name: 'iPhones',
            slug: '/telefoner/iphones'
          },
          {
            name: 'Smartphones',
            slug: '/telefoner/smartphones'
          },
          {
            name: 'Tablets',
            slug: '/tablets'
          },
          {
            name: 'Computers',
            slug: '/computere'
          }
          // {
          //   name: 'Accessories',
          //   slug: '/tilbehor'
          // },
          // {
          //   name: 'Other products',
          //   slug: '/andre'
          // }
        ]
      },
      columns: [
        {
          title: 'About us',
          childs: [
            {
              name: 'Why choose Greenmind?',
              slug: 'why-greenmind'
            },
            {
              name: 'How do you sell?',
              slug: 'how-to-sell'
            },
            {
              name: 'How to buy?',
              slug: 'how-to-buy'
            },
            {
              name: 'Reparation',
              slug: 'reparation'
            },
            {
              name: 'Stand descriptions',
              slug: 'stand-descriptions'
            },
            {
              name: 'GDPR',
              slug: 'gdpr'
            },
            {
              name: 'Cookies',
              slug: 'cookies'
            },
            {
              name: 'Terms of trade',
              slug: 'terms-of-trade'
            }
            // {
            //  name: 'Environment',
            //  slug: 'environment'
            // },
            // {
            //  name: 'Price guarantee',
            //  slug: 'price-guarantee'
            // }
          ]
        },
        {
          title: 'Help',
          childs: [
            {
              name: 'Customer service',
              slug: 'customer-service'
            },
            {
              name: 'Returnering',
              slug: 'freight-return'
            },

            {
              name: 'Prepare your Android device for submission',
              slug: 'readyAndroidDelivery'
            },
            {
              name: 'Disable Find My iPhone',
              slug: 'disableFindMinIphone'
            },
            {
              name: 'Send your device for repair',
              slug: 'sendDeviceRepair'
            },
            {
              name: 'FAQ',
              slug: 'faq'
            }
          ]
        }
      ],
      contactColumn: {
        title: 'Shops',
        contactChilds: [
          { name: 'Tfl: +45 4697 5050', text: 'Tel: +45 4697 5050' },
          { name: 'mailto: mail@greenmind.dk', text: 'emailSendTo' }
        ],
        childs: [
          {
            name: 'Find store',
            slug: 'shops'
          }
        ]
      },
      social: [
        { name: 'facebook', url: 'https://facebook.com/greenmind.dk' }
        // { name: 'instagram', url: 'https://instagram.com/greenminddk' },
        // { name: 'linkedin', url: 'https://linkedin.com/company/greenminddk' }
      ]
    };
  },
  mounted() {
    this.$refs[this.productColumn.title].isColumnOpen = false;
    this.columns.forEach(element => {
      this.$refs[element.title][0].isColumnOpen = false;
    });
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/footer.scss';
</style>
