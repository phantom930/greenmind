<template>
  <div class="perks">
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/clock.svg')">
      <p class="label">
        Faster<br>checkout
      </p>
    </div>
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/coins.svg')">
      <p class="label">
        Earn credits with every<br>
        purchase
      </p>
    </div>
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/award.svg')">
      <p class="label">
        Full rewards program<br>
        benefits
      </p>
    </div>
    <div class="perk perk-favourite">
      <img
        :src="require('/assets/images/personaldetails/favourites.svg')"
      >
      <p class="label">
        Manage your wishlist
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  }
});
</script>
