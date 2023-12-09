import { Request, Response } from "express";
import Movie, { IMovie } from "../models/movie";
import User, { IUser } from "../models/user";
import axios from "axios";

// get popular movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=30cddc8f56542b9d585e5b5c035aab19"
    );
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
    // Verificar si la película ya existe en la base de datos
    const existingMovie = await Movie.findOne({apiId: movieId});
    if (existingMovie) {
      return res.status(200).json(existingMovie);
    } else {
      // Obtener la película de la API
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=30cddc8f56542b9d585e5b5c035aab19`
      );
      const movieData = response.data;

      // Obtener los géneros de la respuesta de la API
      const genres = movieData.genres.map((genre: { id: number; name: string }) => ({
        id: genre.id,
        name: genre.name,
      }));

      // Guardar la película en la base de datos
      const movie = new Movie({
        apiId: movieData.id,
        title: movieData.title,
        image: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        genres: genres,
        description: movieData.overview,
      });

      await movie.save();

      return res.status(200).json(movieData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// getmovies by genre with trycatch
export const getMoviesByGenre = async (req: Request, res: Response) => {
  try {
    const { genre } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=30cddc8f56542b9d585e5b5c035aab19&with_genres=${genre}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// getmovies by duration with trycatch
export const getMoviesByDuration = async (req: Request, res: Response) => {
  try {
    const { duration } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=30cddc8f56542b9d585e5b5c035aab19&with_runtime.gte=${duration}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get top rated movies
export const getTopRatedMovies = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=30cddc8f56542b9d585e5b5c035aab19"
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getActors = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/multi?api_key=30cddc8f56542b9d585e5b5c035aab19&query=brad%20pitt"
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// getMovieTrailer with trycatch
export const getMovieTrailer = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=30cddc8f56542b9d585e5b5c035aab19`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// deletemovie with trycatch
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    await Movie.findOneAndDelete({ apiId: movieId });
    return res.status(200).json({ msg: "Movie deleted successfully" });
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
    const movie = await Movie.findOne({ apiId: movieId });
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    // validar que el rating sea un número entre 1 y 5
    if (rating < 1 || rating > 5) 
    return res.status(400).json({ msg: "Rating must be between 1 and 5" });

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
export const addCriticRating = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { rating, userId } = req.body;

    const movie = await Movie.findOne({ apiId: movieId });
    if (!movie) {
        return res.status(404).json({ msg: "Movie not found" });
    }

    // validar que el rating sea un número entre 1 y 5
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: "Rating must be between 1 and 5" });
    }

    // validar que el usuario sea crítico
    const user = await User.findById(userId);
    if (!user?.isCritic) {
        return res.status(401).json({ msg: "Only critics can add critic ratings" })
    }

    const newAverage =
      (movie.criticRating.average * movie.criticRating.count + rating) /
      (movie.criticRating.count + 1);
    movie.criticRating.average = newAverage;
    movie.criticRating.count++;
    await movie.save();
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


// add comment with trycatch
export const addComment = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { userId, text } = req.body;
    const movie = await Movie.findOne({ apiId: movieId });
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    movie.comments.push({ user: userId, text: text });
    await movie.save();
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


export const getMovieByTitle = async (req: Request, res: Response) => {
    try {
      const { title } = req.params;
  
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=30cddc8f56542b9d585e5b5c035aab19&query=${encodeURIComponent(title)}`);

      const movieData = response.data.results; // Obtener la primera película encontrada

  
      if (!movieData) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
  
      return res.status(200).json(movieData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

