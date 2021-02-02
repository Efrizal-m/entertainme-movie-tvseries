import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client';
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

const DELETE_SERIE = gql`
  mutation DeleteSerie($serieId: ID!) {
    deleteSerie(id: $serieId) {
      _id
      message
    }
  }
`

export default function TvSerieCard({ serie }) {
    const history = useHistory()

    const [ deleteSerie ] = useMutation(DELETE_SERIE, {
        refetchQueries: [{
          query: GET_DATA
        }]
    })

    const handleDetail = (id) => {
        history.push(`/series/${id}`)
    }

    const handleEdit = (id) => {
        history.push(`/editSerie/${id}`)
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
            deleteSerie({
              variables: {
                  serieId: id
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

    return (        
        <div className="card mb-3 mr-2">
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={serie.poster_path} className="card-img" alt="serie" />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{serie.title}</h5>
                    <p className="card-text">{serie.overview}</p>
                    <p className="card-text"><small className="text-muted">popularity: {serie.popularity}</small></p>
                    <p className="card-text">
                      {
                        serie.tags.map(tag => {
                          return (
                            <small key={tag} style={{backgroundColor:'gray'}} className="text-white mr-1 p-1 disabled">#{tag}</small>
                          )
                        })
                      }
                    </p>
                    <div className="d-flex flex-row">
                        <button onClick={() => handleDetail(serie._id)} className="btn btn-success"><i className="fas fa-list-ul"></i></button>
                        <button onClick={() => handleEdit(serie._id)} className="btn btn-primary"><i className="fas fa-pencil-alt"></i></button>
                        <button onClick={() => handleDelete(serie._id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}
