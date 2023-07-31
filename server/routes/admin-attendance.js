const router = require("express").Router();
const {
  getEnable,
  getStatus,
  postDisable,
} = require("../controller/admin-attendance");

router.get("/enable", getEnable);
router.get("/running", getStatus);
router.get("/disable", postDisable);

module.exports = router;
