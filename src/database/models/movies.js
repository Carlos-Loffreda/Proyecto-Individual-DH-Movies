const {sequelize, DataTypes} = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes)=>{
    const Movie = sequelize.define("Movie",{
            title: DataTypes.STRING,
            rating: DataTypes.INTEGER,
            awards: DataTypes.INTEGER,
            length: DataTypes.INTEGER,
            release_date: {
                type: DataTypes.DATEONLY,
                get() {
                    return moment(this.getDataValue('release_date')).add(3, 'hours').format('DD-MM-YYYY');
                }
            },
            genre_id: DataTypes.INTEGER
        },
       

        {
            tableName: "movies", //nombre de la tabla (es opcional si tienen los mismos nombres)
            timestamps: false  //si la tabla no tiene columnas de registro de creacion y actualizacion de registros, debe escribirse
        });
        Movie.associate = models=>{
            Movie.belongsTo(models.Genre);
               Movie.belongsToMany(models.Actor, {
                as: "actors", 
                through: "actor_movie"
            })
        };
        


        return Movie;
}