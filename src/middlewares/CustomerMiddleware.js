import db from "../config/database.js";

export async function customerValidation(req, res, next) {
    const {cpf} = req.body
    try {
        const checkCustomer = await db.query("SELECT * FROM customers WHERE cpf = $1",[cpf]);
        if (checkCustomer.rows[0]) return res.sendStatus(409)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    next();
}

