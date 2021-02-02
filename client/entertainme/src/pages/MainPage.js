import React from 'react'
import MovieCard from "../components/MovieCard";
import TvSerieCard from "../components/TvSerieCard";
import { useQuery } from '@apollo/client';
import { GET_DATA } from '../service/graphql/query'

export default function MainPage() {
    const { loading, error, data } = useQuery(GET_DATA, {
        fetchPolicy: "network-only"
    });

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    if (error) return <h1 className="d-flex justify-content-center align-middle">Internal Server Error</h1>;  
    

    return (
        <div className="container">
            <h1 className="mt-4 text-white">Movies</h1>
            <div className="container">
                <div className="row">
                {
                    data.movies.length === 0 ?
                    <h1 className="mt-5 mb-5">You don't have any movies yet!!</h1>
                    :
                    data.movies.map(movie => {
                        return (
                            <MovieCard key={movie._id} movie={movie}></MovieCard>
                        )
                    })
                }
                </div>
            </div>
            <h1 className="mt-4 text-white">Tv Series</h1>
            <div className="container">
                <div className="row">
                {
                    data.movies.length === 0 ?
                    <h1 className="mt-5 mb-5">You don't have any tv series yet!!</h1>
                    :
                    data.series.map(serie => {
                        return (
                            <TvSerieCard key={serie._id} serie={serie}></TvSerieCard>
                        )
                    })                    
                }
                </div>
            </div>
        </div>
    )
}
