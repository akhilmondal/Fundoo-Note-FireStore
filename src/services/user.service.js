import dotenv from 'dotenv';
dotenv.config();
import firebase from 'firebase';
import User from '../config/firestore';
import userModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = firebase.firestore();

//create new user
export const newUser = async (id, firstName, lastName, emailId, passWord) => {
  const collectionRef = db.collection('User');

  // Query for the email
  const querySnapshot = await collectionRef
    .where('emailId', '==', emailId)
    .get();
  querySnapshot.forEach((doc) => {
    const data = doc.data(); // Actual data of the document
    console.log('Document ID:', doc.id);
    console.log('Document Data:', data);
    // Now you can access individual fields using data.fieldName
  });
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

//Service for login user
export const userLogin = async (emailId, passWord) => {
  const collectionRef = db.collection('User');

  // Query for the email
  const querySnapshot = await collectionRef
    .where('emailId', '==', emailId)
    .get();
  const firstDocument = querySnapshot.docs[0]; // Get the first QueryDocumentSnapshot
  const data = firstDocument.data();
  if (data) {
    if (bcrypt.compareSync(passWord, data.passWord)) {
      var token = jwt.sign(
        { id: firstDocument.id, emailId: data.emailId },
        process.env.SECRET_KEY,
        { expiresIn: '3h' }
      );
      return token;
    } else {
      throw new Error('Invalid Password.');
    }
  } else {
    throw new Error('Invalid emailId.');
  }
};
