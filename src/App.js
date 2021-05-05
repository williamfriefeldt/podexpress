import React from 'react';
import './App.css';
import "react-tiger-transition/styles/main.min.css";
import { Navigation, Route, glide } from "react-tiger-transition";
import Login from './login/login';
import CreateAccount from './create-account/create-account';
import UserPage from './user/user-page/user-page';
import ListenPage from './listen/listen-page/listen-page';
import About from './about/about';
import Start from './start/start';
import Header from './header/header';
import Contact from './contact/contact';
import Tutorial from './tutorial/tutorial';

function App() {

    return (
      <Navigation>
          <Header />
          <Route path="/logga-in">
            <Login />
          </Route>
          <Route path="/skapa-konto" screen>
            <CreateAccount />
          </Route>
          <Route path="/företag/:name">
            <UserPage />
          </Route>
          <Route path="/lyssna" screen>
            <ListenPage />
          </Route>
          <Route exact path="/" screen>
            <Start />
            <About />
            <Tutorial />
            <Contact />
          </Route>
      </Navigation>

    );

}

glide({
  name: "glide-left",
  direction: "left"
});

export default App;
