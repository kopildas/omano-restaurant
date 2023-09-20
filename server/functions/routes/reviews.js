const router = require("express").Router();
const admin = require("firebase-admin");
const { QuerySnapshot } = require("firebase-admin/firestore");
const db = admin.firestore();

router.get("/ki", (req, res) => {
  return res.send("inside the review router");
});

router.post("/create", async (req, res) => {
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
  const productId = req.params.productId;
  (async () => {
    try {
      let query = db.collection("reviews");
      let response = null;
      await query.get().then((QuerySnapshot) => {
        response = QuerySnapshot.docs
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

module.exports = router;
