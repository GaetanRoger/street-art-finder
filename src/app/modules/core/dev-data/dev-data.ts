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
            horizontal: {
                normal: '/assets/dev/hfdmsfdmdflmdf.jpg',
                low: '/assets/dev/hfdmsfdmdflmdf-low.jpg'
            },
            vertical: {
                normal: '/assets/dev/mhsfdmhsfdmhsfdms.jpg',
                low: '/assets/dev/mhsfdmhsfdmhsfdms-low.jpg'
            }
        }
    },
    {
        objectID: 'luiqmshdsqd',
        name: 'Other',
        text: 'Another street artist that everyone loves.',
        website: 'example.com',
        pieces: [],
        images: {
            horizontal: {
                normal: '/assets/dev/jqsdmldsqljmsdq.jpg',
                low: '/assets/dev/jqsdmldsqljmsdq-low.jpg',
            }
        }
    },
    {
        objectID: 'khgfdsfghjkl',
        name: 'Misc',
        text: 'A third artist every one loves.',
        website: 'example.com',
        pieces: [],
        images: {
            horizontal: {
                normal: '/assets/dev/kjhgfdfvghjkl.jpg',
                low: '/assets/dev/kjhgfdfvghjkl-low.jpg',
            }
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
            main: {
                normal: '/assets/dev/kkfkjdjdflsd.jpg',
                low: '/assets/dev/kkfkjdjdflsd-low.jpg',
            },
            others: []
        }
    },
    {
        objectID: 'hfsdiofsdjifsdpsf',
        name: 'Old Schooled Colored',
        text: 'A nice old school colored design',
        location: {
            getLongitude: () => 45.776944444444446,
            getLatitude: () => 4.845277777777778
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
            main: {
                normal: '/assets/dev/moqugshdmqihdmdisq.jpg',
                low: '/assets/dev/moqugshdmqihdmdisq-low.jpg',
            },
            others: []
        }
    },
    {
        objectID: 'hfsdiofdsqdsddqssdjifsdpsf',
        name: 'Dear',
        text: 'Dear dear',
        location: {
            getLongitude: () => 45.769444444444446,
            getLatitude: () => 4.832222222222222
        },
        addedOn: new Date(),
        artist: {
            objectID: 'khgfdsfghjkl',
            name: 'Misc',
        },
        tags: {
            accessible: true
        },
        images: {
            main: {
                normal: '/assets/dev/ouygutfguhiopigjhklm.jpg',
                low: '/assets/dev/ouygutfguhiopigjhklm-low.jpg',
            },
            others: []
        }
    }
];
