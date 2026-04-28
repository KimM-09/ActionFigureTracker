import express from 'express';
import { addFigure, getMyFigs, getFigure, updateFigure, deleteFigure } from '../controllers/figureController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


//All figure routes are "protected"
//POST /api/figures/add
router.post("/add", protect, addFigure);

//GET /api/figures/my-collection
router.get("/my-collection", protect, getMyFigs)

//GET /api/figures/:id
router.get("/:id", protect, getFigure);

//PUT /api/figures/:id
router.put("/:id", protect, updateFigure);

//DELETE /api/figures/:id
router.delete("/:id", protect, deleteFigure)

export default router;