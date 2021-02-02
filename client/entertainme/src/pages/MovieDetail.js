import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_MOVIE_BY_ID } from '../service/graphql/query'

export default function MovieDetail() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
        variables:  { movieId: id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="jumbotron mt-5 text-center">
        <h1 className="display-4 text-center">{data.movie.title}</h1>
        <p className="lead text-center">{data.movie.overview}</p>
        <hr className="my-4"/>
        <p>{data.movie.poster_path}</p>
        <p>{data.movie.popularity}</p>
        <p>{data.movie.tags}</p>
      </div>
    )
}
