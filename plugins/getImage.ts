export default ({ app }, inject) => {
    const getImage =  (imagePath: string) => {
        //@TODO temporary removing base url until api response was OK
        // return `${app.$config.baseURL}${imagePath?.replace('/', '')}`; 
        return imagePath; 
    }
    inject('image', getImage)
}