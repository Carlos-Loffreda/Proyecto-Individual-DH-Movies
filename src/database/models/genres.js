const {sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes)=>{
    const Genre = sequelize.define("Genre", {
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.INTEGER
    },
    {
        tableName: "genres", //nombre de la tabla (es opcional si tienen los mismos nombres)
        timestamps: false  //si la tabla no tiene columnas de registro de creacion y actualizacion de registros, debe escribirse
    })
    
    Genre.associate = models=> {
        Genre.hasMany(models.Movie);    
    }

    return Genre;
}