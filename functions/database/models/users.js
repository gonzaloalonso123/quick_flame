const db = require("../config");

const createUserIfNotExists = async (uid, email) => {
  const docRef = db.collection("users").doc(uid);
  docRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        db.collection("users")
          .doc(uid)
          .set({"indentation":"2","language":"javascript","database":"firebase","port":"6999","framework":"express","wipe":false});
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

const getUserByUid = async (uid) => {
  const docRef = db.collection("users").doc(uid);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  return doc.data();
};

module.exports = {
  createUserIfNotExists,
  getUserByUid,
};
