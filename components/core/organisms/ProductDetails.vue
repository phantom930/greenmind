<template>
    <div class="product-details">
        <div class="link-prices-wrap">
        <div class="links">
            <p>Vælg stand</p>
            <a href="#">Læs mere</a>
        </div>
        <div class="prices-wrap">
            <a href="#" class="price-discount-wrap">
                <div class="price-wrap">
                    <p>Ny vare</p>
                    <div class="price">2.395,-</div>
                </div>
                <div class="discount">2.989,-</div>
            </a>
            <a href="#" class="price-discount-wrap">
                <div class="price-wrap">
                    <p>Som ny</p>
                    <div class="price">2.395,-</div>
                </div>
            </a>
            <a href="#" class="price-discount-wrap">
                <div class="price-wrap">
                    <p>Meget flot</p>
                    <div class="price">2.395,-</div>
                </div>
            </a>
            <a href="#" class="price-discount-wrap">
                <div class="price-wrap">
                    <p>Okay</p>
                    <div class="price">2.395,-</div>
                </div>
            </a>
            <a href="#" class="price-discount-wrap">
                <div class="price-wrap">
                    <p>Slidt</p>
                    <div class="price">2.395,-</div>
                </div>
            </a>
        </div>
    </div>
    <div class="description-wrap">
        <div class="title-main">Meget flot</div>
        <p class="description-main">Screen: May have micro-scratches which are not noticeable when<br> the screen is turned on. Body: Has visible scratches and/or dents</p>
    </div>
    <div class="checkbox-title-wrap">
        <div class="title">Tilkøb</div>
        <GreenCheckbox
        title="Screenprotection"
        link_title="Læs mere"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        price="149,-"
        />
        <GreenCheckbox
        title="Adapter"
        link_title=""
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        price="99,-"
        />      
    </div>
    <div class="total-price-buttons">
        <p class="total-price">2.395,-</p>
        <div class="buttons">
            <a href="#" class="add-to-cart">ADD TO CART</a>
            <a href="#" class="status">SE LAGERSTATUS I BUTIK</a>
        </div>
    </div>
    </div>
    
</template>

<script>
  import SfCheckbox from "@storefront-ui/vue";
  export default {
    components: {
      SfCheckbox
    }
  }  
</script>

<style scoped>
.link-prices-wrap .links p {
    color: #1D1F22;
    font-size: 20px;
    font-weight: 500;
}

.link-prices-wrap .links a {
    color: #0468DB;
    border-bottom: 1px solid #0468DB;
    line-height: 12px;
}

.link-prices-wrap .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 185px;
    margin-bottom: 18px;
}

.prices-wrap .price-discount-wrap {
    max-width: 102px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.prices-wrap .price-wrap {
    background: #F1F2F3;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 13px;
    padding-bottom: 13px;
    border-radius: 10px;
    width: 100%;
    text-decoration: none;
}

.prices-wrap .price-discount-wrap:hover .price-wrap {
    background: #7BA393;;
    color: #fff;
    box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
}

.prices-wrap .price-wrap p {
    font-size: 12px;
    font-weight: 500;
}

.price-discount-wrap .discount {
    border-radius: 22px;
    max-width: 80px;
    width: 100%;
    text-align: center;
    background: #32463D;
    color: #fff;
    padding-top: 3px;
    padding-bottom: 3px;
    text-decoration: line-through;
    margin-top: -15px;
}

.prices-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
}

.description-wrap .title-main {
    text-align: end;
    color: #1D1F22;
    margin-bottom: 10px;
}

.description-wrap .description-main {
    font-size: 14px;
    color: #72757E;
    text-align: end;
    padding-bottom: 16px;
    border-bottom: 1px solid #F1F2F3;
    margin-bottom: 26px;
}

.checkbox-title-wrap .title {
    font-size: 20px;
    color: #1D1F22;
    font-weight: 500;
    margin-bottom: 25px;
}

.checkbox-title-wrap {
    padding-bottom: 8px;
    border-bottom: 1px solid #F1F2F3;
    margin-bottom: 40px;
}

.total-price-buttons .total-price {
    font-size: 34px;
    font-weight: 700;
}

.total-price-buttons {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.total-price-buttons .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 280px;
}

.total-price-buttons .buttons .add-to-cart {
    font-size: 14px;
    color: #fff;
    background: #32463D;
    padding-top: 18px;
    padding-bottom: 18px;
    width: 100%;
    border-radius: 100px;
    text-align: center;
    margin-bottom: 8px;
}

.total-price-buttons .buttons .status {
    font-size: 14px;
    color: #fff;
    background: #7BA393;;
    padding-top: 18px;
    padding-bottom: 18px;
    width: 100%;
    border-radius: 100px;
    text-align: center;
}

/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  height: 24px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: 45px;
  width: 100%;;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #43464E;
}

/* On mouse-over, add a grey background color */
/* .container:hover input ~ .checkmark {
  background-color: #ccc;
} */

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #7BA393;
  border: none;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}
</style>
