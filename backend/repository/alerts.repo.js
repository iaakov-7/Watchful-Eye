import { db } from "../db/mongo.db.js";

const collection = db.collection("alerts");

async function insertAlert(newAlert) {
  const result = await collection.insertOne(newAlert);
  const alertCreated = await collection.findOne({ _id: result.insertedId });
  return alertCreated;
}

export const alertsRepo = { insertAlert };
