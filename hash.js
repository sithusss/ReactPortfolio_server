import { hash } from 'bcryptjs';

const generateHash = async () => {
  const hashed = await hash("my2007840", 10);
  console.log(hashed);
};

generateHash();
