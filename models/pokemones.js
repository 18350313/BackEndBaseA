const modeloPokemones = {
    queryGetPokemones: "SELECT * FROM Pokemones",
    queryPokemonesByID : `SELECT * FROM Pokemones WHERE ID=?`,
    queryDeletePokemonesByID : `UPDATE Pokemones SET Activo='N' WHERE ID=?`,
    queryPokemonesExists : `SELECT Nombre FROM Pokemones WHERE Nombre = ?`,
    queryAddPokemones:`
    INSERT INTO Pokemones(
        pokemon,
        hp,
        attack,
        defense,
        special_attack,
        special_defense,
        speed,        
        Activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetPokemonesInfo : `SELECT pokemon, hp, attack, defense, special attack, special defense, speed, Activo FROM Pokemones WHERE pokemon = ?`,
    queryUpdateByVeiculo : `
    UPDATE Pokemones SET
        pokemon=?,
        hp=?,
        attack=?,
        defense=?,
        special_attack=?,
        special_defense=?,
        speed=?,
        Activo=?
    WHERE pokemon= ?
    `
}

module.exports=modeloPokemones