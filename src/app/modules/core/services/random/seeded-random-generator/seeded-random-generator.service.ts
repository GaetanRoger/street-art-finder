import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SeededRandomGeneratorService {

    constructor() {
    }

    generate(seed: string | number, maybeNegative = false): number {
        const numberSeed = this._makeSeedToNumber(seed);

        const x = Math.sin(numberSeed + 1) * 10000;
        const positiveRandom = x - Math.floor(x);

        if (!maybeNegative) {
            return positiveRandom;
        } else {
            const r = this.generate(numberSeed * 2);
            return r < 0.5 ? positiveRandom : -positiveRandom;
        }
    }

    /**
     * Make sure a seed is a number.
     *
     * If the seed is already a number or is a string that can be converted to a number,
     * returns it. If the seed is a string, adds all characters ascii codes together
     * and returns this sum.
     * @param seed
     * @private
     */
    private _makeSeedToNumber(seed: string | number): number {
        if (typeof seed === 'number') {
            return seed;
        }

        const numbered = Number(seed);

        if (!isNaN(numbered)) {
            return numbered;
        }

        let charCodesSum = 0;
        for (let i = 0; i < seed.length; i++) {
            charCodesSum += seed.charCodeAt(i);
        }

        return charCodesSum;

    }
}
