const {Movie, Genre, Actor} = require("../../database/models");
const {Op} = require("sequelize");

module.exports = {
    showAll:async(req, res)=>{
        try {
            const movie =await Movie.findAll();
            if (movie.length > 0) {
                let respuesta = {
                 metadata: {
                    status: 200,
                      cantidad: movie.length,
                },
                resultados: movie
            }
            
        res.json(respuesta);
        }
        } catch (error) {
            console.log(error);
        }
    }
}