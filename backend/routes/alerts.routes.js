import express from "express";
import { alertsCtrls } from "../ctrls/alerts.ctrl.js";
import { validBody } from "../middlewares/validBody.middleware.js";
import { alertSchema, alertSchemaForUpdate } from "../schemas/alert.schema.js";

export const router = express.Router();

router.post("/", validBody(alertSchema), alertsCtrls.handleCreateAlert);

router.put(
  "/:id",
  validBody(alertSchemaForUpdate),
  alertsCtrls.handleUpdateAlert,
);

router.get("/", alertsCtrls.handleGetAll);

router.get("/:id",alertsCtrls.handleGetById);
