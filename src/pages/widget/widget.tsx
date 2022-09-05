import { useCallback, useEffect, useState } from 'react';
import block from 'bem-css-modules';

import { Button } from '../../components/button';
import Filters from '../../containers/filters/filters';

import { Title } from '../../components/title';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectCharactersApiErrorMessage,
  selectCharactersApiStatus,
  selectCharactersFilter,
  selectCharactersList,
  selectCharactersNextPageStatus,
  selectCharactersNextPageUrl,
} from '../../redux/characters/selectors';
import { fetchCharacters, fetchCharactersNextPage } from '../../redux/characters/asyncActions';
import { CardList } from '../../components/card-list';
import { debounce } from 'lodash-es';
import { Character } from '../../redux/characters/types';
import { Profile } from '../../components/profile';
import { Dialog } from '../../components/dialog';
import { APIStatus } from '../../redux/shared-types';
import { Throbber } from '../../components/throbber';

import styles from './widget.module.scss';

const b = block(styles);

export const Widget = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const dispatch = useAppDispatch();

  const characters = useAppSelector(selectCharactersList);
  const filters = useAppSelector(selectCharactersFilter);
  const apiStatus = useAppSelector(selectCharactersApiStatus);
  const apiErrorMessage = useAppSelector(selectCharactersApiErrorMessage);

  const nextPageStatus = useAppSelector(selectCharactersNextPageStatus);
  const nextPageUrl = useAppSelector(selectCharactersNextPageUrl);

  const handleClick = () => {
    if (nextPageUrl) {
      dispatch(fetchCharactersNextPage(nextPageUrl));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDispatch = useCallback(
    debounce((args: any) => {
      dispatch(fetchCharacters(args));
    }, 400),
    [dispatch]
  );

  useEffect(() => {
    debouncedDispatch(filters);
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch, dispatch, filters]);

  const handleCardClick = (id: number) => {
    const currentCharacter = characters.find((character) => character.id === id);
    if (currentCharacter) {
      setSelectedCharacter(currentCharacter);
      setIsModalOpen(true);
    }
  };
  return (
    <section className={b()}>
      <Title className={b('title')}>The Rick and Morty Widget</Title>
      <Filters />
      {apiStatus === APIStatus.LOADING && characters.length === 0 && (
        <div className={b('list-loading-wrapper')}>
          <Throbber className={b('list-loading')} />
        </div>
      )}
      {characters && !apiErrorMessage ? (
        <CardList items={characters} onCardClick={handleCardClick} />
      ) : (
        <p className={b('error')}>{apiErrorMessage}</p>
      )}

      <div className={b('more-button-wrapper')}>
        {nextPageUrl && (
          <Button
            className={b('more-button')}
            size="large"
            wide
            onClick={handleClick}
            {...(nextPageStatus === APIStatus.LOADING && { icon: <Throbber />, onlyIcon: true })}
          >
            Load more...
          </Button>
        )}
      </div>
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCharacter && <Profile character={selectedCharacter} />}
      </Dialog>
    </section>
  );
};
