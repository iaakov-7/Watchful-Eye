import { alertsRepo } from "../repository/alerts.repo.js";
import { raisErrorIfNotFound } from "../utils.js";

async function handleCreateAlert(req, res) {
  const alertCreated = await alertsRepo.insertAlert(req.body);
  res.status(201).json({ success: true, data: alertCreated });
}

async function handleUpdateAlert(req, res) {
  const { id } = req.params;
  const alert = await alertsRepo.findById(id);
  raisErrorIfNotFound(alert, id);
  const alertUpdated = await alertsRepo.updateAlert(id, req.body);
  res.json({ success: true, data: alertUpdated });
}

async function handleGetAll(req, res) {
  const filter = req.query;
  const alerts = await alertsRepo.getAll(filter);
  res.json({ success: true, data: alerts });
}

async function handleGetById(req, res) {
  const { id } = req.params;
  const alert = await alertsRepo.findById(id);
  raisErrorIfNotFound(alert, id);
  res.json({ success: true, data: alert });
}

export const alertsCtrls = {
  handleCreateAlert,
  handleUpdateAlert,
  handleGetAll,
  handleGetById,
};
