import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', userAuth, NoteController.newNote);

//route to update note by id
router.put('/:_id', userAuth, NoteController.updateNoteById);

//delete note by Id
router.delete('/:_id', userAuth, NoteController.deleteNoteById);

//route to get all note
router.get('', userAuth, NoteController.getAllNotes);

//archive note by id
router.put('/archive/:_id', userAuth, NoteController.archiveNoteById);

//trash note by id
router.put('/trash/:_id', userAuth, NoteController.trashNoteById);
export default router;
