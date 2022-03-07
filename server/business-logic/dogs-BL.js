import dogsDal from "../data-access-layer/dogs-dal.js";
import { isObjEmpty } from "../common/helper.js";
import ownersDal from "../data-access-layer/owners-dal.js";

const getAll = () => {
  return dogsDal.getAll();
};

const getById = (id) => {
  let dogs = dogsDal.getAll();
  let requestedDog = dogs.find((dog) => dog.id === id);

  return requestedDog ? requestedDog : {};
};

const addDog = (newDog) => {
  let dogs = dogsDal.getAll();
  let lastId = dogs[dogs.length - 1].id;

  const preparedDogObj = {
    id: lastId + 1,
    ...newDog,
  };
  dogsDal.addDog(preparedDogObj);

  return preparedDogObj;
};

const deleteById = (id) => {
  let dogs = dogsDal.getAll();
  let filteredList = dogs.filter((dog) => dog.id !== id);

  dogsDal.resetAll(filteredList);
};

const getOwnerDetailsById = (id) => {
  let requestedOwnerObj = {};
  /* to do:
 1. getById -> ownerId
 2. get from owners table owner.id === ownerId -> row */
  let requestedDog = getById(id);

  if (isObjEmpty(requestedDog) || !requestedDog.ownerId) {
    //!= not null === true
    return {};
  }
  let ownerId = requestedDog.ownerId;
  requestedOwnerObj = ownersDal.getById(ownerId);

  return requestedOwnerObj ? requestedOwnerObj : {};
};

const getOwnerPhoneById = (id) => {
  let ownerObj = getOwnerDetailsById(id);
  return ownerObj.phone;
};

const getOwnerWithMostDogs = () => {
  let dogs = dogsDal.getAll();
  let ownersCounter = {};
  let max = {
    counter:0,
    ownerId:-1
  }

  for (let dog of dogs) {
    //ownerid ===null
    if (dog.ownerId) {
      if (ownersCounter[dog.ownerId.toString()]) {
        ownersCounter[dog.ownerId.toString()]+=1
      } else{
        ownersCounter[dog.ownerId.toString()]=1
      }
      if(max.counter < ownersCounter[dog.ownerId.toString()]){
        max.ownerId =  dog.ownerId.toString()
        max.counter = ownersCounter[dog.ownerId.toString()]
      }
    }
  }
 let requestedOwnerObj= ownersDal.getById(+max.ownerId)
  return requestedOwnerObj
};

export default {
  getAll,
  getById,
  addDog,
  deleteById,
  getOwnerDetailsById,
  getOwnerPhoneById,
  getOwnerWithMostDogs,
};
