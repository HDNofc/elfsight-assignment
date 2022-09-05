import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIStatus } from '../shared-types';
import { fetchCharacters, fetchCharactersNextPage } from './asyncActions';
import { CharacterSliceState, Filters } from './types';

const initialState: CharacterSliceState = {
  items: [],
  info: {
    count: null,
    pages: null,
    next: null,
    prev: null,
  },
  apiStatus: APIStatus.IDLE,
  apiErrorMessage: '',
  filters: {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  },
  nextPageStatus: APIStatus.IDLE,
  nextPageErrorMessage: '',
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, (state, action) => {
      state.apiStatus = APIStatus.LOADING;
      state.apiErrorMessage = '';
    });

    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.apiStatus = APIStatus.SUCCESS;
      state.items = action.payload.results;
      state.info = action.payload.info;
    });

    builder.addCase(fetchCharacters.rejected, (state, error) => {
      state.apiErrorMessage = error.payload ? error.payload.message : '';
      state.apiStatus = APIStatus.ERROR;
      state.items = [];
      state.info = {
        count: null,
        pages: null,
        next: null,
        prev: null,
      }
    });

    builder.addCase(fetchCharactersNextPage.pending, (state, action) => {
      state.nextPageStatus = APIStatus.LOADING;
      state.nextPageErrorMessage = '';
    });

    builder.addCase(fetchCharactersNextPage.fulfilled, (state, action) => {
      state.nextPageStatus = APIStatus.SUCCESS;
      state.items = [...state.items, ...action.payload.results];
      state.info = action.payload.info
    });

    builder.addCase(fetchCharactersNextPage.rejected, (state, error) => {
      state.nextPageErrorMessage = error.payload ? error.payload.message : '';
      state.nextPageStatus = APIStatus.ERROR;
    });
  },
});

export const { setFilters } = characterSlice.actions;

export default characterSlice.reducer;
