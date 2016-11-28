import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cusNumber'})
export class CustomNumberPipe implements PipeTransform {
    transform(value, options) {
        if (options['separated']) {
            if (value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                return '0';
            }
            
        }
        return value;
    }
}