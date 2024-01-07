import "../App.css";
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import Header from './Header.jsx';
import LandingPage from './landing.jsx';
import DonatePage from './donate.jsx';
import UserPage from './user.jsx';
import LoginPage from './login.jsx';
import SignupPage from './signup.jsx';
import { LyricSearchPage } from './LyricSearchPage.jsx';

// graphQL endpoint for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// middleware to set the token to the auth header
const authLink = setContext((_, { headers }) => {
  // get the token from local storage
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // set the httpLink and authLink to Apollo Client
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="body-container">
      <ApolloProvider client={client}>
        <LandingPage/>
      </ApolloProvider>
    </div>
  );
}

export default App;
