<template>
  <SfCheckbox
    name="shipping"
    label="I want to create an account"
    hintMessage=""
    :required="false"
    infoMessage=""
    errorMessage=""
    valid
    :disabled="false"
    :selected="false"
    style="--checkbox-border-radius:100px"
    v-model="checked"
  >
    <div
      slot="label"
    >
    <div class="img-description-wrap">
        <img :src="require('/assets/images/product/productimg.jpg')">
        <div class="description-wrap">
            <div class="title-link">
                <div class="product-title">{{ title }}</div>
                <a href="#">{{ link_title }}</a>
            </div>
            <p class="product-description">{{ description }}</p>
        </div>
    </div>
    <div class="price">{{ price }}</div>
    </div>
  </SfCheckbox>
</template>

<script>
  import { SfCheckbox } from "@storefront-ui/vue";
  import { ref } from "@vue/composition-api";
  export default {
    setup(props) {
      const checked = ref(false)  

      return {
          checked
      }
    },
    components: {
      SfCheckbox
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        link_title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        price: {
            type: String,
            default: ''
        },
    }
  };
</script>

<style scoped>
.img-description-wrap {
    display: flex;
    align-items: center;
    padding-left: 6%;
}
.description-wrap {
    margin-left: 16px;
}
.title-link {
    display: flex;
    align-items: center;
}
.product-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--_c-greenmind-secondary-black);
    margin-right: 16px;
}
.title-link a {
    color: var(--_c-greenmind-primary-blue);
    border-bottom: 1px solid var(--_c-greenmind-primary-blue);
    line-height: 12px;
}
.product-description {
    font-size: 14px;
    font-weight: 400;
    color: var(--_c-greenmind-primary-grey);
    max-width: 285px;
}
.price {
    position: absolute;
    top: 3px;
    right: 0;
    font-size: 20px;
    font-weight: 500;
    color: var(--_c-greenmind-secondary-black);
}
</style>