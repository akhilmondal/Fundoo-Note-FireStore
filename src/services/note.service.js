import { Note } from '../config/firestore';
import noteModel from '../models/note.model';

//Service for create note
export const newNote = async (
  id,
  title,
  description,
  color,
  trash,
  archive,
  createdBy
) => {
  const note = noteModel.createNote(
    id,
    title,
    description,
    color,
    trash,
    archive,
    createdBy
  );
  const data = await Note.add(note.toFirestore());
  const docSnapshot = await data.get();
  const addedNote = noteModel.getNoteFromFirestore(docSnapshot);
  return addedNote;
};

//service for update note
export const updateNoteById = async (id, body) => {
  await Note.doc(id).update(body);
  const docSnapshot = await Note.doc(id).get();
  const updatedNote = noteModel.getNoteFromFirestore(docSnapshot);
  return updatedNote;
};

//service to delete note
export const deleteNoteById = async (id) => {
  await Note.doc(id).delete(); 
  return '';
};
