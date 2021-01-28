import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ICharacter from '../interfaces/ICharacter';

interface Props {
  limit?: number;
}

const Characters: React.FC<Props> = ({ limit = null }) => {
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://www.breakingbadapi.com/api/characters${
        limit ? `?limit=${limit}` : ''
      }`;
      let res = await fetch(url);
      let characters: ICharacter[] = await res.json();

      setCharacters(characters);
    };

    fetchData();
  }, [limit]);

  return (
    <div className='space-y-4'>
      {characters
        ? characters.map(character => (
            <div className='flex' key={character.char_id}>
              <img
                className='w-32 h-48 object-cover mr-4'
                src={character.img}
                alt=''
              />
              <div className='flex flex-grow flex-col'>
                <span className='font-bold uppercase'>{character.name}</span>
                <span className='text-gray-300 text-sm italic'>
                  Born in <span className='italic'>{character.birthday}</span>
                </span>
                <span>Potrayed by {character.portrayed}</span>
                <Link
                  className='mt-2 underline'
                  key={character.char_id}
                  to={`characters/${character.char_id}`}
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
