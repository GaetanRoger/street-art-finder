import {Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatSelectionList} from '@angular/material';

@Pipe({
    name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

    constructor(private readonly datePipe: DatePipe) {
    }

    transform(value: number, args?: any): string | null {
        return this.datePipe.transform(new Date(Number(value)), args);
    }

}
