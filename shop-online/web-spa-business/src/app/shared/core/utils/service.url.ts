export const SERVICES: any = {
    URLS: {
        ref: 'http://localhost:7070/service-common/ref-service',
        product: 'http://localhost:7070/service-catalogue/product',
        product_group: 'http://localhost:7070/service-catalogue/product-group'
    },
    ACTIONS: {
        READ: '/read/{0}',
        READ_BY: 'read-by/{0}/{1}',
        READ_ALL: '/read-all',
        READ_ALL_BY: '/read-all-by/{0}/{1}',
        CREATE: '/create',
        UPDATE: '/update/{0}',
        DELETE: '/delete/{0}',
        READ_CMB: '/read-cmb/{0}'
    }
};