import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import BackButton from '../components/BackButton';
import Characters from '../components/Characters';
import Feature from '../components/Feature';
import IEpisode from '../interfaces/IEpisode';

interface ParamProps {
  id: string;
}

export default function Episode() {
  let unmounted = useRef(false);
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const { id } = useParams<ParamProps>();

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!unmounted.current) {
        const res = await fetch(
          `https://breakingbadapi.com/api/episodes/${id}`
        );
        const data = await res.json();

        setEpisode(data[0]);
      }
    };

    fetchEpisode();
  }, [id]);

  return (
    <div>
      <BackButton />
      {episode ? (
        <div>
          <div className='mb-4'>
            <h1 className='text-3xl'>
              {episode.title} - Season {episode.season}
            </h1>
            <small className='text-sm italic text-green-200'>
              Aired on {episode.air_date}
            </small>
          </div>
          <Feature link='/characters' title='characters in the episode.'>
            <Characters specificCharacters={episode.characters} />
          </Feature>
        </div>
      ) : null}
    </div>
  );
}
