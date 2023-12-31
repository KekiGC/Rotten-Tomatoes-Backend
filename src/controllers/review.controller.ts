import { Request, Response } from "express";
import Review from "../models/review";
import Movie, { IMovie } from "../models/movie";
import Serie, { ISerie } from "../models/serie";
import User from "../models/user";

export const createMovieReview = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { userId, rating, content } = req.body;

    const movie: IMovie | null = await Movie.findOne({
      apiId: movieId,
    }).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
    });
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    if (userId) {
      // Si se proporciona el ID del usuario, verificar si es crítico
      const user = await User.findById(userId);
      if (!user?.isCritic) {
        return res.status(401).json({ msg: "User is not a critic" });
      } else {
        const review = new Review({
          user: userId,
          movie: movie._id,
          rating,
          content,
        });

        await review.save();
        movie.reviews.push(review._id);
        await movie.save();
        return res.status(201).json(review);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getMovieReviews = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;

    const movie: IMovie | null = await Movie.findOne({
      apiId: movieId,
    }).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
    });

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    console.log("holaaaaaa", movie.reviews);
    return res.status(200).json(movie.reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// create serie review
export const createSerieReview = async (req: Request, res: Response) => {
  try {
    const { serieId } = req.params;
    const { userId, rating, content } = req.body;

    const serie: ISerie | null = await Serie.findOne({
      apiId: serieId,
    }).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
    });
    if (!serie) {
      return res.status(404).json({ msg: "Serie not found" });
    }

    if (userId) {
      // Si se proporciona el ID del usuario, verificar si es crítico
      const user = await User.findById(userId);
      if (!user?.isCritic) {
        return res.status(401).json({ msg: "User is not a critic" });
      } else {
        const review = new Review({
          user: userId,
          serie: serie._id,
          rating,
          content,
        });

        await review.save();
        serie.reviews.push(review._id);
        await serie.save();
        return res.status(201).json(review);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get serie reviews
export const getSerieReviews = async (req: Request, res: Response) => {
  try {
    const { serieId } = req.params;

    const serie: ISerie | null = await Serie.findOne({
      apiId: serieId,
    }).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
    });

    if (!serie) {
      return res.status(404).json({ msg: "Serie not found" });
    }

    return res.status(200).json(serie.reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
