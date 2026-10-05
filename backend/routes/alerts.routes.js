import express from "express";
import { alertsCtrls } from "../ctrls/alerts.ctrl.js";

export const router = express.Router();

router.post("/", alertsCtrls.handleCreateAlert);
