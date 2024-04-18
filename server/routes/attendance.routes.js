import { Router } from "express";
import attendanceControllers from "../controllers/attendance.controllers.js"

const router = Router();

// Rutas para la gestión de asistencia
router.post('/check-in', attendanceControllers.checkAttendance);
router.get('/today-attendance', attendanceControllers.todayAttendance);

export default router;
