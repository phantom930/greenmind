<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="shipping__addresses flex-wrap"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        class="shipping__address"
        :name="`${userShippingGetters.getId(shippingAddress)}`"
      >
        <UserShippingAddress :address="shippingAddress" />
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      v-show="currentAddressId"
      :selected="value"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping__setAsDefault"
      @change="$emit('input', $event)"
    />
  </div>
</template>

<script>
import { SfCheckbox, SfAddressPicker } from '@storefront-ui/vue';
import { userShippingGetters } from '@vue-storefront/odoo';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  props: {
    currentAddressId: {
      type: [String, Number],
      required: true
    },
    addresses: {
      type: [Array, Object],
      default: () => ([])
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  emits: ['setCurrentAddress'],
  setup(props, { emit }) {
    const setCurrentAddress = (addressId) => {
      const selectedAddress = userShippingGetters.getAddresses(
        props.addresses,
        { id: Number.parseInt(addressId, 10) }
      );
      if (!selectedAddress) {
        return;
      }
      emit('setCurrentAddress', selectedAddress[0]);
    };
    const shippingAddresses = computed(() =>
      userShippingGetters.getAddresses(props.addresses)
    );

    return {
      setCurrentAddress,
      shippingAddresses,
      userShippingGetters
    };
  }
};
</script>

<style lang="scss" scoped>

::v-deep .shipping__address{
  border-radius: 14px;
}
.shipping {
  &__address {
    margin-bottom: var(--spacer-base);
    @include for-desktop {
      margin-right: var(--spacer-sm);
    }
  }
  &__addresses {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      display: flex;
      width: 100%;
    }
  }
  &__setAsDefault {
    margin-bottom: var(--spacer-xl);
  }
}
.sf-divider,
.form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
