const express = require("express");
const {
  accountList,
  accountDetail,
  updateAccount,
  deleteAccount,
  createAccount,
} = require("./controller");
const router = express.Router();

router.get("/:accountsId", accountDetail);
router.get("/", accountList);
router.post("/", createAccount);
router.put("/:accountsId", updateAccount);
router.delete("/:accountsId", deleteAccount);

module.exports = router;
