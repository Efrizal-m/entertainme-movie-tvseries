import React, { useState } from 'react'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UPDATE_MOVIE, GET_DATA, GET_MOVIE_BY_ID } from '../service/graphql/query'

export default function EditMovie() {
    const { id } = useParams()

    const [tags, setTags] = useState([])
    const [movie, setMovie] = useState({
        id:'',
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
        tags: []
    })

    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
        variables: { movieId: id },
        onCompleted: () => {
            const { title, overview, poster_path, popularity, tags } = data.movie
            setTags(JSON.parse(JSON.stringify(tags)))
            setMovie({ ...movie, id, title, overview, poster_path, popularity, tags })
        }
    });

    const { refetch } = useQuery(GET_DATA);
    const [updateMovie] = useMutation(UPDATE_MOVIE, {
        onCompleted: () => { refetch() }
    })
    const history = useHistory()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === 'popularity') { value = Number(value) }
        setMovie({ ...movie, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateMovie({
            variables: {
                newData: movie
            }
        })
        history.push('/')
    }

    return (
        <div className="container">
            <h1 className="mt-3 mb-3 text-white d-flex justify-content-center">Edit Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-white">Title</label>
                    <input onChange={handleChange} value={movie.title} name="title" className="form-control" placeholder="Input title" />
                </div>
                <div className="form-group">
                    <label className="text-white">Overview</label>
                    <textarea onChange={handleChange} value={movie.overview} name="overview" className="form-control" placeholder="Describe the movie briefly" />
                </div>
                <div className="form-group">
                    <label className="text-white">Poster Path</label>
                    <input onChange={handleChange} value={movie.poster_path} name="poster_path" className="form-control" placeholder="Input poster URL" />
                </div>
                <div className="form-group">
                    <label className="text-white">Popularity</label>
                    <input onChange={handleChange} value={movie.popularity} name="popularity" className="form-control" placeholder="Range 1-5" />
                </div>
                <div className="form-group">
                    <label className="text-white">Tags</label>
                    <div>
                        <div style={{ whiteSpace: 'nowrap', overflowY: 'auto' }} className='input-group'>
                            <InputTags name="tags" values={tags} onTags={(value) => setTags(value.values)} />
                            <button
                                className='btn btn-outline-danger'
                                type='button'
                                data-testid='button-clearAll'
                                onClick={() => {
                                    setTags([])
                                }}
                            >
                            <i className="fas fa-times"></i>
                                </button>
                            <button
                                className='btn btn-outline-success'
                                type='button'
                                data-testid='button-clearAll'
                                onClick={() => {
                                    setMovie({ ...movie, tags: JSON.parse(JSON.stringify(tags)) })
                                }}
                            >
                            <i className="fas fa-check"></i>
                                    </button>
                        </div>
                    </div>
                    <hr />
                </div>
                <div id="submit" className=" d-flex justify-content-center">
                    <button className="btn btn-primary btn-block">Submit</button>
                </div>
            </form>
        </div>
    )
}
