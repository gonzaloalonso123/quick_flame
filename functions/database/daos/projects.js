const db = require("../config");
const { v4: uuidv4 } = require("uuid");
const ProjectsRef = db.collection("Projects");

const getAll = async () => {
  const querySnapshot = await ProjectsRef.get();
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

const getById = async (id) => {
  const docRef = ProjectsRef.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  const data = doc.data();
  return data;
};

const create = async (data) => {
  const id = uuidv4();
  const docRef = db.collection("Projects").doc(id);
  await docRef.set({...data, id});
  const newDoc = await docRef.get();
  return newDoc.data();
};

const update = async (id, data) => {
  const docRef = ProjectsRef.doc(id);
  await docRef.update(data);
  const updatedDoc = await docRef.get();
  return updatedDoc.data();
};

const del = async (id) => {
  const docRef = ProjectsRef.doc(id);
  await docRef.delete();
};
  
module.exports = {
  create,
  getAll,
  getById,
  update,
  del,
}
