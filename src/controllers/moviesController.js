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
           // res.json(detail);

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
            actors: req.body.actors,
        });
        await newMovie.addActors(req.body.actors);
        console.log(req.body);
       res.redirect("/movies")
        //res.json(newMovie)
        } catch (error) {
        console.log(error);
        }
    },
    edit:async (req,res)=>{
        try {
         let editMovie = req.params.id;
         const edit = await Movie.findByPk(editMovie, {include: ['Genre', 'actors']});
         let genres = await Genre.findAll();
         let actors = await Actor.findAll();
         console.log(edit);
            res.render("edit", {edit, genres, actors});
           //res.json(edit);
        } catch   (error){
            console.log(error);
        }  
    },
    editNow: async (req, res)=>{
        try {
            let editMovies = req.params.id;
            let editNowMovies = await Movie.findByPk(editMovies, {include: "actors"});
            await editNowMovies.removeActors(editNowMovies.actors);
            await editNowMovies.addActors(req.body.actors)
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
        } catch (error) {
            console.log(error);
        }
    },
    actor: async (req, res)=>{
        let idActor = req.params.id;
        try {
            let actor = await Actor.findByPk(idActor, {
                include: "movies"});
            res.render("actor", {actor});
            //res.json(actor);
        } catch (error) {
            console.log(error);

    }
    },
    newPerformance: async (req, res)=>{
        try {
            let editMovie = req.params.id;
            const edit = await Movie.findByPk(editMovie, {include: "actors"});
            let actors = await Actor.findAll();
            let movies = await Movie.findAll();

        res.render("newPerformance", {edit, actors, movies});
    }   catch (error){
        console.log(error);
    }
    },
    newPerformanceNow: async (req,res)=>{
        try {
         let newMovie = req.body.movies_id;
         let edit = await Movie.findByPk(newMovie, {include: ["movies", "actors"]})
         await edit.addActors(req.body.actors_id);
         await edit.update(req.body);
         //res.json(edit);
         res.render("edit", {edit, genres, actors});
        } catch   (error){
            console.log(error);
        }
    }  
}



    


        
    



            
    

    


