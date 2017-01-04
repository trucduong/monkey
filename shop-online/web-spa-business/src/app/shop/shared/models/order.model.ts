import { BaseModel } from '../../../shared/index';

export class OrderModel extends BaseModel {
    createDate: Date;
    employeeId: string;
    employeeName: string;
    customerId: string;
    customerName: string;
    description: string;
    status: string;
    paymentStatus: string;
    total: string;
    totalPrice: string;
    totalDiscount: string;
    details: OrderDetailModel[];
}

export class OrderDetailModel extends BaseModel {
    orderId: string;
    pruductId: string;
    pruductName: string;
    remaining: number;
    discount: number;
    prices: number;
    total: number;
    description: string;
}