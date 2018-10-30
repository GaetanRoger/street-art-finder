import {TestBed} from '@angular/core/testing';

import {AddressFromGeopointService} from './address-from-geopoint.service';
import {HttpClientModule} from '@angular/common/http';
import {Geopoint} from '../../../../shared/types/geopoint';

describe('Address From Geopoint Service', () => {
    let service: AddressFromGeopointService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AddressFromGeopointService]
        });
        service = TestBed.get(AddressFromGeopointService);
    });

    it('should get Lyon, Rue Saint Jean from coords 45.76282, 4.82779', async (done: DoneFn) => {
        const geopoint: Geopoint = {latitude: 45.76282, longitude: 4.82779};

        const address = await service.get(geopoint);

        expect(address.country).toEqual('France');
        expect(address.state).toEqual('Auvergne-Rhône-Alpes');
        expect(address.city).toEqual('Lyon');
        expect(address.cityDistrict).toEqual('Lyon 5e Arrondissement');
        expect(address.postcode).toEqual('69005');
        expect(address.displayName).toEqual('34, Rue Saint-Jean, Saint-Jean, Vieux Lyon, Lyon 5e Arrondissement, Lyon, Métropole de Lyon, Circonscription départementale du Rhône, Auvergne-Rhône-Alpes, France métropolitaine, 69005, France');

        done();
    });

    it('should get Villeurbanne from coords 45.7809, 4.8759', async (done: DoneFn) => {
        const geopoint: Geopoint = {latitude: 45.7809, longitude: 4.8759};

        const address = await service.get(geopoint);

        expect(address.country).toEqual('France');
        expect(address.state).toEqual('Auvergne-Rhône-Alpes');
        expect(address.city).toEqual('Villeurbanne');
        expect(address.cityDistrict).toBeUndefined();
        expect(address.postcode).toEqual('69100');
        expect(address.displayName).toEqual('Résidence Einstein, Avenue Albert Einstein, Croix-Luizet, Villeurbanne, Lyon, Métropole de Lyon, Circonscription départementale du Rhône, Auvergne-Rhône-Alpes, France métropolitaine, 69100, France');

        done();
    });

    it('should get Panissières from coords 45.8115, 4.3423', async (done: DoneFn) => {
        const geopoint: Geopoint = {latitude: 45.8115, longitude: 4.3423};

        const address = await service.get(geopoint);

        expect(address.country).toEqual('France');
        expect(address.state).toEqual('Auvergne-Rhône-Alpes');
        expect(address.city).toBeUndefined();
        expect(address.cityDistrict).toBeUndefined();
        expect(address.postcode).toEqual('42360');
        expect(address.displayName).toEqual('Panissières, Montbrison, Loire, Auvergne-Rhône-Alpes, France métropolitaine, 42360, France');

        done();
    });
});
