<template>
  <div class="review-order">
      <h3 class="title">Order Details</h3>
      <div class="orders">
          <a href="#" class="order">
              <div class="img-info-wrap">
                  <div class="image-container">
              <img :src="require('/assets/images/revieworder/productimg.jpg')">
              </div>
              <div class="product-info">
                  <div class="product-title">iPhone 8  I  128 GB  I  Space Grey</div>
                  <div class="gadget">+ Screenprotection</div>
                  <div class="gadget">+ Forsikring All Risk</div>
                  <div class="code">MSD23-345-324</div>
              </div>
              </div>
              <div class="costs">
                  <div class="price">2.985,-</div>
                  <p>149,-</p>
                  <p>599,-</p>
              </div>
          </a>
          <a href="#" class="order">
              <div class="img-info-wrap">
                  <div class="image-container">
              <img :src="require('/assets/images/revieworder/productimg.jpg')">
              </div>
              <div class="product-info">
                  <div class="product-title">iPhone 8  I  128 GB  I  Space Grey</div>
                  <div class="gadget">+ Screenprotection</div>
                  <div class="gadget">+ Forsikring All Risk</div>
                  <div class="code">MSD23-345-324</div>
              </div>
              </div>
              <div class="costs">
                  <div class="price">2.985,-</div>
                  <p>149,-</p>
                  <p>599,-</p>
              </div>
          </a>
          <a href="#" class="order">
              <div class="img-info-wrap">
                  <div class="image-container">
              <img :src="require('/assets/images/revieworder/productimg.jpg')">
              </div>
              <div class="product-info">
                  <div class="product-title">iPhone 8  I  128 GB  I  Space Grey</div>
                  <div class="gadget">+ Screenprotection</div>
                  <div class="gadget">+ Forsikring All Risk</div>
                  <div class="code">MSD23-345-324</div>
              </div>
              </div>
              <div class="costs">
                  <div class="price">2.985,-</div>
                  <p>149,-</p>
                  <p>599,-</p>
              </div>
          </a>
      </div>
      <div class="total-price-wrap">
          <div class="subtotal">
          <p>Subtotal:</p>
          <div class="price">5.695,-</div>
          </div>
          <div class="shipping">
              <p>Shipping:</p>
              <p class="price">Free</p>
          </div>
          <div class="total-price">
              <p class="total">Total price:</p>
              <p class="price">5.695,-</p>
          </div>
      </div>
      <div class="checkbox-button-wrap">
          <div class="checkbox-wrap">
                   <GreenCheckboxSecond />
               <p class="label">I agree to <a href="#">Terms and Conditions</a></p>
               </div>
               <button
                class="color-primary sf-button payment-btn"
                :aria-disabled="false"
                :link="null"
                type="button"
                >
                GO TO PAYMENT
                </button>
      </div>
  </div>
</template>


<style scoped>
.review-order {
    margin-bottom: 447px;
}

.review-order .title {
    font-size: 34px;
    font-weight: 700;
    color: #1D1F22;
    padding-top: 40px;
    padding-bottom: 24px;
    border-bottom: 2px solid #7BA393;
}

.orders .order {
    display: flex;
    align-items: flex-start;
    width: 100%;
    justify-content: space-between;
    padding-top: 17px;
    padding-bottom: 7px;
    border-bottom: 1px solid #F1F2F3;
}

.orders .order:hover {
    box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
}

.orders .img-info-wrap {
    display: flex;
    align-items: flex-start;
}

.order .image-container {
    max-width: 82px;
    width: 100%;
    margin-right: 42px;
}

.image-container img {
    width: 100%;
}

.product-info .product-title {
    font-size: 18px;
    font-weight: 400;
    color: #1D1F22;
}

.product-info .gadget {
    color: #43464E;
    font-weight: 400;
    font-size: 16px;
}

.product-info .code {
    color: #72757E;
    font-size: 16px;
    font-weight: 400;
    padding-top: 4px;
}

.order .costs .price {
    color: #1D1F22;
    font-size: 18px;
    font-weight: 400;
}

.order .costs p {
    color: #43464E;
    font-size: 16px;
    font-weight: 400;
}

.order .costs {
    text-align: end;
    padding-right: 8px;
}

.subtotal p {
    font-size: 18px;
    font-weight: 400;
    color: #43464E;
}

.shipping p {
    font-size: 18px;
    font-weight: 400;
    color: #43464E;
}

.total-price-wrap .price {
    color: #1D1F22;
    font-size: 20px;
    font-weight: 700;
}

.total-price .total {
    color: #1D1F22;
    font-size: 20px;
    font-weight: 700;
}

.subtotal, .shipping, .total-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.subtotal {
    padding-top: 26px;
    padding-bottom: 28px;
}

.shipping {
    padding-bottom: 18px;
    border-bottom: 2px solid #7BA393;
}

.total-price {
    padding-top: 16px;
    padding-bottom: 40px;
}

.checkbox-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
}

.checkbox-wrap .label {
    padding-left: 8px;
}

.checkbox-wrap a {
    text-decoration: underline;
}

.payment-btn {
    font-size: 14px;
    background: #32463D;
    color: #fff;
    font-weight: 500;
    border-radius: 100px;
    font-family: "Josefin Sans";
    max-width: 224px;
    width: 100%;
    padding-top: 20px;
}
</style>