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

