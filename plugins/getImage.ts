export default ({ app }, inject) : void => {
  const getImage = (imagePath: string) => {
    return `${app.$config.baseURL}${imagePath?.replace('/', '')}`;
  };
  inject('image', getImage);
};
