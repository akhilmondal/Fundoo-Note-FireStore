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
