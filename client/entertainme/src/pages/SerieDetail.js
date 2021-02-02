import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_SERIE_BY_ID } from '../service/graphql/query'

export default function SerieDetail() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_SERIE_BY_ID, {
        variables:  { serieId: id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="jumbotron">
        <h1 className="display-4">{data.serie.title}</h1>
        <p className="lead">{data.serie.overview}</p>
        <hr className="my-4"/>
        <p>{data.serie.poster_path}</p>
        <p>{data.serie.popularity}</p>
        <p>{data.serie.tags}</p>
      </div>
    )
}
