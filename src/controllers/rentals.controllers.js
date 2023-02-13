// import { db } from "../config/database.connection.js"

// export async function addCustomer(req, res) {
//     const { name, phone, cpf, birthday } = req.body
//     try {
//         const cpfExist = await db.query(
//             'SELECT customers.cpf FROM customers WHERE cpf=$1', [cpf]
//         )
//         if (cpfExist.rowCount > 0) {
//             return res.status(409).send('Name already taken.')
//         }
//         const insert = await db.query(
//             'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
//             [name, phone, cpf, birthday]
//         )
//         if (insert.rowCount === 0) {
//             return res.sendStatus(400)
//         }
//         res.status(201).send("Costumer created")
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }

// export async function findCustomers(req, res) {
//     try {
//         const customers = await db.query("SELECT customers.* FROM customers")

//         res.send(customers.rows)

//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }

// export async function findCustomerId(req, res) {
//     const { id } = req.params
//     try {
//         const customer = await db.query(`SELECT * FROM customers WHERE id = ${id}`)
//         if (!customer) return res.status(404).send(console.log("Client id does not exists"))
//         res.send(customer.rows[0])
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }


// export async function updateCustomer(req, res) {
//     const id = Number(req.params.id)
//     if (!id || id < 1) {
//         return res.sendStatus(400)
//     }
//     try {
//         const customer = await db.query(`SELECT * FROM customers WHERE id = ${id}`)
//         if (customer.rowCount === 0) {

//             return res.status(404).send(console.log("Client id does not exists"))
//         }
//         const { name, phone, cpf, birthday } = req.body

//         const cpfExist = await db.query(
//             'SELECT customers.cpf FROM customers WHERE cpf=$1 AND id<>$2',
//             [cpf, id]
//         )
//         if (cpfExist.rowCount > 0) {
//             return res.status(409).send('Name already taken.')
//         }
//         const updatedCustomer = await db.query(
//             'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5',
//             [name, phone, cpf, birthday, id]
//         )
//         if (updateCustomer.rowCount === 0) {
//             return res.sendStatus(400)
//         }

//         res.sendStatus(200)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }

// export async function deleteRental