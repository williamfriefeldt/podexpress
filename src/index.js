import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './header/header';
import Login from './login/login';
import CreateAccount from './create-account/create-account';
import UserPage from './user/user-page/user-page';
import ListenPage from './listen/listen-page/listen-page';
import About from './about/about';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
		<Router>
	    <Switch>
	      <Route path="/logga-in">
	      	<Header />
	        <Login />
	      </Route>
	      <Route path="/skapa-konto">
	      	<Header />
	      	<CreateAccount />
	      </Route>
	      <Route path="/företag/:name">
	      	<UserPage />
	      </Route>
	      <Route path="/lyssna/:name?">
	      	<ListenPage />
	      </Route>
	      <Route path="/">
	      	<Header />
	        <App />
	        <About />
	      </Route>
    	</Switch>
		</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
