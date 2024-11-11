const uuid4 = require("uuid4");
const posts = require("../../posts");
const { title } = require("process");

//GET
const postDetail = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postsId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });
  response.status(200).json(foundPost);
};

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
  const newPost = {
    ...request.body,
    id: uuid4(),
    title: title,
    description: description,
  };

  posts.unshift(newPost);
  response.status(201).json(newPost);
};

//Delete
const deletePost = (request, response) => {
  const foundPost = posts.find((post) => post.id === request.params.postsId);
  if (!foundPost) response.status(404).json({ message: "Post not found" });

  const postIndex = posts.findIndex(
    (post) => post.id === request.params.postsId
  );
  posts.splice(postIndex, 1);
  response.status(204).end();
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
  deletePost,
  createPost,
};
