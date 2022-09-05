import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIError } from '../shared-types';
import { Character, Filters, WithPaginationInfo } from './types';

export const fetchCharacters = createAsyncThunk<WithPaginationInfo<Character[]>, Filters, { rejectValue: APIError }>(
  'characters/fetchCharacters',
  async (filters, { rejectWithValue }) => {
    const queryString = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => value && queryString.append(key, value));

    const url = `https://rickandmortyapi.com/api/character${queryString.toString().length ? `?${queryString.toString()}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      return rejectWithValue({ code: response.status, message: 'No values matching the filter' });
    }

    const data: WithPaginationInfo<Character[]> = await response.json();

    return data;
  }
);

export const fetchCharactersNextPage = createAsyncThunk<
  WithPaginationInfo<Character[]>,
  string,
  { rejectValue: APIError,  }
>('characters/fetchCharactersNextPage', async (nextPageUrl, { rejectWithValue }) => {
  const url = nextPageUrl;
  const response = await fetch(url);

  if (!response.ok) {
    return rejectWithValue({ code: response.status, message: 'Server Error!' });
  }
  const data: WithPaginationInfo<Character[]> = await response.json();

  return data;
});
