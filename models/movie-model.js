const conexion = require('./movie-connection'),
      MovieModel = () => {}

MovieModel.getAll = (cb) => {
  conexion
    .find()
    .exec( (err, docs) => {
      if (err) throw err
      cb(docs)
    })
}

MovieModel.getOne = (id, cb) => {
  conexion
    .findOne({ movie_id : id })
    .exec((err, docs) => {
      if(err) throw err
      cb(docs)
    })
}

MovieModel.save = (data, cb) => {
  conexion
    .count({ movie_id : data.movie_id })
    .exec( (err, count) => {
      if(err) throw err
      console.log(`Número de Docs: ${count}`)

      if(count == 0) {
        conexion.create(data, (err) => {
          if(err) throw err
          cb()
        })
      } else if( count == 1) {
        conexion.findOneAndUpdate(
          { movie_id : data.movie_id },
          {
            title : data.title,
            release_year : data.release_year,
            rating : data.rating,
            image : data.image
          },
          (err) => {
            if(err) throw(err)
            cb()
          })
      }
    })
}

MovieModel.delete = (id, cb) => {
  conexion.remove( { movie_id : id }, (err, docs) => {
    if(err) throw err
    cb()
  })
}

module.exports = MovieModel