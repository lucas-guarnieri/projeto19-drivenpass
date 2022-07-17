import { Request, Response } from "express";

import secureNotesServices from "../services/secureNotesServices.js";
import { CreateNote } from "../services/secureNotesServices.js";

export async function createSecureNote(req: Request, res: Response) {
    const { title, note } = req.body;
    const { userId } = res.locals.tokenData;
    const newNote: CreateNote = {
        title,
        note,
        userId
    };
    await secureNotesServices.insertNote(newNote);
    res.sendStatus(201);
}

export async function getUserNote(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const noteQuery = req.query.id as string;
    const noteId = parseInt(noteQuery);
    if (noteQuery) {
        const note = await secureNotesServices.getNote(noteId, userId);
        res.status(200).send(note);
    }
    const notes = await secureNotesServices.getNotes(userId);
    res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const noteParams = req.params.id as string;
    const noteId = parseInt(noteParams);
    await secureNotesServices.deleteNote(noteId, userId);
    res.sendStatus(200);
}