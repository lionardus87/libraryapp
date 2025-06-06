const express = require("express");
const router = express.Router();

const borrowController = require("../controllers/borrowController");

router.post("/", borrowController.handleBorrowBooks);
router.get("/user/:username", borrowController.getUserBorrowLogs);
router.get("/all", borrowController.getAllBorrowLogs);
router.post("/return", borrowController.returnBorrowedBook);

module.exports = router;
