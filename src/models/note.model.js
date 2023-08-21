function createNote(id, title, description, color, trash, archive, createdBy) {
  return {
    id: id,
    title: title,
    description: description,
    color: color,
    trash: trash,
    archive: archive,
    createdBy: createdBy,
    toFirestore: function () {
      return {
        title: this.title,
        description: this.description,
        color: this.color,
        trash: this.trash,
        archive: this.archive,
        createdBy: this.createdBy
      };
    }
  };
}
//Returning the response in proper format
function getNoteFromFirestore(doc) {
  const data = doc.data();
  return createNote(
    doc.id,
    data.title,
    data.description,
    data.color,
    data.trash,
    data.archive,
    data.createdBy
  );
}

const note = {
  createNote,
  getNoteFromFirestore
};

export default note;
