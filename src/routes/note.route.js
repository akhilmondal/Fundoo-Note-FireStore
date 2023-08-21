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

export default router;
