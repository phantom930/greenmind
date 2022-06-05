/* eslint-disable @typescript-eslint/ban-types */
import { Product, AttributeValue, OrderLine, GraphQlProductParam, Order, Cart, PaymentTransaction } from '@vue-storefront/odoo-api';

export declare enum PaymentTransactionState {
    Draft = 'Draft',
    Pending = 'Pending',
    Authorized = 'Authorized',
    Confirmed = 'Confirmed',
    Canceled = 'Canceled',
    Error = 'Error'
}

export enum ButtonType {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
}

export enum ButtonShape {
    Round = 'Round',
    Rectangle = 'Rectangle',
}

export enum ButtonSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    Max = 'Max',
}
export enum ButtonColor {
    Green = 'Green',
    Black = 'Black',
    Grey = 'Grey',
}

export interface CreateUpdatePartnerInput {
    subscribeNewsletter?: boolean
    name: string
    email: string
}

export interface CombinationInfo {
    product_id: number;
    product_template_id: number;
    display_name: string;
    display_image: true;
    price: number;
    list_price: number;
    has_discounted_price: boolean;
    discount: number;
    discount_perc: number;
    grade_name: string;
    slug: string;
    stock_qty: number;
}
export interface CombinationInfoGrade {
    grades: CombinationInfo[];
}

export interface GreenProduct extends Product {
    isInStock?: boolean;
    jsonLd?: any;
    qty?: number;
    variantAttributeValues?: AttributeValue[];
    schemaAttributeValues?: AttributeValue[];
    websiteSubtitle?: string;
    imageFilename?: string;
    combinationInfo?: CombinationInfo;
    combinationInfoGrade?: CombinationInfoGrade;
    combinationInfoVariant?: CombinationInfo;
}
export interface GreenOrderLine extends OrderLine {
    product?: GreenProduct;
    accessories?: GreenOrderLine[]
}

export interface GreenPaymentTransaction extends PaymentTransaction {
    state?: PaymentTransactionState
}
export interface GreenOrder extends Order {
    totalCount?: number,
    lastTransaction?: GreenPaymentTransaction,
    accessoryLines?: GreenOrderLine[];
    orderLines?: GreenOrderLine[];
    websiteOrderLine?: GreenOrderLine[];
}

export interface GreenCart extends Cart {
    order: GreenOrder;
}

export interface GreenGraphQlProductParam extends GraphQlProductParam {
    accessoryToIds: number[]
}

export declare type GreenGraphQlAddMultipleProductsParams = {
    products: GreenGraphQlProductParam[];
};
