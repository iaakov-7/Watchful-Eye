import { alertsRepo } from "../repository/alerts.repo.js";

async function handleCreateAlert(req, res) {
  const alertCreated = await alertsRepo.insertAlert(req.body);
  res.status(201).json({ success: true, data: alertCreated });
}

async function handleUpdateAlert(req, res) {
  const { id } = req.params;
  const alert = await alertsRepo.findById(id);
  if (!alert) {
    const error = new Error(`Alert with id ${id} not found`);
    error.statusCode = 404;
    throw error;
  }
  const alertUpdated = await alertsRepo.updateAlert(id, req.body);
  res.json({ success: true, data: alertUpdated });
}

export const alertsCtrls = { handleCreateAlert, handleUpdateAlert };
