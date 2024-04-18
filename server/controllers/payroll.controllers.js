import { pool as db } from "../db.js";

const payrollControllers = {
    // Obtener todos los pagos quincenales
    getPayroll: async (req, res) => {
        const query = 'SELECT * FROM payroll';
        db.query(query, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    },

    // Agregar un nuevo pago quincenal
    addPayment: async (req, res) => {
        const { employeeId, amount, date } = req.body;
        const query = 'INSERT INTO payroll (employee_id, amount, date) VALUES (?, ?, ?)';
        db.query(query, [employeeId, amount, date], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Pago agregado con éxito', id: result.insertId });
        });
    },
}

export default payrollControllers;
