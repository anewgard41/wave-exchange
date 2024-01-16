import "../css/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./Header.jsx";

// GraphQL endpoint for Apollo Client
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware to set the token to the auth header
const authLink = setContext((_, { headers }) => {
  // Get the token from local storage
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an instance of ApolloClient with authentication middleware
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Set the httpLink and authLink to Apollo Client
  cache: new InMemoryCache(),
});

// Main App component
function App() {
  return (
    <div className="body-container">
      {/* Provide the Apollo Client to the application */}
      <ApolloProvider client={client}>
        {/* Header component for navigation */}
        <Header />
        {/* Outlet for rendering nested routes */}
        <Outlet />
      </ApolloProvider>
    </div>
  );
}

export default App;
