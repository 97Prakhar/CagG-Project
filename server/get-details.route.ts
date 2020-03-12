import { Request, Response } from 'express';
import { details } from "./db-details";

export function getAllDetails(req: Request, res: Response) {
    res.status(200).json({ payload: Object.values(details) });
}

export function getDetailsByMentor(req: Request, res: Response) {
    const mentorDetails = req.params["mentor"];
    const allDetails: any = Object.values(details);
    const mentorList = allDetails.find(detail => detail.mentor == mentorDetails);
    res.status(200).json(mentorList);
}
