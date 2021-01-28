import { useEffect, useState } from 'react';
import IEpisode from '../interfaces/IEpisode';

interface Props {
  limit?: number;
}

const Episodes: React.FC<Props> = ({ limit = null }) => {
  const [episodes, setEpisodes] = useState<IEpisode[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      let url = `https://www.breakingbadapi.com/api/episodes`;
      let res = await fetch(url);
      let episodes: IEpisode[] = await res.json();
      // Trim spaces for Episodeseason property since there is an issues with spaces
      episodes = episodes.map((datum: any) => {
        const { season, ...rest } = datum;
        return {
          season: season.trim(),
          ...rest,
        };
      });
      if (limit) {
        episodes = episodes.slice(0, limit);
      }

      setEpisodes(episodes);
    };

    fetchData();
  }, [limit]);

  return (
    <ol className='list-decimal list-inside'>
      {episodes
        ? episodes.map(episode => (
            <li key={episode.episode_id}>{episode.title}</li>
          ))
        : 'Loading...'}
    </ol>
  );
};

export default Episodes;
