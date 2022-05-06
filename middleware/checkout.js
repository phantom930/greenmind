const isAuthenticated = (app) => Boolean(app.$cookies.get('odoo-user')) || false;

const cartIsEmpty = (cart) => cart?.order?.websiteOrderLine?.length === 0;

const cartHaveNonPublicShippingAddress = (cart) =>
  cart?.order?.partnerShipping?.id && !cart?.order?.partnerShipping?.name.includes('Public');
const cartHaveNonPublicInvoiceAddress = (cart) =>
  cart?.order?.partnerShipping?.id && !cart?.order?.partnerInvoice?.name.includes('Public');

const validatePersonaDetails = (cart, app) => {
  if (cartIsEmpty(cart)) {
    app.context.redirect('/cart');
  }
  // if (isAuthenticated(app)) {
  //   app.context.redirect('/checkout/shipping');
  // }
};

const validateShipping = (cart, app) => {
  if (cartIsEmpty(cart)) {
    app.context.redirect('/cart');
  }

  // if (!isAuthenticated(app)) {
  //   app.context.redirect('/checkout/personaldetails');
  // }
};

const validateReviewOrder = (cart, app) => {
  validateShipping(cart, app);

  if (!cartHaveNonPublicShippingAddress(cart) && !cartHaveNonPublicInvoiceAddress(cart)) {
    app.context.redirect('/checkout/shipping');
  }
};

const checkout = async ({ app, $vsf }) => {

  const currentPath = app.context.route.fullPath.split('/checkout/')[1];
  if (!currentPath) return;

  const { data } = await $vsf.$odoo.api.cartLoad({ cartLoad: 'greenCartLoad' });
  if (!data) return;

  switch (currentPath) {

    // case 'personaldetails': validatePersonaDetails(data.cart, app);
    //   break;
    // case 'shipping': validateShipping(data.cart, app);
    //   break;
    case 'revieworder': validateReviewOrder(data.cart, app);
      break;

  }
};

export default checkout;
