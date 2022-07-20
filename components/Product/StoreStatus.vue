<template>
  <SfModal
    :visible="isStoreModalOpen"
    class="store-modal"
    @close="toggleStoreModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        title="Find butik"
        @click:close="toggleStoreModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div>
        <div class="block lg:flex items-end">
          <div>
            <SfSearchBar
              placeholder="Type name of the street or city"
              :icon="{ icon: 'marker', size: '1.5rem', color: '#43464E' }"
              class="store-search-bar"
            />
          </div>
          <div>
            <GreenButton
              style-type="Primary"
              color="Green"
              shape="Round"
              size="small"
              class="pickup-store"
            >
              {{ $t("SØG") }}
            </GreenButton>
          </div>
        </div>
        <div class="checkbox-wrap">
          <GreenCheckbox>
            <template #label>
              <p class="label">
                There’s stock on this stores.
              </p>
            </template>
          </GreenCheckbox>
        </div>
        <p class="font-bold , text-base pb-4">
          Stores found: 4
        </p>
        <div class="flex flex-wrap justify-between stores-list">
          <div class="indi-product">
            <div class="flex justify-between relative items-end stores-data">
              <div class="flex items-end">
                <img
                  :src="require('/assets/images/product/store.svg')"
                  width="106"
                  height="141"
                  class="mr-4"
                >
                <div>
                  <p class="text-xl font-medium">
                    Vesterbrogade
                  </p>
                  <p class="text-sm font-normal">
                    Vesterbrogade 84, 1620 Kbh. V
                  </p>
                  <div class="flex items-center font-normal contact-number">
                    <img
                      :src="require('/assets/images/product/phoneIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      8 (020) 302 00 22
                    </p>
                  </div>
                  <div class="flex items-center font-normal contact-email">
                    <img
                      :src="require('/assets/images/product/mailIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      example@email.com
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p class="absolute top-0 right-0 store-distance">
                  2 km away
                </p>
                <div class="bg-gray-200 p-2 rounded-md store-position">
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Måndag—Torsdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Fredag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Lørdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Söndag & Helligdage
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <GreenButton
              style-type="Primary"
              color="Green"
              shape="Round"
              size="small"
              class="my-4 pickup-store"
            >
              {{ $t("Pick Up") }}
            </GreenButton>
          </div>
          <div class="indi-product">
            <div class="flex justify-between relative items-end stores-data">
              <div class="flex items-end">
                <img
                  :src="require('/assets/images/product/store.svg')"
                  width="106"
                  height="141"
                  class="mr-4"
                >
                <div>
                  <p class="text-xl font-medium">
                    Vesterbrogade
                  </p>
                  <p class="text-sm font-normal">
                    Vesterbrogade 84, 1620 Kbh. V
                  </p>
                  <div class="flex items-center font-normal contact-number">
                    <img
                      :src="require('/assets/images/product/phoneIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      8 (020) 302 00 22
                    </p>
                  </div>
                  <div class="flex items-center font-normal contact-email">
                    <img
                      :src="require('/assets/images/product/mailIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      example@email.com
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p class="absolute top-0 right-0 store-distance">
                  2 km away
                </p>
                <div class="bg-gray-200 p-2 rounded-md store-position">
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Måndag—Torsdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Fredag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Lørdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Söndag & Helligdage
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <GreenButton
              style-type="Primary"
              color="Green"
              shape="Round"
              size="small"
              class="my-4 pickup-store"
            >
              {{ $t("Pick Up") }}
            </GreenButton>
          </div>
          <div class="indi-product">
            <div class="flex justify-between relative items-end stores-data">
              <div class="flex items-end">
                <img
                  :src="require('/assets/images/product/store.svg')"
                  width="106"
                  height="141"
                  class="mr-4"
                >
                <div>
                  <p class="text-xl font-medium">
                    Vesterbrogade
                  </p>
                  <p class="text-sm font-normal">
                    Vesterbrogade 84, 1620 Kbh. V
                  </p>
                  <div class="flex items-center font-normal contact-number">
                    <img
                      :src="require('/assets/images/product/phoneIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      8 (020) 302 00 22
                    </p>
                  </div>
                  <div class="flex items-center font-normal contact-email">
                    <img
                      :src="require('/assets/images/product/mailIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      example@email.com
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p class="absolute top-0 right-0 store-distance">
                  2 km away
                </p>
                <div class="bg-gray-200 p-2 rounded-md store-position">
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Måndag—Torsdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Fredag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Lørdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Söndag & Helligdage
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <GreenButton
              style-type="Primary"
              color="Green"
              shape="Round"
              size="small"
              class="my-4 pickup-store"
            >
              {{ $t("Pick Up") }}
            </GreenButton>
          </div>
          <div class="indi-product">
            <div class="flex justify-between relative items-end stores-data">
              <div class="flex items-end">
                <img
                  :src="require('/assets/images/product/store.svg')"
                  width="106"
                  height="141"
                  class="mr-4"
                >
                <div>
                  <p class="text-xl font-medium">
                    Vesterbrogade
                  </p>
                  <p class="text-sm font-normal">
                    Vesterbrogade 84, 1620 Kbh. V
                  </p>
                  <div class="flex items-center font-normal contact-number">
                    <img
                      :src="require('/assets/images/product/phoneIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      8 (020) 302 00 22
                    </p>
                  </div>
                  <div class="flex items-center font-normal contact-email">
                    <img
                      :src="require('/assets/images/product/mailIcon.svg')"
                    >
                    <p class="text-xs ml-1">
                      example@email.com
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p class="absolute top-0 right-0 store-distance">
                  2 km away
                </p>
                <div class="bg-gray-200 p-2 rounded-md store-position">
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Måndag—Torsdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Fredag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Lørdag
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                  <div class="flex justify-between gap-6">
                    <p class="text-xs">
                      Söndag & Helligdage
                    </p>
                    <p class="text-xs">
                      10:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <GreenButton
              style-type="Primary"
              color="Green"
              shape="Round"
              size="small"
              class="my-4 pickup-store"
            >
              {{ $t("Pick Up") }}
            </GreenButton>
          </div>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfBar,
  SfSearchBar
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';

