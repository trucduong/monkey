export const SERVICES: any = {
    URLS: {
        ref: 'http://localhost:7070/service-monkey/ref-service',
        resource: 'http://localhost:7070/service-monkey/resource-service',
        product: 'http://localhost:7070/service-monkey/product',
        product_group: 'http://localhost:7070/service-monkey/product-group',
        warehouse: 'http://localhost:7070/service-monkey/warehouse',

        customer: 'http://localhost:7070/service-monkey/customer',
        customer_group: 'http://localhost:7070/service-monkey/customer-group',
        supplier: 'http://localhost:7070/service-monkey/supplier',
        supplier_group: 'http://localhost:7070/service-monkey/supplier-group',
        employee: 'http://localhost:7070/service-monkey/employee',

        shop: 'http://localhost:7070/service-monkey/shop',
        
        user_account: 'http://localhost:7070/service-monkey/user-account',
        auth: 'http://localhost:7070/service-monkey/auth'
    },
    ACTIONS: {
        READ: '/read/{0}',
        READ_D: '/read-d/{0}',
        READ_BY: 'read-by/{0}/{1}',
        READ_ALL: '/read-all',
        READ_ALL_REF: '/read-all-ref',
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
        READ_ALL_PERMISSION: '/permission/read-all',

        WAREHOUSE_IMPORT: '/warehouse-import',
        WAREHOUSE_IMPORT_HISTORY: '/warehouse-import-history',

        LOGIN:'/login',
        LOGOUT:'/logout'
    }
};