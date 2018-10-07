import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const env = functions.config();
export const algolia = algoliasearch(env.algolia.appid, env.algolia.apikey);
