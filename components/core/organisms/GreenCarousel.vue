<template>
  <SfCarousel
  :style="{maxWidth: '1312px', margin: 'auto'}"
  :settings="{type: 'carousel',
  rewind: true,
  perView: 4,
  slidePerPage: true,
  gap: 16,
  breakpoints: {
    1279: {
      perView: 2,
      peek: {
        before: 0,
        after: 50
      }
    }
  }}"
  >
    <SfCarouselItem
    v-for="(item, i) in item"
    :key="i"
    >
    <div class="carousel-item">
        <div>
        <SfImage
        :key="item"
        :src="require('/assets/images/carousel/'+item+'.svg')"
        :alt="item"
        width="136"
        height="266"
        class="carousel-image"
        />
        </div>
        <div class="carousel-item__title">
            {{ item }}
        </div>
        <div>
            <div class="carousel-item__features" v-if="feature1[i] != undefined && feature2[i] != undefined">
                {{ feature1[i] + ' | ' + feature2[i]}}
            </div>
            <div class="carousel-item__features" v-else-if="feature1[i] == undefined && feature2[i] != undefined">
                {{ "unspecified" + ' | ' + feature2[i]}}
            </div>
            <div class="carousel-item__features" v-else-if="feature1[i] != undefined && feature2[i] == undefined">
                {{ feature1[i] + ' | ' + "unspecified"}}
            </div>
            <div class="carousel-item__features" v-else>
                {{ "unspecified" + ' | ' + "unspecified"}}
            </div>
        </div>
        <div class="carousel-item-price__wrapper">
            <div class="carousel-item-bfr__price">
                {{ $t('Fra') }}
            </div>
            <div class="carousel-item__price">
                {{ price[i]+currency }}
            </div>
        </div>
    </div>
    </SfCarouselItem>
  </SfCarousel>
</template>

<script>
import { SfCarousel, SfCarouselItem, SfImage } from '@storefront-ui/vue'
export default {
    components: {
        SfCarousel,
        SfCarouselItem,
        SfImage
    },
    props: {
        item: {
            type: Array,
            default:['']
        },
        feature1: {
            type: Array,
            default:['']
        },
        feature2: {
            type: Array,
            default:['']
        },
        price: {
            type: String,
            default: ''
        },
        currency: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
.carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 493px;
    background-color: #FFFFFF;
    color: #1D1F22;
    border-radius: 10px;
    font-size: 2.5rem;
}
.carousel-item:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.carousel-image {
    transform: translate(25px, -10px);
}
.carousel-item__title {
    display: flex;
    font-family: 'Josefin Sans', sans-serif;
    color: #1D1F22;
    font-size: 26px;
    font-weight: 500;
    // line-height: 24;
}
.carousel-item__features {
    display: flex;
    font-family: 'Josefin Sans', sans-serif;
    color: #72757E;
    font-size: 18px;
    font-weight: 400;
}
.carousel-item-price__wrapper {
display: flex;
flex-direction: row;
padding-top:15px
}
.carousel-item-bfr__price {
    display: flex;
    font-family: 'Josefin Sans', sans-serif;
    color: #1D1F22;
    font-size: 18px;
    font-weight: 400;
    padding-right: 5px;
    margin-bottom: auto;
    margin-top: auto;
}
.carousel-item__price {
    display: flex;
    font-family: 'Josefin Sans', sans-serif;
    color: #1D1F22;
    font-size: 26px;
    font-weight: 500;
}
.sf-carousel__wrapper {
    height: 525px;
}
.glide__track {
    transform: scale(0.98,1);
}
.sf-carousel__controls {
    width: 90%;
    transform: translate(5%, -100%);
}
.sf-button {
    border-radius: 40px;
    background-color: #F1F2F3;
}
.sf-button:hover {
    background-color: #7BA393;
}
.sf-button:active {
    background-color: #43464E;
}
.sf-button__disabled {
    background-color: #F1F2F3;
}
</style>