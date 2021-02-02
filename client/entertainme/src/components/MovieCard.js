import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
import { favoriteMoviesVar } from '../cache'
import Swal from 'sweetalert2'

const GET_DATA = gql`
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

const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(id: $movieId) {
      _id
      message
    }
  }
`

export default function MovieCard({ movie }) {
    const history = useHistory()

    const [ deleteMovie ] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{
          query: GET_DATA
        }]
    })

    const handleDetail = (id) => {
        history.push(`/movies/${id}`)
    }

    const handleEdit = (id) => {
        history.push(`/editMovie/${id}`)
    }

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            deleteMovie({
              variables: {
                  movieId: id
              }
          })  
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        })
    }

    const handleFavorite = (movie) => {
      const prevData = favoriteMoviesVar()
      favoriteMoviesVar([movie, ...prevData])
      if (prevData.length === 0) {
        Swal.fire(
            'Done!',
            'You have add this to favorites',
            'success'
        )
        favoriteMoviesVar([movie, ...prevData])
      } else {
        prevData.find(e => {
            if (e._id === movie._id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have added this to favorites!'
                })
            } else {
                Swal.fire(
                    'Done!',
                    'You have add this to favorites',
                    'success'
                )        
                favoriteMoviesVar([movie, ...prevData])
            }
            return 'sucees add to favorites'
        });                    
      }
    }


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
                    <div className="d-flex flex-row">
                      <p className="card-text  align-items-center"><small className="text-muted">popularity: {movie.popularity}</small>
                      <button onClick={() => handleFavorite(movie)} style={{zIndex:99}} className="btn"><i className="far fa-heart"></i></button>
                      </p>
                    </div>
                    <p className="card-text">
                      {
                        movie.tags.map(tag => {
                          return (
                            <small key={tag} style={{backgroundColor:'gray'}} className="text-white mr-1 p-1 disabled">#{tag}</small>
                          )
                        })
                      }
                    </p>
                    <div className="d-flex flex-row">
                        <button onClick={() => handleDetail(movie._id)} className="btn btn-success"><i className="fas fa-list-ul"></i></button>
                        <button onClick={() => handleEdit(movie._id)} className="btn btn-primary"><i className="fas fa-pencil-alt"></i></button>
                        <button onClick={() => handleDelete(movie._id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}
