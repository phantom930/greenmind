/* eslint-disable @typescript-eslint/ban-types */
import { Product, Attribute, OrderLine } from '@vue-storefront/odoo-api';

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
}

export interface GreenProduct extends Product {
    variantAttributeValues: Attribute[],
    websiteSubtitle: string
    combinationInfo: CombinationInfo
}
export interface GreenOrderLine extends OrderLine {
    product?: GreenProduct;
}
