import { Component, OnChanges, SimpleChange,
    Input, Output, EventEmitter, ViewChild, Pipe, PipeTransform } from '@angular/core';

import { ComboboxService } from '../service/combobox.service';

@Pipe({ name: 'cusTranslate', pure: false })
export class CustomTranslatePipe implements PipeTransform {
    private result: string;
    private oldValue: string;

    transform(value, service: ComboboxService) {
        if (value !== this.oldValue && !service.isLoading) {
            this.oldValue = value;
            this.result = '';
            service.getItems({}).then(res => {
                this.result = this.getTranslation(service, res, value);
            });
        }

        return this.result;
    }

    private getTranslation(service: ComboboxService, items: any[], value: any): string {
        let mthis = this;
        let res = '';
        items.forEach(item => {
            if (service.getValue(item) == value) {
                res = service.getLabel(item);
            }
        });

        return res;
    }
}