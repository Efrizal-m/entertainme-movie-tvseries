import { ApolloClient, InMemoryCache } from '@apollo/client';
import { favoriteMoviesVar } from '../../cache'

const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  uri: 'http://13.250.22.237:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query : {
        fields: {
          favoriteMoviesItem: {
            read() {
              return favoriteMoviesVar()
            }
          }
        }
      }
    }
  })
});

export default client