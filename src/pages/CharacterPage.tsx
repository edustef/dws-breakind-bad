import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ICharacter from '../interfaces/ICharacter';

interface ParamProps {
  id: string;
}

const CharacterPage = () => {
  const [character, setCharacter] = useState<ICharacter | null>();
  const { id } = useParams<ParamProps>();
  useEffect(() => {
    const fetchData = async () => {
      let url = `https://www.breakingbadapi.com/api/characters/${id}`;
      let res = await fetch(url);
      let character: ICharacter[] = await res.json();

      setCharacter(character[0]);
    };

    fetchData();
  }, [id]);
  return (
    <div>
      <BackButton />
      {character ? (
        <div>
          <img
            className='w-full object-cover mr-4'
            src={character.img}
            alt=''
          />
          <h1 className='text-3xl uppercase font-semibold'>{character.name}</h1>
          <div className='flex flex-grow flex-col'>
            <div className='text-gray-300 text-sm italic'>
              Born in{' '}
              <span className='italic'>
                {character.birthday} &#8211; {character.status}
              </span>
            </div>
            <div className='mt-4'>
              <span className='font-semibold'>Ocupations: </span>
              {character.occupation.join(', ')}
            </div>
          </div>
          <div>
            <span className='font-semibold'>People killed:</span> 24
          </div>
          <div className='mt-2'>
            <div>
              <h3 className='text-xl flex items-center'>
                <button className='mr-2'>
                  <svg
                    className='w-5 h-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                </button>
                <span>Random quote</span>
              </h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CharacterPage;
