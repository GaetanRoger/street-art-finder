import {Artist} from '../types/artist';
import {Piece} from '../types/piece';

export const artists: Artist[] = [
    {
        objectID: 'hfdmsfdmdflmdf',
        name: 'Ememem',
        text: 'Street artist from Lyon, they fill ground holes with beautiful floor tiles mosaics patterns.',
        website: 'https://www.ememem-flacking.net/',
        pieces: [],
        images: {
            horizontal: '/assets/dev/hfdmsfdmdflmdf.jpg'
        }
    },
    {
        objectID: 'luiqmshdsqd',
        name: 'Other',
        text: 'Another street artist that everyone loves.',
        website: 'example.com',
        pieces: [],
        images: {
            horizontal: '/assets/dev/jqsdmldsqljmsdq.jpg'
        }
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
            main: '/assets/dev/hfdmsfdmdflmdf.jpg',
            others: []
        }
    }
];
