import {Artist} from '../../app/modules/shared/types/artist';

export const mockArtist: Artist = {
    objectID: '123456',
    name: 'Test Artist',
    text: 'A test artist.',
    website: 'http://example.com',
    piecesCount: 4,
    published: true,
    pieces: [],
    followers: 1,
    cities: {
      Lyon: 3,
      Strasbourg: 1
    },
    images: {
        horizontal: {
            low: 'https://via.placeholder.com/500x300',
            normal: 'https://via.placeholder.com/5000x3000'
        },
        vertical: {
            low: 'https://via.placeholder.com/300x500',
            normal: 'https://via.placeholder.com/3000x5000'
        }
    }
};

