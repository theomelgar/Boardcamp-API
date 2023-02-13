import { db } from "../config/database.connection.js"

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
            `SELECT * FROM customers WHERE id = $1`,[customerId]
        )
        if (customerExist.rowCount !== 1) {
            return res.status(400).send('Customer not cataloged')
        }

        const  checkStock = await db.query(
            `SELECT "stockTotal" FROM games WHERE id = $1`,[gameId]
        )

        const isRented = await db.query(
            `SELECT * FROM rentals WHERE "gameId" = $1`,[gameId]
        )

        if(checkStock.rows[0].stockTotal <= isRented.rowCount)[
            res.sendStatus(400)
        ]

        const insert = await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
             VALUES ($1, $2, $3, NOW(), (SELECT "pricePerDay" FROM games WHERE id = $2)*3)
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
        const rentals = await db.query(`SELECT * FROM rentals`)

        res.send(rentals.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findrentalId(req, res) {
    const { id } = req.params
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = ${id}`)
        if (!rental) return res.status(404).send(console.log("Client id does not exists"))
        res.send(rental.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function updaterental(req, res) {
    const id = Number(req.params.id)
    if (!id || id < 1) {
        return res.sendStatus(400)
    }
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = ${id}`)
        if (rental.rowCount === 0) {

            return res.status(404).send(console.log("Client id does not exists"))
        }
        const { name, phone, cpf, birthday } = req.body

        const cpfExist = await db.query(
            'SELECT rentals.cpf FROM rentals WHERE cpf=$1 AND id<>$2',
            [cpf, id]
        )
        if (cpfExist.rowCount > 0) {
            return res.status(409).send('Name already taken.')
        }
        const updatedrental = await db.query(
            'UPDATE rentals SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5',
            [name, phone, cpf, birthday, id]
        )
        if (updaterental.rowCount === 0) {
            return res.sendStatus(400)
        }

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteRental(req, res) {
    try {

    } catch (error) {
        res.status(500).send(error.message)
    }
}