<template>
  <SfFooter :column="4" multiple class="footer">
    <SfFooterColumn :title="$t('Product')">
      <SfList>
        <SfListItem v-for="item in produkter" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('')">
      <SfList>
        <SfListItem v-for="item in OmOs" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('')">
      <SfList>
        <SfListItem v-for="item in hjaelp" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('')">
      <SfList>
        <SfListItem v-for="item in butikker" :key="item">
          <SfMenuItem :label="$t(item)" />
        </SfListItem>
      </SfList>
      <SfFooterColumn :title="$t('Contact')">
        <SfList>
          <SfListItem v-for="item in kontakt" :key="item">
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
    </SfFooterColumn>
    <SfFooterColumn title="Social" class="bottom-columns-social">
      <div class="footer__socials">
        <SfImage
          class="footer__social-image"
          v-for="item in social"
          :key="item"
          :src="require('/assets/images/icons/' + item + '.svg')"
          :alt="item"
          :width="32"
          :height="32"
        >
        </SfImage>
      </div>
    </SfFooterColumn>
    <SfFooterColumn class="bottom-columns-emarket">
      <SfImage
        class="footer__social-image"
        :src="require('/assets/images/footer/emarket.svg')"
        alt="emarket"
        :width="58"
        :height="58"
      >
      </SfImage>
      <SfImage
        class="footer__social-image"
        :src="require('/assets/images/footer/emarket.svg')"
        alt="emarket"
        :width="58"
        :height="58"
      >
      </SfImage>
      <SfImage
        class="footer__social-image"
        :src="require('/assets/images/footer/emarket.svg')"
        alt="emarket"
        :width="58"
        :height="58"
      >
      </SfImage>
    </SfFooterColumn>
    <SfFooterColumn> </SfFooterColumn>
    <SfFooterColumn class="bottom-columns-email">
      <GreenEmailForm
        :inputPlaceholder="$t('Type your email')"
        type="email"
        :buttonPlaceholder="$t('SUBSCRIBE')"
      />
    </SfFooterColumn>
    <!-- Column with icons missing here -->
  </SfFooter>
</template>

<script>
import {
  SfFooter,
  SfList,
  SfMenuItem,
  SfInput,
  SfButton,
  SfImage,
  SfLink,
} from "@storefront-ui/vue";

export default {
  components: {
    SfFooter,
    SfList,
    SfMenuItem,
    SfInput,
    SfButton,
    SfImage,
    SfLink,
  },
  data() {
    return {
      produkter: [
        this.$i18n.t("iPhones"),
        this.$i18n.t("Smartphones"),
        this.$i18n.t("Tablets"),
        this.$i18n.t("Computer"),
        this.$i18n.t(""),
        this.$i18n.t(""),
      ],
      OmOs: [
        this.$i18n.t(""),
        this.$i18n.t(""),
        this.$i18n.t(""),
        this.$i18n.t("Reparation"),
        this.$i18n.t("Blog"),
      ],
      hjaelp: [
        this.$i18n.t(""),
        this.$i18n.t(""),
        this.$i18n.t(""),
        this.$i18n.t(""),
        this.$i18n.t("Cookies"),
        this.$i18n.t("FAQ"),
      ],
      butikker: [this.$i18n.t("Find butik")],
      kontakt: [
        this.$i18n.t("Tlf: 78756535"),
        this.$i18n.t("email: hans@greenmind.dk"),
      ],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  margin-bottom: 3.75rem;
  background-color: #32463d;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
::v-deep .sf-footer {
  @include for-desktop {
    border-top: none;
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
::v-deep .sf-footer-column {
  background-color: #32463d;
  width: 275px;
}
::v-deep .sf-footer-column__title {
  background-color: #32463d;
}
.bottom-columns-email {
  transform: translate(-125px, -80px);
}
.bottom-columns-email .sf-button {
  text-decoration: none;
  font-family: "Josefin Sans", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}
.bottom-columns-social {
  transform: translate(-0px, -80px);
}
.bottom-columns-emarket {
  transform: translate(-0px, -75px);
}
::v-deep .sf-footer-column__title {
  font-family: "Josefin Sans", sans-serif;
  font-size: 18px;
  font-weight: 400;
}
::v-deep .sf-menu-item {
  font-family: "Josefin Sans", sans-serif;
  font-size: 18px;
  font-weight: 400;
}
::v-deep .sf-input--outline input {
  font-family: "Josefin Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: var(--line-height--primary);
}

.footer {
  padding-bottom: 0;
}
</style>
