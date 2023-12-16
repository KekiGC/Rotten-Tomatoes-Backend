import { Request, Response } from "express";
import Serie, { ISerie } from "../models/serie";
import User from "../models/user";
import Comment from "../models/comment";
import axios from "axios";

// serie filter
export const serieFilter = async (req: Request, res: Response) => {
  try {
    const { genre, duration, year, sortBy } = req.body;
    let query = `https://api.themoviedb.org/3/discover/tv?api_key=ddeb2fc989f1840de99b5c1371708693`;

    if (genre) query += `&with_genres=${genre}`;
    if (duration) query += `&with_runtime.gte=${duration}`;
    if (year) query += `&first_air_date_year=${year}`;
    if (sortBy) query += `&sort_by=${sortBy}`;

    const response = await axios.get(query);
    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get serie by id
export const getSerie = async (req: Request, res: Response) => {
  try {
    const { serieId } = req.params;

    // verificar si la serie ya existe en la base de datos
    const existingSerie = await Serie.findOne({ apiId: serieId });
    if (existingSerie) {
      return res.status(200).json(existingSerie);
    } else {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=ddeb2fc989f1840de99b5c1371708693`
      );
      const serieData = response.data;
      console.log(serieData.seasons);

      const genres = serieData.genres.map(
        (genre: { id: number; name: string }) => ({
          id: genre.id,
          name: genre.name,
        })
      );

      // guardar la serie en la base de datos
      const serie = new Serie({
        apiId: serieData.id,
        name: serieData.name,
        image: `https://image.tmdb.org/t/p/w500${serieData.poster_path}`,
        genres: genres,
        description: serieData.overview,
        seasons: serieData.seasons,
      });

      await serie.save();
      return res.status(200).json(serieData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// delete serie by id
export const deleteSerie = async (req: Request, res: Response) => {
  try {
    const { serieId } = req.params;
    await Serie.findOneAndDelete({ apiId: serieId });
    return res.status(200).json({ msg: "Serie deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addSerieRating = async (req: Request, res: Response) => {
    try {
      const { serieId } = req.params;
      const { rating, userId } = req.body;
  
      const serie = await Serie.findOne({ apiId: serieId });
      if (!serie) {
        return res.status(404).json({ msg: "Serie not found" });
      }
  
      // check if rating is between 1 and 10
      if (rating < 1 || rating > 10) {
        return res.status(400).json({ msg: "Rating must be between 1 and 10" });
      }
  
      if (userId) {
    
        const user = await User.findById(userId);
  
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
  

        // check if user is critic
        if (!user.isCritic) {
          const newAverage =
            (serie.publicRating.average * serie.publicRating.count + rating) /
            (serie.publicRating.count + 1);
          serie.publicRating.average = newAverage;
          serie.publicRating.count++;
          
        } else {
          const newAverage =
            (serie.criticRating.average * serie.criticRating.count + rating) /
            (serie.criticRating.count + 1);
          serie.criticRating.average = newAverage;
          serie.criticRating.count++;
        }
  
      }
  
      await serie.save();
      return res.status(200).json(serie);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  export const addSerieComment = async (req: Request, res: Response) => {
    try {
      const { serieId } = req.params;
      const { userId, text } = req.body;
  
      const serie: ISerie | null = await Serie.findOne({ apiId: serieId });
      if (!serie) {
        return res.status(404).json({ msg: "Serie not found" });
      }
  
      const comment = new Comment({
        user: userId,
        text,
        replies: [],
      });
      await comment.save();
  
      serie.comments.push(comment._id);
      await serie.save();
  
      return res.status(200).json(serie);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  export const getSerieComments = async (req: Request, res: Response) => {
    try {
      const { serieId } = req.params;
  
      const serie: ISerie | null = await Serie.findOne({ apiId: serieId })
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "username",
          },
        })
        .populate({
          path: "comments",
          populate: {
            path: "replies.user",
            select: "username",
          },
        });
      if (!serie) {
        return res.status(404).json({ msg: "Serie not found" });
      }
  
      return res.status(200).json(serie.comments);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };