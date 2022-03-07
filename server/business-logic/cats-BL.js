import { isObjEmpty } from "../common/helper.js";
import catsDAL from "../data-access-layer/cats-DAL.js";
import ownersDal from "../data-access-layer/owners-dal.js";

const getAll = () => {
  return catsDAL.getAll();
};

const getById = (id) => {
  let cats = catsDAL.getAll();
  let requestedCat = cats.find((cat) => cat.id === id);
  return requestedCat ? requestedCat : {};
};

const addCat = (newCat) => {
  let cats = catsDAL.getAll();
  let lastId = cats[cats.length - 1].id;

  let preparedCatObj = {
    id: lastId + 1,
    ...newCat,
  };

  catsDAL.addCat(preparedCatObj);
  return preparedCatObj;
};

const deleteById = (id) => {
  let cats = catsDAL.getAll();
  let filteredList = cats.filter((cats) => cats.id !== id);
  catsDAL.resetAll(filteredList);
};

const getOwnerDetailsById = (id) => {
  let requestedOwnerObj = {};
  let requestedCat = getById(id);

  if (isObjEmpty(requestedCat) || !requestedCat.ownerId) {
    return {};
  }
  let ownerId = requestedCat.ownerId;
  requestedOwnerObj = ownersDal.getById(ownerId);

  return requestedOwnerObj ? requestedOwnerObj : {};
};

const getOwnerPhoneById = (id) => {
  let ownerObj = getOwnerDetailsById(id);
  return ownerObj.phone;
};

const getOwnerWithMostCats = () => {
    let cats = catsDAL.getAll();
    let ownersCounter = {};
    let max = {
      counter:0,
      ownerId:-1
    }
  
    for (let cat of cats) {
      //ownerid ===null
      if (cat.ownerId) {
        if (ownersCounter[cat.ownerId.toString()]) {
          ownersCounter[cat.ownerId.toString()]+=1
        } else{
          ownersCounter[cat.ownerId.toString()]=1
        }
        if(max.counter < ownersCounter[cat.ownerId.toString()]){
          max.ownerId =  cat.ownerId.toString()
          max.counter = ownersCounter[cat.ownerId.toString()]
        }
      }
    }
   let requestedOwnerObj= ownersDal.getById(+max.ownerId)
    return requestedOwnerObj
  };
export default {
  getAll,
  getById,
  addCat,
  deleteById,
  getOwnerDetailsById,
  getOwnerPhoneById,
  getOwnerWithMostCats,
};
