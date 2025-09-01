import userModel from "../Models/user.model.js";
export const createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
    const user= await userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password
    })
    return user;
};
