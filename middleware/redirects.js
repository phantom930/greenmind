export default async ({ app, redirect }) => {

  const redirects = app.context.$config.redirects;
  const currentPath = app.context.route.fullPath;
  const route = redirects.find(item => item.from === currentPath);

  if (route) {
    redirect(301, route.to);
  }
};

