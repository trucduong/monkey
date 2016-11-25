import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cusNumber'})
export class CustomNumberPipe implements PipeTransform {
    transform(value, options) {
        if (options['separated']) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return value;
    }
}