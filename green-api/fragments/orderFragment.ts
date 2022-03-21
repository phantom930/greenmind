const coreProductAttribs = `
  id
  name
  image
  description
  smallImage
  slug
  qty
  typeId
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
  stage
  websiteOrderLine {
    id
    name
    product {
      id
      name
      image
      image
      displayName
      websiteSubtitle
      
    }
    quantity
    priceTotal
  }
  orderLines {
    id
    name
    product {
      ${coreProductAttribs}
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
}
`;

module.exports = query;
