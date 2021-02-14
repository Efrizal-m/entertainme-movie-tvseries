const { ApolloServer, gql } = require('apollo-server');
const axiosMovies = require('./config/axiosinstance_movies');
const axiosSeries = require('./config/axiosinstance_series');
const Redis = require('ioredis');
const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Status {
      _id: ID!
      message: String
  }

  input AddInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input UpdateInput {
    id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    series: [Serie]
    serie(id: ID!): Serie
  }

  type Mutation {
      addMovie(newMovie: AddInput): Movie
      updateMovie(updatedMovie: UpdateInput): Movie
      deleteMovie(id: ID!): Status

      addSerie(newSerie: AddInput): Serie
      updateSerie(updatedSerie: UpdateInput): Serie
      deleteSerie(id: ID!): Status
    }
`;

const resolvers = {
    Query: {
      movies: async () => {
          try {
            const cache = await redis.get("movies")
            if (cache) {
                return JSON.parse(cache)
            } else {
                const movies =
                    await axiosMovies({
                        method:'get',
                        url: '/movies',
                    })
                if (!movies) {
                    throw { status: 404, message: `Data not found`}                
                } else {
                    await redis.set("movies", JSON.stringify(movies.data))
                    return movies.data
                }                
            }
          } catch (error) {
              throw error
          }
      },
      movie: async (_, args) => {
        try {
            const cache = await redis.get("movies")
            if (cache) {
                const data = JSON.parse(cache)
                return data.find(el => { return el._id === args.id })
            } else {
                const movies =
                    await axiosMovies({
                        method:'get',
                        url: '/movies/'+args.id
                    })
                if (!movies) {
                    throw { status: 404, message: `Data not found`}                
                } else {
                    return movies.data
                }                
            }
          } catch (error) {
              throw error
          }
      },
      series: async () => {
        try {
          const cache = await redis.get("series")
          if (cache) {
              return JSON.parse(cache)
          } else {
              const series =
                  await axiosSeries({
                      method:'get',
                      url: '/tvSeries'
                  })
              if (!series) {
                  throw { status: 404, message: `Data not found`}                
              } else {
                  await redis.set("series", JSON.stringify(series.data))
                  return series.data
              }                
          }
        } catch (error) {
            throw error
        }
      },
      serie: async (_, args) => {
        try {
          const cache = await redis.get("series")
          if (cache) {
              const data = JSON.parse(cache)
              return data.find(el => { return el._id === args.id })
          } else {
              const series =
                  await axiosSeries({
                      method:'get',
                      url: '/tvSeries/'+args.id
                  })
              if (!series) {
                  throw { status: 404, message: `Data not found`}                
              } else {
                  return series.data
              }                
          }
        } catch (error) {
            throw error
        }
      }
    },
    Mutation: {
        addMovie: async (_, args) => {
            try {
                const newMovie = {
                    title: args.newMovie.title,
                    overview: args.newMovie.overview,
                    poster_path: args.newMovie.poster_path,
                    popularity: args.newMovie.popularity,
                    tags: args.newMovie.tags            
                }
                const movie = await axiosMovies({
                    method:'post',
                    url: '/movies',
                    data: newMovie
                })
                await redis.del("movies")
                return movie.data
            } catch (error) {
                throw error                
            }
        },
        updateMovie: async (_, args) => {
            try {
                const updatedMovie = {
                    title: args.updatedMovie.title,
                    overview: args.updatedMovie.overview,
                    poster_path: args.updatedMovie.poster_path,
                    popularity: args.updatedMovie.popularity,
                    tags: args.updatedMovie.tags            
                }
                const movie = await axiosMovies({
                    method:'put',
                    url: '/movies/'+args.updatedMovie.id,
                    data: updatedMovie
                })
                let cache = await redis.get("movies")
                const newCache = JSON.parse(cache).map(c => {
                    if (c._id === args.updatedMovie.id) { return movie.data }
                    else { return c }
                })
                await redis.del("movies")
                return movie.data
            } catch (error) {
                throw error                
            }
        },
        deleteMovie: async (_, args) => {
            try {
                const movie = await axiosMovies({
                    method:'delete',
                    url: '/movies/'+args.id
                })
                await redis.del("movies")
                return movie.data                
            } catch (error) {
                throw error
            }            
        },

        addSerie: async (_, args) => {
            try {
                const newSerie = {
                    title: args.newSerie.title,
                    overview: args.newSerie.overview,
                    poster_path: args.newSerie.poster_path,
                    popularity: args.newSerie.popularity,
                    tags: args.newSerie.tags            
                }
                const serie = await axiosSeries({
                    method:'post',
                    url: '/tvSeries',
                    data: newSerie
                })
                await redis.del("series")
                return serie.data
            } catch (error) {
                throw error                
            }
        },
        updateSerie: async (_, args) => {
            try {
                const updatedSerie = {
                    title: args.updatedSerie.title,
                    overview: args.updatedSerie.overview,
                    poster_path: args.updatedSerie.poster_path,
                    popularity: args.updatedSerie.popularity,
                    tags: args.updatedSerie.tags            
                }
                const serie = await axiosSeries({
                    method:'put',
                    url: '/tvSeries/'+args.updatedSerie.id,
                    data: updatedSerie
                })
                await redis.del("series")
                return serie.data
            } catch (error) {
                throw error                
            }
        },
        deleteSerie: async (_, args) => {
            try {
                const serie = await axiosSeries({
                    method:'delete',
                    url: '/tvSeries/'+args.id
                })
                await redis.del("series")
                return serie.data                
            } catch (error) {
                throw error
            }            
        }
    }
  };


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
