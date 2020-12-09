import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import FilmDetails from './components/FilmDetails/FilmDetails';
import Register from './components/Register/Register';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/film" exact component={FilmDetails} />
          <Route path="/register" component={Register} exact/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
