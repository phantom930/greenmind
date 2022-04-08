const isAuthenticated = (app) => Boolean(app.$cookies.get('odoo-user')) || false;

const canEnterShipping = (cart) => cart?.order.orderLines?.length > 0 || false;

const canEnterBiling = (cart) => canEnterShipping(cart) && cart?.order.partnerShipping.id;

const canEnterPayment = (cart) => canEnterShipping(cart) && canEnterBiling(cart) && cart?.order.partnerInvoice.id;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const { cart } = await $vsf.$odoo.api.cartLoad();
  console.log(cart);
  if (!cart) return;

  switch (currentPath) {

    case 'personaldetails':
      if (isAuthenticated(app)) {
        console.log('3213');
        app.context.redirect('/checkout/shipping');
      }
      break;

  }
};
