const { default: axios } = require('axios')

class TvSeriesModel {
    static find(){
        return axios.get('http://localhost:4002/tvSeries')
    }

    static findOne(id){
        return axios.get('http://localhost:4002/tvSeries/'+id)
    }


    static create(payload){
        const { title, overview, poster_path, popularity, tags } = payload
        return axios.post('http://localhost:4002/tvSeries', { data: { title, overview, poster_path, popularity, tags } })
    }

    static update(id, payload){
        const { title, overview, poster_path, popularity, tags } = payload
        return axios.put('http://localhost:4002/tvSeries/'+id, { data: { title, overview, poster_path, popularity, tags } })
    }

    static delete(id){
        return axios.delete('http://localhost:4002/tvSeries/'+id)
    }
}

module.exports = TvSeriesModel