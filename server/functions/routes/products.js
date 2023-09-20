const router = require("express").Router();
const admin = require("firebase-admin");
const { QuerySnapshot } = require("firebase-admin/firestore");
const db = admin.firestore();
const doc = admin.firestore();
const setDoc = admin.firestore();

router.get("/ki", (req, res) => {
  return res.send("inside the product router");
});


router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      productId: id,
      item_name: req.body.item_name,
      sale: req.body.sale,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      cartORadd: req.body.cartORadd,
      images: req.body.images,
    };

    // const response = await setDoc(doc(db, "foodItems", `${Date.now()}`), data, {
    //   merge: true,
    // });
    const response = await db.collection("foodItems").doc(`/${id}/`).set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (e) {
    return res.send({ success: false, msg: `error: ${e}` });
  }
});

// get all food products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("foodItems");
      let response = null;
      await query.get().then((QuerySnapshot) => {
        response = QuerySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => b.id - a.id);
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (e) {
      return res.send({ success: false, msg: `error: ${e}` });
    }
  })();
});

//delete product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("foodItems")
      .doc(`/${productId}/`)
      .delete()
      .then((response) => {
        return res.status(200).send({ success: true, data: response });
      });
  } catch (e) {
    return res.send({ success: false, msg: `error: ${e}` });
  }
});



//edit prodcts
router.put("/edit/:productId", async (req, res) => {
  const productId = req.params.productId;
  const data = {
    // productId: id,
    item_name: req.body.item_name,
    sale: req.body.sale,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    cartORadd: req.body.cartORadd,
    images: req.body.images,
  };
  try {
    await db
      .collection("foodItems")
      .doc(`/${productId}/`)
      .update(data)
      .then((response) => {
        return res.status(200).send({ success: true, data: response });
      });
  } catch (e) {
    return res.send({ success: false, msg: `error: ${e}` });
  }
});




module.exports = router;



// phone: '41234234442',
//       email: 'dasaj@gmail.com',
//       username: 'AJOB',
//       timestamp: { _seconds: 1689370760, _nanoseconds: 26000000