import { ApolloProvider } from '@apollo/client';
import client from './service/graphql'
import Navbar from '../src/components/Navbar'
import MainPage from './pages/MainPage'

import MovieDetail from "./pages/MovieDetail";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";

import SerieDetail from "./pages/SerieDetail";
import AddSerie from "./pages/AddSerie";
import EditSerie from "./pages/EditSerie";

import Favorites from "./pages/Favorites"
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route path="/movies/:id">
          <MovieDetail></MovieDetail>
        </Route>
        <Route path="/editMovie/:id">
          <EditMovie></EditMovie>
        </Route>
        <Route path="/series/:id">
          <SerieDetail></SerieDetail>
        </Route>
        <Route path="/editSerie/:id">
          <EditSerie></EditSerie>
        </Route>
        <Route path="/addMovie">
          <AddMovie></AddMovie>
        </Route>
        <Route path="/addSerie">
          <AddSerie></AddSerie>
        </Route>
        <Route path="/favorites">
          <Favorites></Favorites>
        </Route>
        <Route path="/">
          <MainPage></MainPage>
        </Route>
      </Switch>      
  </ApolloProvider>
  );
}

export default App;
