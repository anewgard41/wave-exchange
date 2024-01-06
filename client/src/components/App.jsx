import '../App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './Header.jsx';
import LandingPage from './landing.jsx';
import DonatePage from './donate.jsx';
import UserPage from './user.jsx';
import LoginPage from './login.jsx';
import SignupPage from './signup.jsx';
import {LyricSearchPage } from './LyricSearchPage.jsx';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="body-container">
      <Header/>
      <LandingPage/>
    </div>
  );
}

export default App;