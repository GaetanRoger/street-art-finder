import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '../../types/address';
import {Geopoint} from '../../types/geopoint';
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

        const address: Address = {
            country: response.address.country,
            city: response.address.city
        };

        if (response.address.state)
            address.state = response.address.state;
        if (response.address.city_district)
            address.cityDistrict = response.address.city_district;
        if (response.address.postcode)
            address.postcode = response.address.postcode;
        if (response.display_name)
            address.displayName = response.display_name;

        return address;
    }
}
