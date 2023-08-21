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

  //getting unformatted response from the firestore database
  const docSnapshot = await data.get();

  //passing that whole data into the function to filter out only required data.
  const addedNote = noteModel.getNoteFromFirestore(docSnapshot);
  return addedNote;
};

//service for update note
export const updateNoteById = async (id, body) => {
  //searching for the document with id and updating with new data of body.
  await Note.doc(id).update(body);
  //Fetching the whole data.
  const docSnapshot = await Note.doc(id).get();
  //formating it for a proper response.
  const updatedNote = noteModel.getNoteFromFirestore(docSnapshot);
  return updatedNote;
};
