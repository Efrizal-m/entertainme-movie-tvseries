const { default: axios } = require('axios')

class MovieModel {
    static find(){
        return axios.get('http://localhost:4001/movies')
    }

    static findOne(id){
        return axios.get('http://localhost:4001/movies/'+id)
    }


    static create(payload){
        const { title, overview, poster_path, popularity, tags } = payload
        return axios.post('http://localhost:4001/movies', { data: { title, overview, poster_path, popularity, tags } })
    }

    static update(id, payload){
        const { title, overview, poster_path, popularity, tags } = payload
        return axios.put('http://localhost:4001/movies/'+id, { data: { title, overview, poster_path, popularity, tags } })
    }

    static delete(id){
        return axios.delete('http://localhost:4001/movies/'+id)
    }
}

module.exports = MovieModel