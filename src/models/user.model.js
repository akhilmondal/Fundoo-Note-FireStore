function createUser(id, fullName, emailId, passWord) {
  return {
    id: id,
    fullName: fullName,
    emailId: emailId,
    passWord: passWord,
    toFirestore: function () {
      return {
        fullName: this.fullName,
        emailId: this.emailId,
        passWord: this.passWord
      };
    }
  };
}
//Returning the response in proper format
function getUserFromFirestore(doc) {
  const data = doc.data();
  return createUser(doc.id, data.fullName, data.emailId, data.passWord);
}

const user = {
  createUser,
  getUserFromFirestore
};

export default user;