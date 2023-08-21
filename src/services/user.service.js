import firebase from 'firebase';
import User from '../config/firestore';
import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
const db = firebase.firestore();

//create new user
export const newUser = async (id, firstName, lastName, emailId, passWord) => {
  const collectionRef = db.collection('User');

  // Query for the email
  const querySnapshot = await collectionRef
    .where('emailId', '==', emailId)
    .get();

  if (!querySnapshot.empty) {
    throw new Error('User is already Present');
  } else {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(passWord, salt);
    passWord = hash;
    const user = userModel.createUser(
      id,
      firstName,
      lastName,
      emailId,
      passWord
    );
    const data = await User.add(user.toFirestore());

    //getting unformatted response from the firestore database
    const docSnapshot = await data.get();

    //passing that whole data into the function to filter out only required data.
    const addedUser = userModel.getUserFromFirestore(docSnapshot);
    return addedUser;
  }
};
