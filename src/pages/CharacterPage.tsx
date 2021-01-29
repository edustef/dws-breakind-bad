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
  death_id: number;
  death: 'string';
  cause: 'string';
  responsible: 'string';
  last_words: 'string';
  season: number;
  episode: number;
}

const CharacterPage = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [death, setDeath] = useState<IDeath | null>(null);
  const [killedCount, setKilledCount] = useState<number>(0);
  const [randomQuote, setRandomQuote] = useState<IQuote | null>(null);
  const { id } = useParams<ParamProps>();

  useEffect(() => {
    const fetchChar = async () => {
      const url = `https://www.breakingbadapi.com/api/characters/${id}`;
      const res = await fetch(url);
      const [character]: ICharacter[] = await res.json();

      setCharacter(character);
    };

    fetchChar();
  }, [id]);

  const fetchRandomQuote = useCallback(async () => {
    if (character) {
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
    const fetchKillCount = async () => {
      if (character) {
        const name = character.name.replace(/\s/g, '+');
        const res = await fetch(
          `https://www.breakingbadapi.com/api/death-count?name=${name}`
        );
        const [deathCount] = await res.json();

        setKilledCount(deathCount.deathCount);
      }
    };

    fetchKillCount();
  }, [character]);

  useEffect(() => {
    const fetchDeath = async () => {
      if (character) {
        const res = await fetch('https://www.breakingbadapi.com/api/deaths');
        const deaths: IDeath[] = await res.json();
        const [death] = deaths.filter(death => death.death === character.name);

        setDeath(death);
      }
    };

    fetchDeath();
  }, [character]);

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
              <div className='text-green-200 text-sm italic'>
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
          {killedCount > 0 ? (
            <div>
              <span className='font-semibold'>People killed: </span>
              {killedCount}
            </div>
          ) : null}
          {randomQuote ? (
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
                &quot;{randomQuote.quote}&quot;
              </blockquote>
            </div>
          ) : null}
          {death ? (
            <div>
              <h3 className='text-xl flex items-center'>Death details</h3>
              <div>
                Died in season {death.season}, episode {death.episode}.
              </div>
              <div>{death.cause}</div>
              <div>
                <span className='font-semibold'>Last words: </span>
                <span className='italic font-light'>
                  &quot;{death.last_words}&quot;
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CharacterPage;
