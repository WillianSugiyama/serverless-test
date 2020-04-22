import bcrypt from 'bcryptjs';

export default async function (password, userPassword) {
  try {
    const passIsValid = await bcrypt.compareSync(password, userPassword);

    return passIsValid;
  } catch (error) {
    throw new Error(error);
  };
}