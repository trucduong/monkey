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
    total: number;
    totalPrice: number;
    totalDiscount: number;
    details: OrderDetailModel[];
    payments: OrderPaymentModel[];
}

export class OrderDetailModel extends BaseModel {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    remaining: number;
    discount: number;
    price: number;
    total: number;
    description: string;
}

export class OrderPaymentModel extends BaseModel {
    orderId: string;
	createDate: Date;
	total: number;
	employeeName: string;
	customerName: string;
	description: string;

    // options
    received: number;
    rest: number;
    print: boolean;
}