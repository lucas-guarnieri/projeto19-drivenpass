import { SecureNote } from "@prisma/client";
import secureNotesRepository from "../repositories/secureNotesRepository.js";
import authUtils from "../utils/authUtils.js";

export type CreateNote = Omit<SecureNote, "id">

async function insertNote(newNote: CreateNote) {
    const existingNote = await secureNotesRepository.findByTitleUserId(
        newNote.title,
        newNote.userId
    );
    if (existingNote) throw { type: "conflict", message: "note title already in use" };
    await secureNotesRepository.insert(newNote);
}

async function getNote(noteId: number, userId: number) {
    const note = await getNoteById(noteId);
    authUtils.checkObejtctAuthor(note.userId, userId);
    return note;
}

async function getNotes(userId: number) {
    const notes = await secureNotesRepository.findByUserId(userId);
    return notes;
}

async function deleteNote(noteId: number, userId: number) {
    const note = await getNoteById(noteId);
    authUtils.checkObejtctAuthor(note.userId, userId);
    await secureNotesRepository.deleteById(noteId);
}

async function getNoteById(noteId: number) {
    const note = await secureNotesRepository.findById(noteId);
    if (!note) throw { type: "not_found", message: "note not found" };
    return note;
}

export default {
    insertNote,
    getNote,
    getNotes,
    deleteNote
}