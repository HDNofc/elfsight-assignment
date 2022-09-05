import { Character } from "../redux/characters/types";

export const rick: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'origin-location-link',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'last-location-link',
  },
  image: 'rick-profile-avatar.jpg',
  episode: ['episode-1-link'],
  url: 'rick-profile-link',
  created: '2017-11-04T18:48:46.250Z',
};

export const morty: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'unknown',
    url: 'origin-location-link',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'last-location-link',
  },
  image: 'morty-profile-avatar.jpg',
  episode: ['episode-1-link'],
  url: 'morty-profile-link',
  created: '2017-11-04T18:50:21.651Z',
};

export const characters: Character[] = [rick, morty];
