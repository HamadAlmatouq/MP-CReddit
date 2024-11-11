const express = require("express");
const {
  postList,
  postDetail,
  //   updatePost,
  deletePost,
  createPost,
} = require("./controller");
const router = express.Router();

router.get("/:postId", postDetail);
router.get("/", postList);
router.post("/", createPost);
// router.put("/:accountsId", updatePost);
router.delete("/:postId", deletePost);

module.exports = router;
