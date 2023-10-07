const router = require("express").Router();
const admin = require("firebase-admin");
// const {QuerySnapshot} = require("firebase-admin/firestore");
let number = 0;
const db = admin.firestore();

if (number < 1000) {
  router.get("/ki", (req, res) => {
    return res.send("inside the review router");
  });

  router.post("/create", async (req, res) => {
    console.log("reviews api " + number++);

    try {
      const id = Date.now();
      const data = {
        productId: id,
        food_id: req.body.food_id,
        user_name: req.body.user_name,
        user_pic: req.body.user_pic,
        user_id: req.body.user_id,
        rating: req.body.rating,
        review: req.body.review,
      };

      const response = await db.collection("reviews").doc(`/${id}/`).set(data);
      return res.status(200).send({ success: true, data: response });
    } catch (e) {
      return res.send({ success: false, msg: `error: ${e}` });
    }
  });

  router.get("/get/:productId", async (req, res) => {
    console.log("reviews api " + number++);

    const productId = req.params.productId;
    (async () => {
      try {
        const query = db.collection("reviews");
        let response = null;
        await query.get().then((uerySnapshot) => {
          response = uerySnapshot.docs
            .filter((doc) => doc.data().food_id === productId)
            .sort((a, b) => b.id - a.id)
            .map((doc) => ({ ...doc.data(), id: doc.id }));

          return response;
        });
        return res.status(200).send({ success: true, data: response });
      } catch (e) {
        return res.send({ success: false, msg: `error: ${e}` });
      }
    })();
  });

  // Add a new route to get all reviews
  router.get("/get-all", async (req, res) => {
    console.log("reviews api " + number++);

    (async () => {
      try {
        const query = db.collection("reviews");
        let response = null;
        await query.get().then((querySnapshot) => {
          response = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          return response;
        });
        return res.status(200).send({ success: true, data: response });
      } catch (e) {
        return res.send({ success: false, msg: `error: ${e}` });
      }
    })();
  });

  // edit prodcts
  router.put("/edit/:productId", async (req, res) => {
    console.log("edit rev api " + number++);

    const productId = req.params.productId;
    const data = {
      // productId: id,
      food_id: req.body.food_id,
      productId: req.body.productId,
      rating: req.body.rating,
      review: req.body.review,
      user_id: req.body.user_id,
      feature: req.body.feature,
    };
    try {
      await db
        .collection("reviews")
        .doc(`/${productId}/`)
        .update(data)
        .then((response) => {
          return res.status(200).send({ success: true, data: response });
        });
    } catch (e) {
      return res.send({ success: false, msg: `error: ${e}` });
    }
  });
}
module.exports = router;
