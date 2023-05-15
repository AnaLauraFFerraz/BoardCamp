import db from "../config/database.js"

export async function listRentals(req, res) {
    try {
        const queryCustomers = await db.query('SELECT * FROM customers;');
        const queryGames = await db.query('SELECT * FROM games;');
        const queryRentals = await db.query('SELECT * FROM rentals;');
        
        const rentalsList = queryRentals.rows.map(rental => {
            return {
                ...rental,
                customer: {
                    id: rental.customerId,
                    name:queryCustomers.rows.find(c => c.id===rental.customerId).name
                },
                game:{
                    id:rental.gameId,
                    name: queryGames.rows.find(c => c.id===rental.customerId).name
                } 
            }
        });

        res.send(rentalsList);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = new Date();

    try {
        const game = await db.query("SELECT * FROM games WHERE id = $1;", [gameId]);
        const originalPrice = Number(game.rows[0].pricePerDay) * daysRented;

        await db.query(
            'INSERT INTO rentals \
            ("customerId", "gameId", "daysRented","rentDate", "originalPrice","returnDate","delayFee") \
            VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
        );

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function returnRental (req,res) {
    const {id} = req.params;
    const date = new Date();

    try {
        const rentalQuery = await db.query(
            'SELECT rentals.id, rentals."rentDate", rentals."daysRented", games."pricePerDay" FROM rentals \
            JOIN games on rentals."gameId" = games.id\
            WHERE rentals.id = $1;',[id]);
        
        const {rentDate,daysRented,pricePerDay} = rentalQuery.rows[0] ;
        const dateRented = new Date(rentDate);
        const runningTime = Math.abs(date - dateRented);
        const runningDays = Math.floor(runningTime / (1000 * 60 * 60 * 24)); 
        const fee = runningDays - daysRented > 0 ?
            (runningDays - daysRented) * pricePerDay : 0

        await db.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2  WHERE id = $3;',[date,fee,id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req,res){
    const {id} = req.params;

    try {
        await db.query("DELETE FROM rentals WHERE id = $1;",[id]);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}