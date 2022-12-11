const {Router} = require("express")
const { getPokemones, getPokemonesByID, deletepokemonByID, addpokemon, updatepokemon } = require("../controllers/pokemones")
const router = Router()

//http://localhost:4000/api/v1/pokemones

//GET
router.get("/", getPokemones)
router.get("/id/:id", getPokemonesByID) //id/1

//DELETE
router.delete("/", deletepokemonByID)  //?id=1

//POST
router.post("/",addpokemon)

//PUT
router.put("/",updatepokemon)


module.exports = router