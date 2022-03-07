import database from "../database/database.js";

const getAll = () => {
  return database.database.dogs;
};

const addDog = (newDog) => {
  database.database.dogs.push(newDog);
};

const resetAll=(newDogsList)=> {
    database.database.dogs = newDogsList
}

export default {
  getAll,
  addDog,
  resetAll
};
