import database from "../database/database.js";

const getAll = () => {
  return database.database.owners;
};

const addOwner = (newOwner) => {
  database.database.owners.push(newOwner);
};

const resetAll=(newOwnersList)=> {
    database.database.owners = newOwnersList
}

const getById = (id)=> {
    let owners = getAll()
    let requestedOwner = owners.find(owner => owner.id===id)

    return requestedOwner ? requestedOwner :{}
}

export default {
  getAll,
  addOwner,
  resetAll,
  getById
};