module.exports = {
    apps : [
        {
            name    : 'entertainme - Client',
            script  : 'cd client && npm i && npm start',
            env     : {
                PORT    : 4000
            }
        },
        {
            name    : 'entertainme - Service Movies',
            script  : 'cd server/services/movies && npm i && nodemon app.js',
            env     : {
                DATABASE_NAME: 'entertainme',
                COLLECTION_NAME: 'movies',
                PORT    : 4001
            }
        },
        {
            name    : 'entertainme - Service TV Series',
            script  : 'cd server/services/series && npm i && nodemon app.js',
            env     : {
                DATABASE_NAME: 'entertainme',
                COLLECTION_NAME: 'tvSeries',
                PORT    : 4002
            }
        }
    ]
}