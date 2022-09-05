import { APIStatus } from '../shared-types';

export type CharacterStatus = 'Dead' | 'Alive' | 'unknown';

export interface CharacterLocation {
  name: string;
  url: string;
}

export type CharacterGender = 'unknown' | 'Female' | 'Male' | 'Genderless';

/**
 * @description Character
 * {@link https://javascript.rickandmortyapi.com/interfaces/interfaces.Character.html}
 * @property {number} id - The id of the character
 * @property {string} name - The name of the character
 * @property {CharacterStatus} status - The status of the character
 * @property {string} species - The species of the character
 * @property {string} type - The type or subspecies of the character
 * @property {CharacterGender} gender - The gender of the character ('Female', 'Male', 'Genderless' or 'unknown')
 * @property {CharacterLocation} origin - Name and link to the character's origin location
 * @property {CharacterLocation} location - Name and link to the character's last known location endpoint
 * @property {string} image - Link to the character's image. All images are 300x300px
 * @property {string[]} episode - List of episodes in which this character appeared
 * @property {string} url - Link to the character's own URL endpoint.
 * @property {string} created - Time at which the character was created in the database.
 */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * @description The API will automatically paginate the responses. You will receive up to 20 documents per page.
 * @property {number} count - The length of the response
 * @property {number} pages - The amount of pages
 * @property {string} next - Link to the next page (if it exists)
 * @property {string} prev - Link to the previous page (if it exists)
 */
 export interface Info {
  count: number | null;
  pages: number | null;
  next: string | null;
  prev: string | null;
}

/**
 * @description Response with pagination
 */
export interface WithPaginationInfo<T> {
  info: Info;
  results: T;
}

export interface Filters {
  name: string;
  status: CharacterStatus | '';
  species: string;
  type: string;
  gender: CharacterGender | '';
}

export interface CharacterSliceState {
  items: Character[];
  info: Info;
  apiStatus: APIStatus;
  apiErrorMessage: string | null;
  filters: Filters;
  nextPageStatus: APIStatus,
  nextPageErrorMessage: string | null;
}
