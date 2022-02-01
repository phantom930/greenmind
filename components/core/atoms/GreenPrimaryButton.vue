<template>
<div>
    <SfButton class="btn_primary__pine">{{ buttonPlaceholder }}</SfButton>
</div>
</template>


<script>
import { SfButton } from '@storefront-ui/vue'
export default {
    props: {
        buttonPlaceholder: {
            type: String,
            default: ''
        }
    },
    components: {
        SfButton
    }
};
</script>


<style lang="scss" scoped>
.btn_primary__pine{
    border-radius: 40px;
    --button-background: #32463D;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 18px 52px;
}
.btn_primary__pine:hover{
    --button-background: #78A886;
    --button-box-shadow-opacity: 0.25;
    --button-background: #78A886 radial-gradient(circle, transparent 1%, #32463D 1%) center/15000%;
}
.btn_primary__pine:active {
    --button-box-shadow: none;
    --button-background: #32463D radial-gradient(circle, transparent 40%, #78A886 1%) center/15000%;
    --button-transition: background 0s ;
    --button-text-decoration: underline;
  background-size: 100%;
}
</style>
