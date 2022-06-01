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
