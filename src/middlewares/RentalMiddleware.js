import db from "../config/database.js";

export async function rentalValidation(req, res, next) {
    const { customerId, gameId } = req.body;

    try {
        const checkGame = await db.query("SELECT * FROM games WHERE id = $1", [gameId]);
        if (!checkGame.rows[0]) return res.sendStatus(400);

        const checkCustomer = await db.query("SELECT * FROM customers WHERE id = $1", [customerId]);
        if (!checkCustomer.rows[0]) return res.sendStatus(400);

        const rentalQuery = await db.query('SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" ISNULL;', [gameId]);
        const rented = rentalQuery.rowCount;
        const stock = checkGame.rows[0].stockTotal;
        if (rented >= stock) return res.sendStatus(400);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    next();
}

export async function returnRentalValidation(req, res, next) {
    const {id} = req.params;

    try {
        const checkRental = await db.query("SELECT * FROM rentals WHERE id = $1", [id]);

        if (!checkRental.rows[0]) return res.sendStatus(404);
        if (checkRental.rows[0].returnDate) return res.sendStatus(400);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    next();
}

export async function deleteRentalValidation(req, res, next) {
    const {id} = req.params;

    try {
        const checkRental = await db.query("SELECT * FROM rentals WHERE id = $1", [id]);

        if (!checkRental.rows[0]) return res.sendStatus(404);
        if (!checkRental.rows[0].returnDate) return res.sendStatus(400);
    } catch (error) {
        return res.status(500).send(error.message);
    }

    next();
}