import React from 'react';
import './App.css';
import "react-tiger-transition/styles/main.min.css";
import { Navigation, Route, glide, flip } from "react-tiger-transition";
import Login from './login/login';
import CreateAccount from './create-account/create-account';
import UserPage from './user/user-page/user-page';
import ListenPage from './listen/listen-page/listen-page';
import About from './about/about';
import Start from './start/start';
import Header from './header/header';
import Contact from './contact/contact';
import Tutorial from './tutorial/tutorial';
import CookiesComponent from './cookies/cookies';

function App() {

    console.log(`Environment: ${process.env.NODE_ENV}`);

    return (
      <Navigation>
          <Header />
          <Route path="/logga-in" screen>
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
          <CookiesComponent />
      </Navigation>
    );

}

glide({
  name: "glide-left",
  direction: "left"
});

glide({
  name: "glide-right",
  direction: "right"
});

flip({
  name: "flip-right",
  direction: "right",
  duration: 200
});

export default App;
