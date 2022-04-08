const isAuthenticated = (app) => Boolean(app.$cookies.get('odoo-user')) || false;

// const canEnterShipping = (cart) => cart?.order.orderLines?.length > 0 || false;

// const canEnterBiling = (cart) => canEnterShipping(cart) && cart?.order.partnerShipping.id;

// const canEnterPayment = (cart) => canEnterShipping(cart) && canEnterBiling(cart) && cart?.order.partnerInvoice.id;

const checkout = async ({ app, $vsf }) => {

  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const { data } = await $vsf.$odoo.api.cartLoad({ cartLoad: 'greenCartLoad' });
  if (!data) return;

  const cartIsEmpty = data.cart?.order?.websiteOrderLine?.length === 0;

  switch (currentPath) {

    case 'personaldetails':
      if (cartIsEmpty) {
        app.context.redirect('/cart');
      }
      if (isAuthenticated(app)) {
        app.context.redirect('/checkout/shipping');
      }
      break;

    case 'shipping':
      if (cartIsEmpty) {
        app.context.redirect('/cart');
      }
      if (!isAuthenticated(app)) {
        app.context.redirect('/checkout/personaldetails');
      }
      break;

  }
};

export default checkout;
