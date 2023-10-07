const router = require("express").Router();
const admin = require("firebase-admin");
let number = 0;
// const data = [];
// const [number,setNumber] = useState(0)

if (number < 1000) {
  router.get("/", (req, res) => {
    return res.send("inside the user router");
  });

  router.get("/jwtVerifi", async (req, res) => {
    console.log("user api " + number++);
    if (!req.headers.authorization) {
      return res.status(500).send({ msg: "Token not found" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedTok = await admin.auth().verifyIdToken(token);
      if (!decodedTok) {
        return res
          .status(500)
          .json({ success: false, msg: "Unauthorized access!" });
      }
      return res.status(200).json({ sucess: true, data: decodedTok });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: `Error in the token : ${error}` });
    }
  });

  const listAllUsers = (nextPageToken) => {
    console.log("user api " + number++);

    // Return a promise that resolves with the user data
    return new Promise((resolve, reject) => {
      const data = [];

      admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            data.push(userRecord.toJSON());
          });
          if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken)
              .then((nextPageData) => {
                data.push(...nextPageData); // Append data from the next page
                resolve(data);
              })
              .catch(reject);
          } else {
            resolve(data);
          }
        })
        .catch(reject);
    });
  };

  router.get("/all", async (req, res) => {
    console.log("user api " + number++);

    try {
      const users = await listAllUsers();
      console.log(users.length);
      return res.status(200).send({ success: true, data: users });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, msg: `Error: ${e.message}` });
    }
  });

  router.get("/speciuser/:user_id", async (req, res) => {
    console.log("user api " + number++);

    const speciuser = req.params.user_id;
    try {
      let users = await listAllUsers();
      console.log(users.length);
      users = users.filter((doc) => doc.uid === speciuser);
      console.log(users.length);
      return res.status(200).send({ success: true, data: users });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, msg: `Error: ${e.message}` });
    }
  });

  // Delete a user by UID
  router.delete("/delete/:user_id", async (req, res) => {
    console.log("user api delete" + number++);

    const userToDelete = req.params.user_id;

    try {
      // First, check if the user exists
      const userRecord = await admin.auth().getUser(userToDelete);

      // If the user exists, proceed to delete
      await admin.auth().deleteUser(userToDelete);

      return res
        .status(200)
        .send({ success: true, msg: "User deleted successfully" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, msg: `Error: ${e.message}` });
    }
  });

  // Edit a user by UID
  router.put("/edit/:user_id", async (req, res) => {
    console.log("user api edit" + number++);

    const userToEdit = req.params.user_id;
    const newData = req.body; // Assuming you send updated
    // user data in the request body

    try {
      // First, check if the user exists
      const userRecord = await admin.auth().getUser(userToEdit);

      // If the user exists, proceed to update user data
      await admin.auth().updateUser(userToEdit, newData);

      return res
        .status(200)
        .send({ success: true, msg: "User updated successfully" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, msg: `Error: ${e.message}` });
    }
  });
}

module.exports = router;
