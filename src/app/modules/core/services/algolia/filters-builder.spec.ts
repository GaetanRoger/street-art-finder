import {FiltersBuilder} from './filters-builder';

describe('Algolia filters builder tester', () => {
    it('should build filters', () => {
        const filters = new FiltersBuilder()
            .add('filter1', 'value1')
            .add('filter2', 'value2')
            .add('filter3', 'value3', true)
            .add('filter4', 'value4', false)
            .build();

        expect(filters).toEqual('filter1:value1 AND filter2:value2 AND filter3:value3');
    });
});