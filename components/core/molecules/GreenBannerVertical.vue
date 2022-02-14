<template>
<div>
<SfBanner
    :title= banner_title
    :description= banner_description
    :buttonText= banner_button
    :background= background
    :image="require('/assets/images/banner/'+banner_image+'.svg')"
/>
</div>
</template>

<script>
import { SfBanner, SfImage } from '@storefront-ui/vue'
export default {
    components: {
        SfBanner,
        SfImage
    },
    props: {
        banner_title: {
            type: String,
            default: ''
        },
        banner_description: {
            type: String,
            default: ''
        },
        banner_button: {
            type: String,
            default: ''
        },
        banner_image: {
            type: String,
            default: ''
        },
        background: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.sf-banner {
    --banner-width: 386px;
    --banner-height: 660px;
    --banner-justify-content: center;
    --banner-padding: 0 0;
    border-radius: 20px;
    background-size: inherit !important;
    --banner-background-position: 60% 95%;
}
::v-deep .sf-banner__wrapper {
    flex: 0 auto;
    height: 660px;
}
::v-deep .sf-button{
    border-radius: 40px;
    --button-background: #32463D;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    margin-left: auto;
    margin-right: auto;
    margin-top: 64%;
    padding: 18px 52px;
    padding-top: 20px;
}
::v-deep .sf-button:hover{
    --button-background: #78A886;
    --button-box-shadow-opacity: 0.25;
    --button-background: #78A886 radial-gradient(circle, transparent 1%, #BAE8D6 1%) center/15000%;
}
::v-deep .sf-button:active {
    --button-box-shadow: none;
    --button-background: #78A886 radial-gradient(circle, transparent 40%, #BAE8D6 1%) center/15000%;
    --button-transition: background 0s ;
    --button-text-decoration: underline;
    background-size: 100%;
}
::v-deep .sf-banner__title {
    font-family: 'Josefin Sans', sans-serif;
    color: #1D1F22;
    font-size: 34px;
    font-weight: 700;
    line-height: 35px;
    margin-left: auto;
    margin-right: auto;
    text-transform: none;
    padding-top: 15%;
}
::v-deep .sf-banner__description {
    font-family: 'Josefin Sans', sans-serif;
    color: #1D1F22;
    font-size: 18px;
    font-weight: 400;
    text-transform: none;
    padding-top: 5%;
    text-align: center;
    padding: 0 40px;

}
</style>