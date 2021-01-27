import {useEffect, useState} from 'react'

interface IEpisode {
  air_date: string,
  characters: string[],
  episode: string,
  episode_id: number,
  season: string,
  series: string,
  title: string
}

export default function Episodes() {

const [episodes, setEpisodes] = useState<IEpisode[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
    let res = await fetch('https://www.breakingbadapi.com/api/episodes');
    let episodes: IEpisode[] = await res.json();
    // Trim spaces for season property since there is an issues with spaces
    episodes = episodes.map(((datum: any) => {
      const {season, ...rest} = datum;
      return {
        season: season.trim(),
        ...rest
      }
    }));
    setEpisodes(episodes);
    }

    fetchData();
  }, []);


  return (
    <ol className='list-decimal list-inside'>
     {episodes && episodes.map((episode) => (
      <li key={episode.episode_id}>
        {episode.title}
      </li>
      ))
     } </ol>
  )
}
