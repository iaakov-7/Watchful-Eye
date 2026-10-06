import { ObjectId } from "mongodb";
import { db } from "../db/mongo.db.js";

const collection = db.collection("users");

async function insertUser(newUser) {
  const result = await collection.insertOne(newUser);
  const createdUser = await collection.findOne({ _id: result.insertedId });
  return createdUser;
}

async function findByUserName(username) {
  const user = await collection.findOne({ username: username });
  return user;
}

async function deleteUser(id) {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function getAllUsers() {
  const result = await collection.find().toArray();
  return result;
}

export const usersRepo = {
  insertUser,
  findByUserName,
  deleteUser,
  getAllUsers,
};