export default {
  name: 'StoreStatus',
  components: {
    SfModal,
    SfBar,
    SfSearchBar
  },
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { isStoreModalOpen, toggleStoreModal } = useUiState();

    return {
      isStoreModalOpen,
      toggleStoreModal
    };
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 25px;
  @include for-mobile {
    margin-bottom: 14px;
    margin-top: 16px;
    justify-content: center;
  }
}

.checkbox-wrap p {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
}

.store-distance {
  color: var(--_c-greenmind-fern-primary-medium-green);
}
.sf-modal {
  &__container {
    @include for-desktop {
      width: 80% !important;
    }
  }
  &__bar {
    font-size: 26px;
    font-weight: 500;
  }
}
.stores-list {
  border-top: 2px solid var(--_c-greenmind-fern-primary-medium-green);
}

.pickup-store {
  @include for-mobile {
    width: 100% !important;
    margin-top: 24px;
  }
}
.indi-product {
  border-bottom: 1px solid var(--c-light);
  padding-top: 1rem;
  width: 48%;
  @include for-mobile {
    width: 100%;
  }
  .stores-data {
    @include for-mobile {
      display: block !important;
    }
    .contact-number {
      margin-top: 1.5rem;
      @include for-mobile {
        margin-top: 0.5rem;
      }
    }
    .contact-email {
      padding-bottom: 0.25rem;
      @include for-mobile {
        padding-bottom: 0;
      }
    }
    .store-position {
      font-weight: 400;
      @include for-mobile {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
  .pickup-store {
    @include for-mobile {
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.sf-bar {
  background-color: white;
}
.store-search-bar {
  width: 400px;
  margin-right: 35px;
  @include for-mobile {
    margin-right: 0;
    width: 100%;
  }
  .sf-input__wrapper {
    flex-direction: row-reverse;
    .sf-input__icon {
      top: 68%;
      right: -20px;
    }
    & input {
      font-size: 20px;
      font-family: "Josefin Sans", sans-serif;
      padding-left: 24px;
      line-height: 10px;
    }
  }
}
.store-modal {
  .sf-modal {
    &__container {
      z-index: 100;
      @include for-desktop {
        width: 90% !important;
        height: auto !important;
      }
      @include for-mobile {
        padding-top: 20px;
      }
    }
    &__content {
      @include for-desktop {
        padding: 40px;
      }
    }
  }
}
</style>
