import { gql } from '@apollo/client'

export const GET_FAVORITE_MOVIES = gql`
  query GetFavoriteMoviesItem {
    favoriteMovies @client
  }
`

export const GET_DATA = gql`
  query GetData {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIE_BY_ID = gql`
  query GetMovie($movieId: ID!) {
    movie (id: $movieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const GET_SERIE_BY_ID = gql`
  query GetSerie($serieId: ID!) {
    serie (id: $serieId) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie($newData: AddInput) {
    addMovie(newMovie: $newData) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_SERIE = gql`
mutation AddSerie($newData: AddInput) {
  addSerie(newSerie: $newData) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($newData: UpdateInput) {
    updateMovie(updatedMovie: $newData) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_SERIE = gql`
  mutation UpdateSerie($newData: UpdateInput) {
    updateSerie(updatedSerie: $newData) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
