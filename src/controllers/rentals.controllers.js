import { db } from "../config/database.connection.js"

export async function addRental(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const cpfExist = await db.query(
            'SELECT * FROM rentals WHERE cpf=$1', [cpf]
        )
        if (cpfExist.rowCount > 0) {
            return res.status(409).send('Name already taken.')
        }
        const insert = await db.query(
            'INSERT INTO rentals (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
            [name, phone, cpf, birthday]
        )
        if (insert.rowCount === 0) {
            return res.sendStatus(400)
        }
        res.status(201).send("Costumer created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function findRentals(req, res) {
    try {
        const rentals = await db.query("SELECT * FROM rentals")

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

export async function deleteRental( req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}