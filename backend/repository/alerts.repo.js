import { ObjectId } from "mongodb";
import { db } from "../db/mongo.db.js";

const collection = db.collection("alerts");

async function findById(id) {
  const alert = await collection.findOne({ _id: new ObjectId(id) });
  return alert;
}

async function getAll(filter) {
  const alerts = await collection.find().filter(filter).toArray();
  return alerts;
}

async function insertAlert(newAlert) {
  const result = await collection.insertOne(newAlert);
  const alertCreated = await collection.findOne({ _id: result.insertedId });
  return alertCreated;
}

async function updateAlert(id, toUpdate) {
  const alertUpdated = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: toUpdate },
    { returnDocument: "after" },
  );
  return alertUpdated;
}

export const alertsRepo = { insertAlert, updateAlert, findById,getAll };
