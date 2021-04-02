import React from 'react';
import './App.css';
import "react-tiger-transition/styles/main.min.css";
import { Navigation, Route } from "react-tiger-transition";
import Login from './login/login';
import CreateAccount from './create-account/create-account';
import UserPage from './user/user-page/user-page';
import ListenPage from './listen/listen-page/listen-page';
import About from './about/about';
import Start from './start/start';
import Header from './header/header';

function App() {

    const OnScroll = () => console.log('Scroll');

    return (
      <Navigation>
          <Header />
          <Route path="/logga-in">
            <Login />
          </Route>
          <Route path="/skapa-konto">
            <CreateAccount />
          </Route>
          <Route path="/företag/:name">
            <UserPage />
          </Route>
          <Route path="/lyssna/:name?">
            <ListenPage />
          </Route>
          <Route exact path="/" screen>
            <Start onScroll={OnScroll} />
            <About />
          </Route>
      </Navigation>

    );

}

export default App;
