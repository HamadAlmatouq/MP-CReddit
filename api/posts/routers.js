const express = require("express");
const {
  postList,
  postDetail,
  //   updatePost,
  deleteCommentById,
  addComment,
  deletePost,
  createPost,
} = require("./controller");
const router = express.Router();

router.get("/:postId", postDetail);
router.get("/postList", postList);
router.post("/createPost", createPost);
// router.put("/:accountsId", updatePost);
router.post("/", addComment);
router.delete("/:postId/comments", deletePost);
router.delete("/:postId/:id", deleteCommentById);

module.exports = router;
