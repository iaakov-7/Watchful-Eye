import express from "express";
import { validBody } from "../middlewares/validBody.middleware.js";
import { loginSchema, userSchema } from "../schemas/user.schema.js";
import { userCtrls } from "../ctrls/auth.ctrls.js";

export const router = express.Router();

router.post("/register", validBody(userSchema), userCtrls.handleRegister);

router.post("/login", validBody(loginSchema), userCtrls.handleLogin);
