import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

    constructor(private readonly datePipe: DatePipe) {
    }

    transform(value: number, args?: any): string | null {
        const digits = value.toString().length;
        const timestamp = digits === 10 ? Number(value) * 1000 : Number(value);

        console.log('value', value, 'digits', digits, 'timestamp', timestamp);
        return this.datePipe.transform(new Date(timestamp), args);
    }

}
