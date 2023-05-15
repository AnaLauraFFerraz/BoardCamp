import db from "../config/database.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query("SELECT * FROM customers;")
        res.send(customers.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params
    try {
        const customer = await db.query("SELECT * FROM customers WHERE id = $1;", [id])
        if (!customer.rows[0]) return res.sendStatus(404)
        res.send(customer.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }
}

