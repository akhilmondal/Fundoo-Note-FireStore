function createUser(id, firstName, lastName, emailId, passWord) {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    emailId: emailId,
    passWord: passWord,
    toFirestore: function () {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        emailId: this.emailId,
        passWord: this.passWord
      };
    }
  };
}

//Returning the response in proper format
function getUserFromFirestore(doc) {
  const data = doc.data();
  return createUser(
    doc.id,
    data.firstName,
    data.lastName,
    data.emailId,
    data.passWord
  );
}

const user = {
  createUser,
  getUserFromFirestore
};

export default user;
