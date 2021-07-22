import './App.css';
import Main from './components/Main';
import Create from './components/Create';
import Update from './components/Update';
import ViewOne from './components/ViewOne';
import {Router, Redirect, Link} from "@reach/router";

function App() {
  return (
    <div className="App">
      <Link to="/"> Home |</Link> <Link to="/authors/new"> Add an author</Link>

      <Router>
        <Redirect from="/" to="/authors" noThrow ="true"/>
        <ViewOne path="authors/:id" />
        <Update path="/authors/update/:id" />
        <Main path="/authors"/>
        <Create path="/authors/new"/>
      </Router>
    </div>
  );
}

export default App;
