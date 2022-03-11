/* eslint-disable @typescript-eslint/ban-types */
import { Product, Attribute } from '@vue-storefront/odoo-api';

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

export interface GreenProduct extends Product {
    variantAttributeValues: Attribute[]
}
