const coreProductAttribs = `
  id
  name
  image
  imageFilename
  description
  smallImage
  slug
  qty
  status
  price
  websiteSubtitle
`;

module.exports = `
order {
  id
  name
  amountTotal
  amountTax
  amountDelivery
  orderUrl
  stage
  totalCount
  websiteOrderLine {
    id
    name
    accessories{
      id
      product{
        id
      }
    }
    product {
      ${coreProductAttribs}
      combinationInfoVariant
      accessoryProducts{
          id
          name
          description
          image
          price
      }
      
    }
    giftCard {
      id
    }
    coupon {
      id
    }
    quantity
    priceTotal
  }
  accessoryLines{
    id
    name
    product{
      id
    }
  }
  orderLines {  
    id
    name
    product {
      ${coreProductAttribs}
    }
    quantity 
    priceTotal
    giftCard {
      id
    }
    coupon {
      id
    }
  }
  partnerInvoice {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state {
      id
    }
  }
  partner{
    id
    name
    phone
    street
    email
    city
    zip
    company{
      id
      name
    }
  }
  partnerShipping {
    id
    name
    street
    city
    phone
    zip
    country {
      id
    }
    state {
      id
    }
  }
  shippingMethod{
    id
    name
    price
  }
}
`;
