export const SERVICES: any = {
    URLS: {
        ref: 'http://localhost:7070/service-common/ref-service',
        resource: 'http://localhost:7070/service-common/resource-service',
        product: 'http://localhost:7070/service-catalogue/product',
        product_group: 'http://localhost:7070/service-catalogue/product-group',
        customer: 'http://localhost:7070/service-partner/customer',
        customer_group: 'http://localhost:7070/service-partner/customer-group',
        supplier: 'http://localhost:7070/service-partner/supplier',
        supplier_group: 'http://localhost:7070/service-partner/supplier-group',
        employee: 'http://localhost:7070/service-partner/employee',
        shop: 'http://localhost:7070/service-shop/shop',
        warehouse: 'http://localhost:7070/service-shop/warehouse',
        user_account: 'http://localhost:7070/service-auth/user-account',
        auth: 'http://localhost:7070/service-auth/auth',
    },
    ACTIONS: {
        READ: '/read/{0}',
        READ_D: '/read-d/{0}',
        READ_BY: 'read-by/{0}/{1}',
        READ_ALL: '/read-all',
        READ_ALL_D: '/read-all-d',
        READ_ALL_BY: '/read-all-by/{0}/{1}',
        CREATE: '/create',
        UPDATE: '/update/{0}',
        UPDATE_D: '/update-d/{0}',
        DELETE: '/delete/{0}',
        READ_CMB: '/read-cmb/{0}',

        DOWNLOAD_PRICES: '/download-prices',
        
        UPLOAD_TEMP: '/upload-temp',
        DOWNLOAD_TEMP: '/download-temp/{0}',
        DELETE_TEMP: '/delete-temp/{0}',

        UPDATE_PERMISSION: '/update-permissions/{0}',
        UPDATE_PASSWORD: '/update-password/{0}',
        READ_ALL_PERMISSION: '/permission/read-all'

    }
};