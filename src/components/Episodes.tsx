import { Link } from 'react-router-dom';
import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';
import IEpisode from '../interfaces/IEpisode';

interface Props {
  limit?: number;
  detailsOpen?: boolean;
}

interface BySeason {
  season: string;
  episodes: IEpisode[];
}

const Episodes: React.FC<Props> = ({ limit, detailsOpen = false }) => {
  const [episodes, setEpisodes] = useState<BySeason[] | null>(null);
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

      const episodesBySeason: BySeason[] = [];
      const groupedEpisodes = groupBy(episodes, 'season');
      for (const entries of Object.entries(groupedEpisodes)) {
        const season: string = entries[0];
        const episodes: IEpisode[] = entries[1];
        episodesBySeason.push({
          season: season,
          episodes: episodes,
        });
      }

      setEpisodes(episodesBySeason);
    };

    fetchData();
  }, [limit]);

  return (
    <div className=''>
      {episodes
        ? episodes.map(season => (
            <details open={detailsOpen} className='m-2' key={season.season}>
              <summary className='text-xl'>Season {season.season}</summary>
              <ol className='list-decimal list-inside'>
                {season.episodes.map(episode => (
                  <li className='my-1' key={episode.episode_id}>
                    <Link
                      className='underline'
                      to={`/episodes/${episode.episode_id}`}
                    >
                      {episode.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </details>
          ))
        : 'Loading...'}
    </div>
  );
};

export default Episodes;
