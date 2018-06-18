import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App" className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
        <div className="mdl-layout-icon"></div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout__title">Bloc Jams</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <Link className="mdl-navigation__link" to='/'>Landing</Link>
            <Link className="mdl-navigation__link" to='/library'>Library</Link>
            </nav>
            </div>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
