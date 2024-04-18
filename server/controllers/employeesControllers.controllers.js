import { pool as db } from "../db.js";

const employeesControllers = {
    employees: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM employees WHERE NOT active = FALSE');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addEmployee: async (req, res) => {
        const id_number = req.body.id_number;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const address = req.body.address;
        const tel = req.body.tel;
        const sal = req.body.sal;
        const role = req.body.role;
        const department = req.body.department;

        try {

            const data = {
                id_number: id_number,
                first_name: first_name,
                last_name: last_name,
                email: email,
                address: address,
                tel: tel,
                sal: sal,
                role: role,
                department: department,
            };

            const checkEmail = `SELECT * FROM employees WHERE email=?`;
            const checkIdNumber = `SELECT * FROM employees WHERE id_number=?`;
            const [checkEmailResult] = await db.query(checkEmail, [email]);
            const [checkIdNumberResult] = await db.query(checkIdNumber, [id_number]);

            if (checkEmailResult.length > 0 && checkIdNumberResult > 0) {
                return res.status(400).send({ msg: "Id Number or Email Already Present" });
            } else {
                const insertSql = "INSERT INTO `employees` SET ?";
                const [insertResult] = await db.query(insertSql, [data]);
                res.send(insertResult);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Error registering user" });
        }
    },
    deleteEmployee: async (req, res) => {
        const id = req.params.id;

        try {
            const updateSql = `UPDATE employees SET active = false WHERE id = ?`;
            const [updateResult] = await db.query(updateSql, id);

            if (updateResult.affectedRows > 0) {
                res.json({ msg: 'Employee deactivated successfully' });
            } else {
                res.status(404).json({ msg: 'Employee not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    editEmployee: async (req, res) => {
        const id = req.params.id; // Get the employee ID from request parameters

        const {
            id_number,
            first_name,
            last_name,
            email,
            address,
            tel,
            sal,
            role,
            department
        } = req.body; // Destructure the updated employee data from the request body

        try {
            const checkEmail = `SELECT * FROM employees WHERE email=? AND id != ?`;
            const checkIdNumber = `SELECT * FROM employees WHERE id_number=? AND id != ?`;

            // Check if the new email or id_number is already in use by another employee
            const [checkEmailResult] = await db.query(checkEmail, [email, id]);
            const [checkIdNumberResult] = await db.query(checkIdNumber, [id_number, id]);

            if (checkEmailResult.length > 0 || checkIdNumberResult.length > 0) {
                return res.status(400).send({ msg: "Id Number or Email Already Present" });
            } else {
                const updateSql = `
                    UPDATE employees
                    SET 
                        id_number = ?,
                        first_name = ?,
                        last_name = ?,
                        email = ?,
                        address = ?,
                        tel = ?,
                        sal = ?,
                        role = ?,
                        department = ?
                    WHERE id = ?
                `;

                const [updateResult] = await db.query(updateSql, [
                    id_number,
                    first_name,
                    last_name,
                    email,
                    address,
                    tel,
                    sal,
                    role,
                    department,
                    id
                ]);

                if (updateResult.affectedRows > 0) {
                    res.json({ msg: 'Employee updated successfully' });
                } else {
                    res.status(404).json({ msg: 'Employee not found' });
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

export default employeesControllers;
