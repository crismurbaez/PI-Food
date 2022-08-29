import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail.jsx';

function App() {
  return (
    <div className="App">
      <Route
        path={"/home"}
        component={NavBar}
      />
      <Switch>
        <Route
          exact
          path='/home/recipes/:id'
          render={({ match }) => <Detail id={match.params.id} />}
        />
        <Route
          exact
          path={"/home"}
          component={Home}
        />

      </Switch>
      <Route
        exact
        path={"/"}
        component={LandingPage}
      />
    </div>
  );
}

export default App;
