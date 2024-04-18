import { pool as db } from "../db.js";

const attendanceControllers = {
    checkAttendance: async (req, res) => {
        const { employeeId } = req.body;

        try {
            const [employee] = await db.query('SELECT * FROM employees WHERE id = ? AND NOT active = FALSE', [employeeId]);

            if (!employee.length) {
                return res.status(400).json({ message: 'Invalid employee ID.' });
            }

            // Get current date in local time with desired format
            const now = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

            const attendanceType = employee.attendance_at ? 'Salida' : 'Entrada'; // Check for existing record
            const [insertResult] = await db.query('INSERT INTO attendance (employee_id, attendance_at) VALUES (?, ?)', [employee[0].id, now]);

            const formattedTime = now.slice(11); // Extract time portion

            const message = attendanceType === 'Entrada'
                ? `Employee ${employee[0].first_name} ${employee[0].last_name} clocked in at ${formattedTime}.`
                : `Employee ${employee[0].first_name} ${employee[0].last_name} clocked out at ${formattedTime}.`;

            res.json({ message });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred. Please try again.' });
        }
    },
    todayAttendance: async (req, res) => {
        try {
            // Get current date in local time with desired format
            const today = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

            const [attendances] = await db.query('SELECT a.*, e.first_name, e.last_name FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.attendance_at = ?', [today]);

            if (!attendances.length) {
                return res.json({ message: 'No attendance records found for today.' });
            }

            attendances.forEach((attendance) => {
                attendance.formatted_time = attendance.attendance_at.slice(11); // Add formatted time property
            });

            // You can further process or format the attendance data for the response here
            res.json({ attendances });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred. Please try again.' });
        }
    },
};

export default attendanceControllers;
