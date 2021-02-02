import React, { useState } from 'react'
import { InputTags } from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UPDATE_SERIE, GET_DATA, GET_SERIE_BY_ID } from '../service/graphql/query'

export default function EditSerie() {
    const { id } = useParams()

    const [tags, setTags] = useState([])
    const [serie, setSerie] = useState({
        id:'',
        title: '',
        overview: '',
        poster_path: '',
        popularity: '',
        tags: []
    })

    const { loading, error, data } = useQuery(GET_SERIE_BY_ID, {
        variables: { serieId: id },
        onCompleted: () => {
            const { title, overview, poster_path, popularity, tags } = data.serie
            setTags(JSON.parse(JSON.stringify(tags)))
            setSerie({ ...serie, id, title, overview, poster_path, popularity, tags })
        }
    });

    const [updateSerie] = useMutation(UPDATE_SERIE, {
        refetchQueries: [{
            query: GET_DATA
          }]
    })
    const history = useHistory()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === 'popularity') { value = Number(value) }
        setSerie({ ...serie, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateSerie({
            variables: {
                newData: serie
            }
        })
        history.push('/')
    }

    return (
        <div className="container">
            <h1 className="mt-3 mb-3 text-white d-flex justify-content-center">Edit TV Series</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-white">Title</label>
                    <input onChange={handleChange} value={serie.title} name="title" className="form-control" placeholder="Input title" />
                </div>
                <div className="form-group">
                    <label className="text-white">Overview</label>
                    <textarea onChange={handleChange} value={serie.overview} name="overview" className="form-control" placeholder="Describe the serie briefly" />
                </div>
                <div className="form-group">
                    <label className="text-white">Poster Path</label>
                    <input onChange={handleChange} value={serie.poster_path} name="poster_path" className="form-control" placeholder="Input poster URL" />
                </div>
                <div className="form-group">
                    <label className="text-white">Popularity</label>
                    <input onChange={handleChange} value={serie.popularity} name="popularity" className="form-control" placeholder="Range 1-5" />
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
                                    setSerie({ ...serie, tags: JSON.parse(JSON.stringify(tags)) })
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
