import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import FilmDetails from './components/FilmDetails/FilmDetails';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/FilmDetails" exact component={FilmDetails} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
