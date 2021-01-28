import { Route, Switch } from 'react-router-dom';
import Characters from './components/Characters';
import Feature from './components/Feature';
import CharactersPage from './pages/CharactersPage';
import Episodes from './components//Episodes';
import CharacterPage from './pages/CharacterPage';
import EpisodePage from './pages/EpisodePage';
import EpisodesPage from './pages/EpisodesPage';

function App() {
  return (
    <div className='p-4 text-white bg-gradient-to-br from-green-900 to-green-700 h-full w-full min-h-screen'>
      <Switch>
        <Route exact path='/'>
          <div className='space-y-4'>
            <a className='inline-block w-full text-4xl font-semibold' href='/'>
              <h1 className='text-center'>Breaking Bad DB</h1>
            </a>
            <Feature title='Characters' link='/characters'>
              <Characters limit={3} />
            </Feature>
            <Feature title='Episodes' link='/episodes'>
              <Episodes limit={6} />
            </Feature>
          </div>
        </Route>
        <Route exact path='/characters'>
          <CharactersPage />
        </Route>
        <Route exact path='/episodes'>
          <EpisodesPage />
        </Route>
        <Route path='/characters/:id'>
          <CharacterPage />
        </Route>
        <Route path='/episodes/:id'>
          <EpisodePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
