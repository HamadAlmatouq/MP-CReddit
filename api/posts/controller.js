const uuid4 = require("uuid4");
const posts = require("../../posts");
const { title } = require("process");
const { type } = require("os");

//GET
const postDetail = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postsId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });
  response.status(200).json(foundPost);
};

//GET By title or ID
const postList = (request, response) => {
  const { title, id } = request.query;

  let filteredPosts = posts;
  if (title)
    filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );

  if (id)
    filteredPosts = posts.filter((post) =>
      post.id.toLowerCase().includes(id.toLowerCase())
    );
  response.status(200).json(filteredPosts);

  //   if (!postName) {
  //     response.status(200).json(posts);
  //   }
  //   const foundPost = posts.find(
  //     (post) => post.username.toLowerCase() === postName.toLocaleLowerCase()
  //   );

  // if (!foundPost) response.status(404).json({ message: "Post not found" });
  // response.status(200).json(foundPost);
};

const createPost = (request, response) => {
  const { title, description } = request.body;

  const newPost = {
    id: uuid4(),
    title: title,
    description: description,
    // ...request.body,
    // comments: [],
  };

  if (!title) response.status(400).json({ message: "Missing title!" });
  else if (typeof title !== "string")
    response.status(400).json({ message: "Title must be String" });
  else if (!description)
    response.status(400).json({ message: "Missing description!" });
  else if (typeof description !== "string")
    response.status(400).json({ message: "description must be String" });
  // else {
  posts.unshift(newPost);
  response.status(201).json(newPost);
  // }
};

const addComment = (req, res) => {
  const { postId } = req.params;
  const { username, comment } = req.body;

  if ((!username, !comment)) {
    return res
      .status(400)
      .json({ message: "Both username and comment are required" });
  }
  const post = posts.find((p) => p.id === postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const newComment = { id: uuid4(), username, comment };
  post.comments.push(newComment);
  res.status(201).json(newComment);
};

//Delete
const deletePost = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postsId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });

  const postIndex = posts.findIndex(
    (post) => post.id === request.params.postsId
  );
  posts.splice(postIndex, 1);
  response.status(204).json({ message: "Post deleted!" });
};

const deleteCommentById = (req, res) => {
  const commentId = req.params.id;
  for (const post of posts) {
    const commentIndex = post.comments.findIndex((c) => c.id === commentId);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      return res.status(200).json({ message: "Comment deleted!" });
    }
  }
  res.status(404).json({ message: "No comment found!" });
};

//Put / update
// const updatePost = (request, response) => {
//     const foundPost = posts.find(
//       (post) => post.id === parseInt(request.params.postsId)
//     );

//     if (!foundPost) response.status(404).json({ message: "Post not found" });
//     const { username, comment } = request.body;

//     if (!username || !comment)
//       response.status(400).json({ message: "Bad requset" });
//     foundPost.username = username;
//     foundPost.comment = comment;

//     response.status(200).json(foundPost);
//   };

module.exports = {
  postList,
  postDetail,
  //   updatePost,
  addComment,
  deleteCommentById,
  deletePost,
  createPost,
};
