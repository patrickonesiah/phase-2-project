import '../App.css';
import Header from './Header/Header';
// import CreateAStory from './Pages/CreateAStory';
import DisplayStory from './Pages/DisplayStory';
import CreateEditStory from './Pages/CreateEditStory';
// import EditStory from './Pages/EditStory';
import Home from './Pages/Home';
import {Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/CreateAStory">
          <CreateEditStory/>
            {/* <CreateAStory /> */}
          </Route>
          <Route path="/DisplayStory/:id">
            <DisplayStory />
          </Route>
          <Route path="/EditStory/:id">
            <CreateEditStory/>
            {/* <EditStory /> */}
          </Route>
        </Switch>
    </div>
  );
}

export default App;
