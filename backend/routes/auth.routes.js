import express from "express";
import { validBody } from "../middlewares/validBody.middleware.js";
import { userSchema } from "../schemas/user.schema.js";
import { userCtrls } from "../ctrls/auth.ctrls.js";

export const router = express.Router();

router.post("/register", validBody(userSchema), userCtrls.handleRegister);
