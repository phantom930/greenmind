<template>
  <SfHero>
    <SfHeroItem
    title="Colorful summer dresses are already in store"
    buttonText="SE MERE"
    background="#ECEFF1"
    :image="require('/assets/images/banner/'+hero_image+'.svg')"
    />
    <SfHeroItem
    title="Colorful summer dresses are already in store"
    buttonText="SE MERE"
    background="#ECEFF1"
    image="/assets/storybook/SfHero/hero.png"
    />
    <SfHeroItem
    title="Colorful summer dresses are already in store"
    buttonText="SE MERE"
    background="#ECEFF1"
    image="/assets/storybook/SfHero/hero.png"
    />
  </SfHero>
    
</template>

<script>
import { SfHero } from '@storefront-ui/vue'
export default {
    components: {
        SfHero
    },
    props: {
        hero_image: {
            type: String,
            default: ''
        }
    }
}
</script>