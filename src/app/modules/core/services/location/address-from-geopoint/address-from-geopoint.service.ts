import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '../../../../shared/types/address';
import {Geopoint} from '../../../../shared/types/geopoint';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddressFromGeopointService {
    private readonly URL = 'https://nominatim.openstreetmap.org/reverse?format=json&';

    constructor(private readonly http: HttpClient) {
    }

    async get(geopoint: Geopoint): Promise<Address> {
        const response = await this.http
            .get<any>(`${this.URL}lat=${geopoint.latitude}&lon=${geopoint.longitude}`)
            .pipe(take(1))
            .toPromise();

        if (!response || !response.address) {
            return null;
        }

        const address: Address = {
            country: response.address.country,
            city: response.address.city ? response.address.city : response.address.village
        };

        this._addIfExists(address, 'state', response.address.state);
        this._addIfExists(address, 'cityDistrict', response.address.city_district);
        this._addIfExists(address, 'postcode', response.address.postcode);
        this._addIfExists(address, 'displayName', response.display_name);

        return address;
    }

    private _addIfExists(address: Address, fieldName: string, fieldValue: any): void {
        if (fieldValue) {
            address[fieldName] = fieldValue;
        }
    }
}
