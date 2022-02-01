<template>
    <SfProductCard
    :image="require('/assets/images/product/'+product_card_image+'.svg')"
    :imageWidth="157"
    :imageHeight="307"
    :alt="product_card_image"
    :showAddToCartButton="false"
    :title= product_card_title
    scoreRating = "false"
    wishlistIcon = "false"
    :regularPrice = product_card_regularPrice
    :specialPrice = product_card_specialPrice
    :link="'/' + product_card_link"
    />
</template>

<script>
import { SfProductCard } from '@storefront-ui/vue'
export default {
    components: {
        SfProductCard
    },
    props: {
        product_card_title: {
            type: String,
            default: ''
        },
        product_card_image: {
            type: String,
            default: ''
        },
        product_card_regularPrice: {
            type: String,
            default: ''
        },
        product_card_specialPrice: {
            type: String,
            default: ''
        },
        product_card_link: {
            type: String,
            default: '#'
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .sf-image {
    transform: translate(35%);
}
::v-deep .sf-product-card__title {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
}
::v-deep .sf-price__regular{
    font-family: 'Josefin Sans', sans-serif;
    font-size: 26px;
    font-weight: 500;
    margin-left: auto;
    margin-right: auto;
}
::v-deep .sf-product-card {
    border-radius: 20px;
}
</style>