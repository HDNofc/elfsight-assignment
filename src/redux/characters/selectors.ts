import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/**
 * root -> characters
 */
export const selectCharactersSlice = (state: RootState) => state.characters;

/**
 * characters -> items
 */
export const selectCharactersList = createSelector(selectCharactersSlice, (characters) => characters.items);

/**
 * characters -> apiStatus
 */
 export const selectCharactersApiStatus = createSelector(selectCharactersSlice, (characters) => characters.apiStatus);

/**
 * characters -> apiErrorMessage
 */
 export const selectCharactersApiErrorMessage = createSelector(selectCharactersSlice, (characters) => characters.apiErrorMessage);

/**
 * characters -> info
 */
export const selectCharactersPaginationInfo = createSelector(selectCharactersSlice, (characters) => characters.info);

/**
 * characters -> info -> next
 */
export const selectCharactersNextPageUrl = createSelector(selectCharactersSlice, (characters) => characters.info.next);

/**
 * characters -> nextPageStatus
 */
export const selectCharactersNextPageStatus = createSelector(selectCharactersSlice, (characters) => characters.nextPageStatus);


/**
* characters -> filters
*/
export const selectCharactersFilter = createSelector(selectCharactersSlice, (characters) => characters.filters);
