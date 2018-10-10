import {ObjectIDInjectorService} from './object-i-d-injector.service';

describe('ObjectIDInjectorService', () => {
    let objectIdInjecter: ObjectIDInjectorService<{
        objectID?: string;
        name: string;
        age: number;
    }>;

    beforeEach(() => {
        objectIdInjecter = new ObjectIDInjectorService();
    });

    it('should inject ID in single doc', () => {
        const object = {
            payload: {
                id: 'testid',
                exists: true,
                data: () => ({name: 'Foe', age: 20})
            }
        };
        const injected = objectIdInjecter.injectIntoDoc(object);

        expect(injected.objectID).toEqual('testid');
        expect(injected.name).toEqual('Foe');
        expect(injected.age).toEqual(20);
    });

    it('should inject IDs in multiple docs', () => {
        const objects = [
            {
                payload: {
                    doc: {
                        id: 'id1',
                        data: () => ({name: 'Foe', age: 20})
                    }
                }
            },
            {
                payload: {
                    doc: {
                        id: 'id2',
                        data: () => ({name: 'Bar', age: 50})
                    }
                }
            }
        ];

        const injected = objectIdInjecter.injectIntoCollection(objects);

        expect(injected.length).toBe(2);
        expect(injected[0].objectID).toEqual('id1');
        expect(injected[0].name).toEqual('Foe');
        expect(injected[0].age).toEqual(20);
        expect(injected[1].objectID).toEqual('id2');
        expect(injected[1].name).toEqual('Bar');
        expect(injected[1].age).toEqual(50);
    });
});
