import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ICharacter from '../interfaces/ICharacter';

interface Props {
  limit?: number;
  specificCharacters?: string[];
}

const Characters: React.FC<Props> = ({ limit, specificCharacters }) => {
  const unmounted = useRef(false);
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://www.breakingbadapi.com/api/characters${
        limit ? `?limit=${limit}` : ''
      }`;
      let res = await fetch(url);
      let charactersData: ICharacter[] = await res.json();

      if (specificCharacters) {
        charactersData = charactersData.filter(character =>
          specificCharacters.includes(character.name)
        );
      }

      setCharacters(charactersData);
    };

    if (!unmounted.current) {
      fetchData();
    }
  }, [limit, specificCharacters]);

  return (
    <div className='flex flex-col md:flex-row flex-wrap'>
      {characters
        ? characters.map(character => (
            <div className='flex md:block w-64 m-4' key={character.char_id}>
              <img
                className='w-32 h-48 object-cover mr-4'
                src={character.img}
                alt=''
              />
              <div className='flex items-start flex-col'>
                <span className='font-bold uppercase'>{character.name}</span>
                <span className='text-green-200 text-sm italic'>
                  Born in <span className='italic'>{character.birthday}</span>
                </span>
                <span>Potrayed by {character.portrayed}</span>
                <Link
                  className='mt-4 px-4 py-2 border uppercase shadow-lg font-semibold text-sm'
                  key={character.char_id}
                  to={`/characters/${character.char_id}`}
                >
                  See more
                </Link>
              </div>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
};

export default Characters;
