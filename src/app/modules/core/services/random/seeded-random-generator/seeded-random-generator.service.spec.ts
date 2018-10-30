import {SeededRandomGeneratorService} from './seeded-random-generator.service';

describe('SeededRandomGeneratorService', () => {
    let seededRandomGenerator: SeededRandomGeneratorService;

    beforeEach(() => {
        seededRandomGenerator = new SeededRandomGeneratorService();
    });

    it('should generate the same random for the same seed', () => {
        const seed1Num1 = seededRandomGenerator.generate('seed1');
        const seed1Num2 = seededRandomGenerator.generate('seed1');
        const seed1Num3 = seededRandomGenerator.generate('seed1');
        const seed1Num4 = seededRandomGenerator.generate('seed1');
        const seed1Num5 = seededRandomGenerator.generate('seed1');

        const seed2Num1 = seededRandomGenerator.generate('seed2');
        const seed2Num2 = seededRandomGenerator.generate('seed2');
        const seed2Num3 = seededRandomGenerator.generate('seed2');
        const seed2Num4 = seededRandomGenerator.generate('seed2');
        const seed2Num5 = seededRandomGenerator.generate('seed2');

        expect(seed1Num1).toEqual(seed1Num2);
        expect(seed1Num2).toEqual(seed1Num3);
        expect(seed1Num3).toEqual(seed1Num4);
        expect(seed1Num4).toEqual(seed1Num5);

        expect(seed2Num1).toEqual(seed2Num2);
        expect(seed2Num2).toEqual(seed2Num3);
        expect(seed2Num3).toEqual(seed2Num4);
        expect(seed2Num4).toEqual(seed2Num5);
    });

    it('should generate different numbers for different seeds', () => {
        const seed1 = seededRandomGenerator.generate('seed1');
        const seed2 = seededRandomGenerator.generate('seed2');
        const seed3 = seededRandomGenerator.generate('seed3');
        const seed4 = seededRandomGenerator.generate('seed4');

        expect(seed1).not.toEqual(seed2);
        expect(seed1).not.toEqual(seed3);
        expect(seed1).not.toEqual(seed4);
        expect(seed2).not.toEqual(seed3);
        expect(seed2).not.toEqual(seed4);
        expect(seed3).not.toEqual(seed4);
    });

    it('should generate numbers between 0 and 1', function () {
        const seed1 = seededRandomGenerator.generate('seed1');
        const seed2 = seededRandomGenerator.generate('seed2');
        const seed3 = seededRandomGenerator.generate('seed3');
        const seed4 = seededRandomGenerator.generate('seed4');

        expect(seed1).toBeGreaterThanOrEqual(0);
        expect(seed1).toBeLessThanOrEqual(1);

        expect(seed2).toBeGreaterThanOrEqual(0);
        expect(seed2).toBeLessThanOrEqual(1);

        expect(seed3).toBeGreaterThanOrEqual(0);
        expect(seed3).toBeLessThanOrEqual(1);

        expect(seed4).toBeGreaterThanOrEqual(0);
        expect(seed4).toBeLessThanOrEqual(1);
    });


});
