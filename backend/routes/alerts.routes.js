import express from "express";
import { alertsCtrls } from "../ctrls/alerts.ctrl.js";
import { validBody } from "../middlewares/validBody.middleware.js";
import { alertSchema, alertSchemaForUpdate } from "../schemas/alert.schema.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post("/", verifyToken, validBody(alertSchema),alertsCtrls.handleCreateAlert);

router.put(
  "/:id",
  verifyToken,
  validBody(alertSchemaForUpdate),
  alertsCtrls.handleUpdateAlert,
);

router.get("/", verifyToken, alertsCtrls.handleGetAll);

router.get("/:id", verifyToken, alertsCtrls.handleGetById);

router.delete("/:id", verifyToken, alertsCtrls.handleDeleteAlert);
