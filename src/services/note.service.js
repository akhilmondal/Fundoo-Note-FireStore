import { Note } from '../config/firestore';
import noteModel from '../models/note.model';
import firebase from 'firebase';
const db = firebase.firestore();

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

//service to get note of user
export const getAllNotes = async (body) => {
  const collectionRef = db.collection('Note');
  const querySnapshot = await collectionRef
    .where('createdBy', '==', body.createdBy)
    .get();
  const notes = [];
  querySnapshot.forEach((doc) => {
    const noteData = doc.data();
    notes.push(noteData);
  });
  return notes;
};

//Archive note
export const archiveNoteById = async (id, body) => {
  const docSnapshot = await Note.doc(id).get();
  const data = noteModel.getNoteFromFirestore(docSnapshot);
  if (data) {
    let updatedArchive = data.archive == false ? true : false;
    await Note.doc(id).update({ archive: updatedArchive });
    const docSnapshot = await Note.doc(id).get();
    const updatedNote = noteModel.getNoteFromFirestore(docSnapshot);
    return updatedNote;
  }
};

//Trash note
export const trashNoteById = async (id, body) => {
  const docSnapshot = await Note.doc(id).get();
  const data = noteModel.getNoteFromFirestore(docSnapshot);
  if (data) {
    let updatedTrash = data.trash == false ? true : false;
    await Note.doc(id).update({ trash: updatedTrash });
    const docSnapshot = await Note.doc(id).get();
    const updatedNote = noteModel.getNoteFromFirestore(docSnapshot);
    return updatedNote;
  }
};
