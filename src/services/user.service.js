import User from '../config/firestore';
import userModel from '../models/user.model';

//create new user
export const newUser = async (id, fullName, emailId, passWord) => {
  try {
    const user = userModel.createUser(id, fullName, emailId, passWord);
    const data = await User.add(user.toFirestore());

    //getting unformatted response from the firestore database
    const docSnapshot = await data.get();

    //passing that whole data into the function to filter out only required data.
    const addedUser = userModel.getUserFromFirestore(docSnapshot);
    return addedUser;
  } catch (error) {
    throw new Error('User not created/added to the firestore database');
  }
};
