const createUpdatePartner = require('./createUpdatePartner');
const getPaymentAcquirerList = require('./getPaymentAcquirerList');
const applyGiftCard = require('./applyGiftCard');
const applyCoupon = require('./applyCoupon');
const cartLoadWithUpdate = require('./cartLoadWithUpdate');
const makeGiftCardPayment = require('./makeGiftCardPayment');

module.exports = {
  createUpdatePartner,
  getPaymentAcquirerList,
  applyGiftCard,
  applyCoupon,
  makeGiftCardPayment,
  cartLoadWithUpdate
};
