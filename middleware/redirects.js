export default async ({ app, redirect }) => {

  const { default: list } = await import('../helpers/redirects.json');

  const currentPath = app.context.route.fullPath;
  const route = list.find(item => item.from === currentPath);

  if (route) {
    redirect(301, route.to);
  }
};

