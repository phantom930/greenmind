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

<style lang="scss">
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
</style>