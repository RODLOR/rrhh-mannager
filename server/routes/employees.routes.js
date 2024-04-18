import { Router } from "express";
import employeesControllers from "../controllers/employeesControllers.controllers.js"

const router = Router()

router.get("/employees", employeesControllers.employees);
router.post("/employees", employeesControllers.addEmployee);
router.delete("/employees/:id", employeesControllers.deleteEmployee);
router.put("/employee/:id", employeesControllers.editEmployee);

export default router;