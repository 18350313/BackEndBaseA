const { request, response } = require("express");
const pool=require("../db/connection");
const modeloPokemones = require("../models/pokemones");

const getPokemon = async(req=request,res=response)=>{
    
    let conn;

    try{
        conn = await pool.getConnection()
        const [pokemones] = await conn.query(modeloPokemones.queryPokemon,(error)=>{throw new error})
        if(!pokemones){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({pokemones})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getPokemonByID = async (req=request,res=response)=>{
    const {id}=req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [pokemon] = await conn.query(modeloPokemones.queryPoByID,[id],(error)=>{throw new error})
        if(!pokemon){
            res.status(404).json({msg:`No se encontró registro con el ID=${id}`})
            return
        }
        res.json({pokemon})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const deletePokemonByID = async (req=request,res=response)=>{
    const {id}=req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloPokemones.queryDeletePokemonByID,[id],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID=${id}`})
            return
        }
        res.json({msg:`El pokemon con el ID=${id} se elimino correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const addPokemon = async (req=request,res=response)=>{
    const {
        pokemon,
        hp,
        attack,
        defense,
        special_attack,
        special_defense,
        speed,        
        Activo
    }=req.body

    if(
        !pokemon||
        !hp||
        !attack||
        !defense||
        !special_attack||
        !special_defense||
        !speed||        
        !Activo
    ){
        res.status(400).json({msg:"Falta información del pokemon."})
        return
    }
    let conn;
    try{
        conn = await pool.getConnection()
        const [pokemon]=await conn.query(modeloPokemones.queryPokemonExists,[pokemon])
        if(pokemon){
            res.status(403).json({msg:`El pokemon '${pokemon}' ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloPokemones.queryAddPokemon,[
            pokemon,
            hp,
            attack,
            defense,
            special_attack,
            special_defense,
            speed,        
            Activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del pokemon ${pokemon}`})
            return
        }
        res.json({msg:`El pokemon ${pokemon} se agregó correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const updatePokemon = async (req=request,res=response)=>{
    const {
        Pokemon,
        hp,
        attack, 
        defense,
        special_attack,
        special_defense,
        speed,    
    }=req.body

    if(
        !pokemon
    ){
        res.status(400).json({msg:"Falta información del pokemon."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [pokemon]=await conn.query(modeloPokemones.queryGetPokemoInfo,[pokemon])

        if(!pokemon){
            res.status(403).json({msg:`El pokemon '${pokemon}' no se encuentra registrado.`})
            return
        }
        const {affectedRows} = await conn.query(modeloPokemones.queryUpdateByPokemon,[
            pokemon||pokemon.pokemon,
            hp||pokemon.hp,
            attack||pokemon.attack,
            defense||pokemon.defense,
            special_attack||pokemon.special_attack,
            special_defense||pokemon.special_defense,
            speed||pokemon.speed,
            Activo||pokemon.Activo,
            pokemon
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del pokemon ${pokemon}`})
            return
        }
        res.json({msg:`El pokemon ${Nombre} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports={getPokemon,getPokemonByID,deletePokemonByID,addPokemon,updatePokemon} 