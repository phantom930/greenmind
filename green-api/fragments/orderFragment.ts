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

const query = `
order {
  id
  name
  amountTotal
  amountTax
  amountDelivery
  dateOrder
  orderUrl
  lastTransaction
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

module.exports = query;
