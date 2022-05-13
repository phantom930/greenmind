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
            :link="item.slug"
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
            <a :href="item.name">
              <p class="menu-item_p">
                {{ $t(item.text) }}
              </p>
            </a>
          </SfListItem>
        </SfList>
      </SfFooterColumn>
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
          v-for="(item, contactIndex) in columns[3].contactChilds"
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
      columns: [
        {
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
            },
            {
              name: 'Accessories',
              slug: '/tilbehor'
            },
            {
              name: 'Other products',
              slug: '/andre'
            }
          ]
        },
        {
          title: 'About us',
          childs: [
            {
              name: 'Why choose Greenmind?',
              slug: '/why-greenmind'
            },
            {
              name: 'How do you sell?',
              slug: '/sell-to-us'
            },
            {
              name: 'How to buy?',
              slug: '/how-to-buy'
            },
            {
              name: 'Reparation',
              slug: '/reparation'
            }

            /* {
              name: 'Blog',
              slug: '/blog'
            }*/
          ]
        },
        {
          title: 'Help',
          childs: [
            {
              name: 'Customer service',
              slug: '/customer-service'
            },
            {
              name: 'Shipping and returns',
              slug: '/freight-return'
            },
            {
              name: 'Terms of trade',
              slug: '/terms-of-trade'
            },
            {
              name: 'Cookies',
              slug: '/cookies'
            },
            {
              name: 'FAQ',
              slug: '/faq'
            },
            {
              name: 'GDPR',
              slug: '/gdpr'
            }
          ]
        },
        {
          title: 'Shops',
          contact: true,
          contactChilds: [
            { name: 'Tel: +45 7875 6535', text: 'Tlf: +45 7875 6535' },
            { name: 'mailto: mail@greenmind.dk', text: 'emailSendTo' }
          ],
          childs: [
            {
              name: 'Find store',
              slug: '/shops'
            }
          ]
        }
      ],
      social: [
        { name: 'facebook', url: 'https://www.facebook.com/greenmind.dk' }
        // { name: 'instagram', url: 'https://www.instagram.com/greenminddk/' },
        // { name: 'linkedin', url: 'https://www.facebook.com/greenmind.dk' }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/footer.scss';
</style>
