<template>
    <div
    class="sf-div--email"
    >
    <SfInput
    class="sf-input--outline sf-input--email" 
    type="type"
    :placeholder="inputPlaceholder"
    />
    <SfButton class="sf-button--email">{{ buttonPlaceholder }}</SfButton>
    </div>
</template>

<script>
import { SfInput, SfButton } from '@storefront-ui/vue'
export default {
    props: {
        inputPlaceholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        buttonPlaceholder: {
            type: String,
            default: ''
        }
    },
    components: {
        SfInput,
        SfButton
    }
};
</script>

<style lang="scss" scoped>
.sf-div--email {
    display: flex;
    height: 32px;
    margin-top: 22px;
    width:fit-content;
}
.sf-input--email {
    border-radius: 40px;
    width: 343px;
    min-height: auto;
    font-size: 16px;
    color: #43464E;
    background-color: #F1F2F3;
    --input-border: none;
    --input-bar-display: none;
}
.sf-button--email {
    border-radius: 40px;
    width: 116px;
    transform: translate(-95%) scale(0.8, 0.8);
    --button-background: #7BA393
}
.sf-button--email:hover{
    --button-background: #78A886;
    --button-box-shadow-opacity: 0.25;
    --button-background: #78A886 radial-gradient(circle, transparent 1%, #32463D 1%) center/15000%;
}
.sf-button--email:active {
    --button-box-shadow: none;
    --button-background: #32463D radial-gradient(circle, transparent 40%, #78A886 1%) center/15000%;
    --button-transition: background 0s ;
    --button-text-decoration: none;
  background-size: 100%;
}
</style>