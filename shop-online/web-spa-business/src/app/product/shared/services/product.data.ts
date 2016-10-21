import { ProductGroup } from '../models/product.group';
import {Product} from '../models/product';
import { Unit } from '../models/unit';


export const PRODUCT_GROUPS: ProductGroup[] = [
    { id: '1', name: 'group 1', status: 'status for product 1', description:'4' },
    { id: '2', name: 'group 2', status: 'status for product 2', description:'4' },
    { id: '3', name: 'group 3', status: 'status for product 3', description:'4' },
    { id: '4', name: 'group 4', status: 'status for product 4' , description:'4'},
    { id: '5', name: 'group 5', status: 'status for product 5' , description:'4'},
    { id: '6', name: 'group 6', status: 'status for product 6' , description:'4'},
    { id: '7', name: 'group 7', status: 'status for product 7' , description:'4'},
    { id: '8', name: 'group 8', status: 'status for product 8' , description:'4'},
    { id: '9', name: 'group 9', status: 'status for product 9', description:'4' },
    { id: '10', name: 'group 10', status: 'status for product 10' , description:'4'},
    { id: '11', name: 'group 11', status: 'status for product 11', description:'4' },
    { id: '12', name: 'group 12', status: 'status for product 12' , description:'4'},
    { id: '13', name: 'group 13', status: 'status for product 13', description:'4' },
    { id: '14', name: 'group 14', status: 'status for product 14', description:'4' },
    { id: '15', name: 'group 15', status: 'status for product 15', description:'4' },
    { id: '16', name: 'group 16', status: 'status for product 16' , description:'4'},
    { id: '17', name: 'group 17', status: 'status for product 17' , description:'4'},
    { id: '18', name: 'group 18', status: 'status for product 18' , description:'4'},
    { id: '19', name: 'group 19', status: 'status for product 19', description:'4' },
    { id: '20', name: 'group 20', status: 'status for product 20' , description:'4'},
    { id: '21', name: 'group 21', status: 'status for product 21' , description:'4'},
    { id: '22', name: 'group 22', status: 'status for product 22' , description:'4'},
    { id: '23', name: 'group 23', status: 'status for product 23', description:'4' },
    { id: '24', name: 'group 24', status: 'status for product 24' , description:'4'},
    { id: '25', name: 'group 25', status: 'status for product 25' , description:'4'},
    { id: '26', name: 'group 26', status: 'status for product 26' , description:'4'},
    { id: '27', name: 'group 27', status: 'status for product 27', description:'4' },
    { id: '28', name: 'group 28', status: 'status for product 28', description:'4' },
    { id: '29', name: 'group 29', status: 'status for product 29' , description:'4'},
    { id: '30', name: 'group 30', status: 'status for product 30', description:'4' },
];

export const PRODUCTS: Product[] = [
    {id: '1', remaining: 100, discount:20, code:'', name: 'hoang',image: '0989',unit: 'si',inputPrice: 1000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '2', remaining: 100,  discount:20,  code:'',  name: 'lan',image: '0903',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '3', remaining: 100,  discount:20,  code:'',  name: 'tuan',image: '0987',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '4', remaining: 100,  discount:20,  code:'',  name: 'hoang',image: '0989',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 20,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '5', remaining: 100,  discount:20,  code:'',  name: 'lan',image: '0903',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '6', remaining: 100,  discount:20,  code:'',  name: 'tuan',image: '0987',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '7', remaining: 100,  discount:20,  code:'',  name: 'hoang',image: '0989',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 20,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '8', remaining: 100,  discount:20,  code:'',  name: 'lan',image: '0903',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'},
    {id: '9', remaining: 100,  discount:20,  code:'',  name: 'tuan',image: '0987',unit: 'si',inputPrice: 10000,wholesalePrice: 20000,retailPrice: 10,group: '17/08/1990',warningRemaining: 10000000,status: '20',description: '0'}
]


export const UNITS: Unit[] = [
    {id:'1', name:'kg',description: 'description 1'},
    {id:'2', name:'chiec',description: 'description 2'},
    {id:'3', name:'cai',description: 'description 3'},

]