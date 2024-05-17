// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  {
    id: 1,
    name: 'coding ninjas',
    email: 'ninja@gmail.com',
    image: 'https://entrackr.com/storage/2022/10/Coding-Ninjas.jpg',
  },
];

export const updateUsers = (user) => {
  // Write your code here
  const index = users.findIndex((user) => user.id === user.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
    return users[index];
  } else {
    return false;
  }
};
