const {Movie, Genre, Actor} = require("../database/models");
const {Op} = require("sequelize");
const moment = require("moment");
module.exports = {
    showAll:async(req, res)=>{
        try {
            const movie =await Movie.findAll();
            //res.json(movie);
        res.render("./movies", {movie});
        } catch (error) {
            console.log(error);
        }
    },
    detail:async (req, res)=>{
        let idMovie = req.params.id
        try {
            let genres = await Genre.findAll();
            let actors = await Actor.findAll();
            let detail = await Movie.findByPk(idMovie, {
                include: {all: true}
            });
            
            
            detail.release_date = moment(detail.release_date).format("YYYY-MM-DD");
            res.render("./detail", {detail, genres, actors});
            //res.render();

        } catch (error) {
            console.log(error);
        }
    },
    new:async(req, res)=>{
        try {
            let lastFive = await Movie.findAll({
                order: [
                    ["release_date","DESC"]
                ],
                limit: 5,

            })
            res.render("./news", {lastFive});

        } catch (error){
            console.log(error)
        }

    },
    recommended:async(req, res)=>{
        try {
            let top = await Movie.findAll({
                where: {
                    rating: {[Op.gt]: 8}
                }
            })
            res.render("./top", {top});
        } catch (error){
            console.log(error)
        }
    },
    search: async (req, res)=>{
        try {
            let searchMovies = await Movie.findAll({
                where: {
                    title:{
                        [Op.like]: "%" + req.body.search + "%"
                    }
                }
            })
            res.render("search", {searchMovies})
        } catch (error){
            console.log(error);
        }
    },
    create : async (req, res)=>{
        try {
            let genres = await Genre.findAll();
            let actors = await Actor.findAll()
            res.render("createMovie", {genres, actors});
        } catch (error) {
            console.log(error);
        };
        
    },

    createNow: async (req,res)=>{
        try {
        let newMovie = await Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,

        });
        await newMovie.addActors(req.body.actors);
        console.log(req.body);
        res.redirect("/movies")
        } catch (error) {
        console.log(error);
        }
    },
    edit:async (req,res)=>{
        try {
         let editMovie = req.params.id;
         let edit = await Movie.findByPk(editMovie);
         let genres = await Genre.findAll();
         console.log(edit);
            res.render("edit", {edit, genres});
        } catch   (error){
            console.log(error);
        }  
    },
    editNow: async (req, res)=>{
        try {
            let editMovies = req.params.id;
            let editNowMovies = await Movie.findByPk(editMovies);
            await editNowMovies.update(req.body);
            res.redirect("/movies");
        } catch (error){
            console.log(error);
        }
    },
    delete: async (req, res)=>{
        try {
            let idMovie = req.params.id;
            let oldMovie = await Movie.findByPk(idMovie, {
                include: ["actors"]
            });
            await oldMovie.removeActors(oldMovie.actors);
            await oldMovie.destroy();
            res.redirect("/movies")
        }catch (error){
            console.log(error);
        }
    },
    genre:async (req, res)=>{
        let idGenre = req.params.id;
        try {
            let genre = await Genre.findByPk(idGenre);
            let movies = await Movie.findAll();
            let movieArray = [];
            for (let i = 0; i < movies.length; i ++){
                if (idGenre == movies[i].genre_id){
                    movieArray.push(movies[i]);
                }
            }
        console.log(movieArray);
           res.render("genre", {genre, movieArray});
           //res.json(movies);
        } catch (error) {
            console.log(error);
        }
    },
    actor: async (req, res)=>{
        let idActor = req.params.id;
        try {
            let actor = await Actor.findByPk(idActor);
            let movies = await Movie.findAll();
            let movieArray = [];
            for (let i = 0; i < movies.length; i ++){
                if (idActor == movies[i].genre_id){
                    movieArray.push(movies[i]);
                }
            }console.log(movieArray);

            res.render("actor", {actor, movieArray});
            //res.json();
        } catch (error) {
            console.log(error);
        }
    },
    newPerformance: async (req, res)=>{
        try {
                let actors = await Actor.findAll();
                let movies = await Movie.findAll();

        res.render("newPerformance", {actors, movies});
    }   catch (error){
        console.log(error);
    }
  }
    
}

        
    



            
    

    


