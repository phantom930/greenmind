<template>
    <div class="billing-details-wrap">
        <h3 class="sf-heading__title h3">Billing details</h3>
        <div class="billing-details-card">
            <p class="name info">Jack Smith</p>
            <p class="address info">Mazowiecka 34</p>
            <p class="number info">02-020</p>
            <p class="city info">Warszawa, Mazowieckie</p>
            <p class="state info">Poland</p>
            <p class="phone info">+48 777 777 777</p>
            <img :src="require('/assets/images/checkout/checkmark.svg')">
        </div>
        <div class="checkbox-button-wrap">
            <div class="checkbox-group">
               <div class="checkbox-wrap">
                   <GreenCheckboxSecond />
               <p class="label">Copy address data from shipping</p>
               </div>
               <div class="checkbox-wrap">
                   <GreenCheckboxSecond />
               <p class="label">I want to generate invoice<br> for the company</p>
               </div>
            </div>
            <button
    class="color-primary sf-button"
    :aria-disabled="false"
    :link="null"
    type="button"
  >
    GO TO REVIEW ORDER
  </button>
        </div>
    </div>

</template>



<style scoped>
.billing-details-wrap {
    padding-top: 66px;
    margin-bottom: 185px;
}

.billing-details-wrap .sf-heading__title {
    padding-bottom: 30px;
}

.billing-details-wrap .billing-details-card {
    max-width: 374px;
    width: 100%;
    border: 1px solid #7BA393;
    border-radius: 14px;
    position: relative;
    padding-top: 21px;
    padding-left: 17px;
    padding-bottom: 21px;
    margin-bottom: 40px;
}

.billing-details-card .info {
    font-size: 18px;
    font-weight: 300;
    font-family: "Josefin Sans";
    color: #43464E;
}

.billing-details-card img {
    position: absolute;
    top: 21px;
    right: 20px;
}

.checkbox-group .checkbox-wrap {
    display: flex;
    align-items: center;
}

.checkbox-wrap .label {
    padding-left: 8px;
}

.checkbox-group {
    display: flex;
    align-items: center;
    max-width: 656px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 40px;
}

.checkbox-button-wrap .sf-button {
    font-size: 14px;
    background: #32463D;
    color: #fff;
    font-weight: 500;
    border-radius: 100px;
    font-family: "Josefin Sans";
    max-width: 267px;
    width: 100%;
    padding-top: 20px;
}
</style>