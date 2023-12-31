import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const newNote = async (req, res, next) => {
  try {
    let { id, title, description, color, archive, trash, createdBy } = req.body;
    const data = await NoteService.newNote(
      id,
      title,
      description,
      color,
      archive,
      trash,
      createdBy
    );
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller to update note by id
export const updateNoteById = async (req, res, next) => {
  try {
    const data = await NoteService.updateNoteById(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller to delete note by Id
export const deleteNoteById = async (req, res, next) => {
  try {
    await NoteService.deleteNoteById(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller to get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller for Archive Note
export const archiveNoteById = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNoteById(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note archived successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Controller for trash Note
export const trashNoteById = async (req, res, next) => {
  try {
    const data = await NoteService.trashNoteById(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note trashed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};