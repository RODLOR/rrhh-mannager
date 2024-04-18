import { Router } from "express";
import payrollControllers from "../controllers/payroll.controllers.js"

const router = Router()

router.get('/payroll', payrollControllers.getPayroll);
router.post('/payroll', payrollControllers.addPayment);

export default router;
