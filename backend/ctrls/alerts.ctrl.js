import { alertsRepo } from "../repository/alerts.repo.js";

async function handleCreateAlert(req, res) {
  const alertCreated = await alertsRepo.insertAlert(req.body);
  res.status(201).json({ success: true, data: alertCreated });
}
export const alertsCtrls = { handleCreateAlert };
