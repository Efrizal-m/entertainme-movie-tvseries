import React from 'react'

export default function FavoriteMovieCard({ movie }) {
    return (        
        <div className="card mb-3 mr-2">
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={movie.poster_path} className="card-img" alt="movie" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.overview}</p>
                    <p className="card-text"><small className="text-muted">{movie.popularity}</small></p>
                    <p className="card-text">
                    {
                        movie.tags.map(tag => {
                          return (
                            <small style={{backgroundColor:'gray'}} className="text-white mr-1 p-1 disabled">#{tag}</small>
                          )
                        })
                      }
                    </p>
                </div>
            </div>
        </div>
      </div>
    )
}
