/* eslint-disable @typescript-eslint/ban-types */
import { Product, AttributeValue, OrderLine, GraphQlProductParam, Order, Cart } from '@vue-storefront/odoo-api';

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
}
export enum ButtonColor {
    Green = 'Green',
    Black = 'Black',
    Grey = 'Grey',
}

export interface CreateUpdatePartnerInput {
    countryId?: string | number
    name: string
    email: string
    phone: string
}

export interface CombinationInfo {
    product_id: number,
    product_template_id: number,
    display_name: string,
    display_image: true,
    price: number,
    list_price: number,
    has_discounted_price: boolean,
    discount: number,
    discount_perc: number
    grade_name: number
}
export interface CombinationInfoGrade {
    grades: CombinationInfo[]
}

export interface GreenProduct extends Product {
    variantAttributeValues?: AttributeValue[],
    websiteSubtitle?: string
    imageFilename?: string
    combinationInfo?: CombinationInfo
    combinationInfoGrade?: CombinationInfoGrade
    combinationInfoVariant?: CombinationInfo
}
export interface GreenOrderLine extends OrderLine {
    product?: GreenProduct;
}
export interface GreenOrder extends Order {
    accessoryLines?: OrderLine[]
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
