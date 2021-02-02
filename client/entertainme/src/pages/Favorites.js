import React from 'react'
// import { useQuery } from '@apollo/client'
import { favoriteMoviesVar } from '../cache'
import FavoriteMovieCard from '../components/FavoriteMovieCard'

export default function Favorites() {
    const favMovies = favoriteMoviesVar()

    if (favMovies.length === 0) {
        return <h1 className="mt-5 mb-5 d-flex justify-content-center align-self-center">Opss, You don't have any favorite movies yet!!</h1>
    }

    return (
        <div className="container">
            <h1 className="mt-3 mb-5 text-white d-flex justify-content-center">Favorite Movies</h1>
            <div className="container">
                <div className="row">
                {
                    favMovies.map(movie => {
                        return (
                            <FavoriteMovieCard key={movie._id} movie={movie}></FavoriteMovieCard>
                        )
                    })                    
                }
                </div>
            </div>
        </div>
    )
}
