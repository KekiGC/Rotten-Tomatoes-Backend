import { Request, Response } from "express";
import Movie, { IMovie } from "../models/movie";
import User, { IUser } from "../models/user";
import Comment from "../models/comment";
import axios from "axios";

// get popular movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=ddeb2fc989f1840de99b5c1371708693"
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
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ddeb2fc989f1840de99b5c1371708693`
      );
      const movieData = response.data;

      // Obtener los géneros de la respuesta de la API
      const genres = movieData.genres.map((genre: { id: number; name: string }) => ({
        id: genre.id,
        name: genre.name,
      }));

      // Guardar la película en la base de datos
      const movie = new Movie({
        apiId: movieId,
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
      `https://api.themoviedb.org/3/discover/movie?api_key=ddeb2fc989f1840de99b5c1371708693&with_genres=${genre}`
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
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ddeb2fc989f1840de99b5c1371708693"
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
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ddeb2fc989f1840de99b5c1371708693`
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

export const addRating = async (req: Request, res: Response) => {
    try {
      const { movieId } = req.params;
      const { rating, userId } = req.body;
  
      const movie = await Movie.findOne({ apiId: movieId });
      if (!movie) {
        return res.status(404).json({ msg: "Movie not found" });
      }
  
      // Validar que el rating sea un número entre 1 y 10
      if (rating < 1 || rating > 10) {
        return res.status(400).json({ msg: "Rating must be between 1 and 10" });
      }
  
      if (userId) {
        // Si se proporciona el ID del usuario, verificar si es crítico
        const user = await User.findById(userId);
        if (!user?.isCritic) {
          const newAverage =
            (movie.publicRating.average * movie.publicRating.count + rating) /
            (movie.publicRating.count + 1);
          movie.publicRating.average = newAverage;
          movie.publicRating.count++;
          user?.moviesRated.push({ movie: movie._id, rating });
        } else {
          const newAverage =
            (movie.criticRating.average * movie.criticRating.count + rating) /
            (movie.criticRating.count + 1);
          movie.criticRating.average = newAverage;
          movie.criticRating.count++;
          user?.moviesRated.push({ movie: movie._id, rating });
        }
  
      } 

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

    const movie: IMovie | null = await Movie.findOne({ apiId: movieId });
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    const comment = new Comment({
      user: userId,
      text,
      replies: [],
    });
    await comment.save();

    movie.comments.push(comment._id);
    await movie.save();

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get the comments of a movie
export const getComments = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;

    const movie: IMovie | null = await Movie.findOne({ apiId: movieId }).populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'username',
      },
    }).populate({
      path: 'comments',
      populate: {
        path: 'replies.user',
        select: 'username',
      },
    })
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    return res.status(200).json(movie.comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addReply = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { userId, text } = req.body;

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ msg: "Parent comment not found" });
    }

    const reply = new Comment({
      user: userId,
      text,
    });
    await reply.save();

    parentComment.replies.push(reply);
    await parentComment.save();

    return res.status(200).json(parentComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get movie by title
export const getMovieByTitle = async (req: Request, res: Response) => {
    try {
      const { title } = req.params;
  
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ddeb2fc989f1840de99b5c1371708693&query=${encodeURIComponent(title)}`);

      const movieData = response.data.results; // array de películas
  
      if (!movieData) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
  
      return res.status(200).json(movieData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

// get movie reviews from api
// export const getApiReviews = async (req: Request, res: Response) => {
//   try {
//     const { movieId } = req.params;
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ddeb2fc989f1840de99b5c1371708693`
//     );
//     return res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// };

// filter movies by genre, duration, year and sort by
export const movieFilter = async (req: Request, res: Response) => {
  try {
    const { genre, duration, year, sortBy } = req.body;
    let query = `https://api.themoviedb.org/3/discover/movie?api_key=ddeb2fc989f1840de99b5c1371708693`;
    
    if (genre) query += `&with_genres=${genre}`;
    if (duration) query += `&with_runtime.gte=${duration}`;
    if (year) query += `&primary_release_year=${year}`;
    if (sortBy) query += `&sort_by=${sortBy}`;
    
    const response = await axios.get(query);
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

