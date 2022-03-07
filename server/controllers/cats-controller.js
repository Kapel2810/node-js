import express from 'express'
import catsBL from '../business-logic/cats-BL.js'


const router = express.Router()
const baseUrl = '/api'

router.get(`${baseUrl}/cats`, (req,res)=> {
   let result = catsBL.getAll()
    res.send(result)
})
router.get (`${baseUrl}/cats/ownerWithMostCats`,(req,res)=> {
    let requestedOwnerObj = catsBL.getOwnerWithMostCats()
    res.send(requestedOwnerObj)
})

router.get(`${baseUrl}/cats/:id`, (req, res)=> {
    let id = +req.params.id
    let result = catsBL.getById(id)
    res.send(result)
})

router.post(`${baseUrl}/cats`, ( req, res)=> {
    let newCat = req.body
    let result = catsBL.addCat(newCat)
    console.log(result)
    res.send(result)
})

router.delete (`${baseUrl}/cats/:id`, (req, res)=> {
    let id = +req.params.id
    catsBL.deleteById(id)
    res.send()
})

router.get (`${baseUrl}/cats/ownerById/:id`,(req,res)=> {
    let id = +req.params.id
    let requestedOwnerObj = catsBL.getOwnerDetailsById(id)
    res.send(requestedOwnerObj)
})

router.get (`${baseUrl}/cats/ownerPhoneById/:id`,(req,res)=> {
    let id = +req.params.id
    let phoneNumber = catsBL.getOwnerPhoneById(id)
    res.send(phoneNumber)
})
export {
    router
}