import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ICharacter from '../interfaces/ICharacter';

interface ParamProps {
  id: string;
}

interface IQuote {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

interface IDeath {
  id: number;
  death: 'string';
  cause: 'string';
  responsible: 'string';
  lastWords: 'string';
  season: number;
  episode: number;
}

const CharacterPage = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [randomQuote, setRandomQuote] = useState<IQuote | null>(null);
  const { id } = useParams<ParamProps>();

  const fetchRandomQuote = useCallback(async () => {
    if (character) {
      setRandomQuote(null);
      const author = character.name.replace(/\s/g, '+');
      const res = await fetch(
        `https://www.breakingbadapi.com/api/quote/random?author=${author}`
      );
      const quotes: IQuote[] = await res.json();

      setRandomQuote(quotes[0]);
    }
  }, [character]);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.breakingbadapi.com/api/characters/${id}`;
      const res = await fetch(url);
      const characters: ICharacter[] = await res.json();

      setCharacter(characters[0]);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {character ? (
        <div className='space-y-4'>
          <BackButton />
          <img className='w-full object-cover' src={character.img} alt='' />
          <div>
            <h1 className='text-3xl uppercase font-semibold'>
              {character.name}
            </h1>
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
          </div>
          <div>
            <span className='font-semibold'>People killed:</span> 24
          </div>
          <div>
            <div>
              <h3 className='text-xl flex items-center'>
                <button onClick={fetchRandomQuote} className='mr-2'>
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
            <blockquote className='italic leading-relaxed tracking-wide font-light'>
              &quot;{randomQuote ? randomQuote.quote : ''}&quot;
            </blockquote>
          </div>
          <div>
            <h3 className='text-xl flex items-center'>Death details</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CharacterPage;
