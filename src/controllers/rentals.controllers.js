import { db } from "../config/database.connection.js"
import dayjs from "dayjs"
export async function addRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const gameExist = await db.query(
            'SELECT * FROM games WHERE id=$1', [gameId]
        )
        if (gameExist.rowCount !== 1) {
            return res.status(400).send('Game not cataloged')
        }

        const customerExist = await db.query(
            `SELECT * FROM customers WHERE id = $1`, [customerId]
        )
        if (customerExist.rowCount !== 1) {
            return res.status(400).send('Customer not cataloged')
        }

        const checkStock = await db.query(
            `SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]
        )

        const isRented = await db.query(
            `SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]
        )

        if (checkStock.rows[0].stockTotal <= isRented.rowCount) [
            res.sendStatus(400)
        ]

        const insert = await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
             VALUES ($1, $2, $3, NOW(), (SELECT "pricePerDay" FROM games WHERE id = $2)     * $3)
             `,
            [customerId, gameId, daysRented]
        )
        if (insert.rowCount === 0) {
            return res.sendStatus(400)
        }
        res.status(201).send("Rental created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT
            rentals.*,
            json_build_object('id', customers.id, 'name', customers.name) AS customer,
            json_build_object('id', games.id, 'name', games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        `)

        res.send(rentals.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function finishRental(req, res) {
    const id = Number(req.params.id)
    if (!id || id < 1) {
        return res.sendStatus(400)
    }
    try {
        const rentalExist = await db.query(`SELECT * FROM rentals WHERE id = ${id}`)
        if (rentalExist.rowCount !== 1) {
            return res.status(404).send(console.log("Rental id does not exist"))
        }

        const rentalOpen = await db.query(`
            SELECT * FROM rentals WHERE id = ${id} AND "returnDate" IS NOT null
        `)
        if (rentalOpen.rowCount !== 0) {
            return res.status(400).send(console.log("Rental is already closed"))
        }

        const rent = rentalExist.rows[0]
        const rentDate = dayjs(rent.rentDate)   
        const returnDate = dayjs(rent.returnDate)
        const daysRented = rentDate.add(rent.daysRented,'day')
        const diff = returnDate.diff(daysRented,'day')

        const pricePerDay = await db.query(`
            SELECT "pricePerDay" FROM games WHERE id = ${rent.gameId}
        `)
        const delayFee = diff > 0 ? pricePerDay * diff : 0

        const finish = await db.query(
            'UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2',
            [delayFee, id]
        )
        if (finish.rowCount === 0) {
            return res.sendStatus(400)
        }

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRental(req, res) {
    const id = Number(req.params.id)
    if (!id || id < 1) {
        return res.sendStatus(400)
    }

    try {
        const rentalExist = await db.query(`SELECT * FROM rentals WHERE id = ${id}`)
        if (rentalExist.rowCount !== 1) {
            return res.status(404).send(console.log("Rental id does not exist"))
        }
        const rentalOpen = await db.query(`
            SELECT * FROM rentals WHERE id = ${id} AND "returnDate" IS null
        `)
        if (rentalOpen.rowCount !== 0) {
            return res.status(400).send(console.log("Rental is not closed yet"))
        }

        const remove = await db.query(`
            DELETE FROM rentals WHERE id = ${id}
        `)
        if(remove.rowCount === 0){
            res.status(500).send("Error in DELETE query")
        }
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}