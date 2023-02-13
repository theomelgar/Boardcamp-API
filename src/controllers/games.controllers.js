import { db } from "../config/database.connection.js"

export async function addGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body
    try {
        const nameExist = await db.query(
            'SELECT games.name FROM games WHERE name=$1', [name]
        )
        if (nameExist.rowCount > 0) {
            return res.status(409).send('Name already taken.')
        }
        const insert = await db.query(
            'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
            [name, image, stockTotal, pricePerDay]
        )
        if(insert.rowCount === 0 ) return res.sendStatus(400)
        
        res.status(201).send("Game posted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findGames(req, res) {
    try {
        const games = await db.query("SELECT games.* FROM games")

        res.send(games.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findGamesId(req, res) {
    const { id } = req.params
    try {
        const games = await db.query(`SELECT * FROM games WHERE id = ${id}`)
        console.log(games)
        res.send(games.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}