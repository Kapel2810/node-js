import database from '../database/database.js'

const getAll = ()=> {
    return database.database.cats
}

const addCat =(newCat)=> {
    database.database.cats.push(newCat)
}

const resetAll = (newCatsList)=> {
    database.database.cats = newCatsList
}
export default {
    getAll,
    addCat,
    resetAll
}