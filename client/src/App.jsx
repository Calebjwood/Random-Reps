import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import UserProvider from './utils/user-context';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Nav';
import Footer from './components/Footer';
import Auth from './utils/auth'

import './app.scss';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <div id="app-shell">
          <Navigation />
          <Outlet />
          <Footer />
        </div>
      </UserProvider>
    </ApolloProvider>
  )
}

export default App
