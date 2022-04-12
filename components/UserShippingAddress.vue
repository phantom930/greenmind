<template>
  <div>
    <p :style="userShippingAddress.isDefault ? 'font-weight: bold;' : ''">
      {{ userShippingAddress.name }}
    </p>
    <p>
      {{ userShippingAddress.street }}, {{ userShippingAddress.streetNumber }}
    </p>

    <p>
      {{ userShippingAddress.city }}
      {{ userShippingAddress.postalCode }}
    </p>

    <p>{{ userShippingAddress.country }}</p>
    <p
      v-if="userShippingAddress.phone"
      class="phone"
    >
      {{ userShippingAddress.phone }}
    </p>
  </div>
</template>

<script>
import { toRef, computed } from '@nuxtjs/composition-api';
import { userShippingGetters } from '@vue-storefront/odoo';
export default {
  name: 'UserShippingAddress',
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const userShippingAddress = computed(() => ({
      name: props.address?.name || '',
      street: userShippingGetters.getStreetName(props.address),
      streetNumber: userShippingGetters.getApartmentNumber(props.address),
      postalCode: userShippingGetters.getPostCode(props.address),
      city: userShippingGetters.getCity(props.address),
      country: userShippingGetters.getCountry(props.address),
      phone: userShippingGetters.getPhone(props.address),
      isDefault: userShippingGetters.isDefault(props.address)
    }));

    return {
      userShippingAddress
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.phone {
  margin-top: var(--spacer-base);
}

</style>
