const express = require("express");
const router = express.Router();
const { authorize, ensureAuth, ensureGuest } = require("../middleware/auth");
const { get_data } = require("../controllers/kubios");

// const all_results = require("./data/all_results.json");
// Data from kubios
//GET http://localhost:3000/kubios/test1
router.get("/test11", 
ensureAuth,
authorize("patient"),
async (req, res, next) => {
  try {
    const response = await get_data();
    console.log("test", response.user_info);
    // console.log(response);
    res.render("test11", {
      data: response,
      layout: "chart",
    });
  } catch (err) {
    console.error(err);
    res.render("error/500", {
      layout: "error",
    });
  }
});

// Data from kubios + multiple charts
//GET http://localhost:3000/kubios/test12
router.get("/",  
ensureAuth,
authorize("patient"),
async (req, res, next) => {
  try {
    const response = await get_data();
    // console.log(response);
    res.render("hrv", {
      data: response,
      layout: "chart",
    });
  } catch (err) {
    console.error(err);
    res.render("error/500", {
      layout: "error",
    });
  }
});

// Protected + Data from kubios + multiple charts
//GET http://localhost:3000/kubios/test13
router.get(
  "/test13",
  ensureAuth,
  authorize("patient"),
  async (req, res, next) => {
    try {
      const response = await get_data();
      // console.log(response);
      res.render("test13", {
        data: response,
        layout: "chart",
      });
    } catch (err) {
      console.error(err);
      res.render("error/500", {
        layout: "error",
      });
    }
  }
);

module.exports = router;
