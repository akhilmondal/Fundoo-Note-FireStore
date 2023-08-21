import { Note } from '../config/firestore';
import noteModel from '../models/note.model';

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
