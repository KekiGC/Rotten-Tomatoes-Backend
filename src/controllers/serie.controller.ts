import { Request, Response } from "express";
import Serie from "../models/serie";
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
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}?api_key=ddeb2fc989f1840de99b5c1371708693`);
        return res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};