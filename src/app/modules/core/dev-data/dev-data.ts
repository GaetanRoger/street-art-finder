import {Artist} from '../types/artist';
import {Piece} from '../types/piece';

export const artists: Artist[] = [
    {
        objectID: 'hfdmsfdmdflmdf',
        name: 'Ememem',
        text: 'Street artist from Lyon, they fill ground holes with beautiful floor tiles mosaics patterns.',
        website: 'https://www.ememem-flacking.net/',
        pieces: []
    }
];

export const pieces: Piece[] = [
    {
        objectID: 'hfsdiofsdjifsdpsf',
        name: 'Black & White',
        text: 'A nice black and white design.',
        location: {
            getLongitude: () => 45.774027777777775,
            getLatitude: () => 4.849794444444444
        },
        addedOn: new Date(),
        artist: {
            objectID: 'hfdmsfdmdflmdf',
            name: 'Ememem',
        },
        tags: {
            accessible: true
        },
        images: {
            main: 'dev/hfdmsfdmdflmdf.png',
            others: []
        }
    }
];
