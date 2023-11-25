import { Request, Response } from 'express';
import Movie, { IMovie } from '../models/movie';
import axios from 'axios';

// getmovies with trycatch
export const getMovies = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY');
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// getmovie with trycatch
export const getMovie = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);
        return res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// deletemovie with trycatch
export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;
        await Movie.findByIdAndDelete(movieId);
        return res.status(200).json({ msg: 'Movie deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// add public rating with trycatch
export const addPublicRating = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;
        const { rating } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ msg: 'Movie not found' });
        const newAverage =
            (movie.publicRating.average * movie.publicRating.count + rating) /
            (movie.publicRating.count + 1);
        movie.publicRating.average = newAverage;
        movie.publicRating.count++;
        await movie.save();
        return res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

// add critic rating with trycatch