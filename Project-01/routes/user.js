const express = require("express");

const router = express.Router()

const {handleGetAllUser, handleUpdateUserById, handleGetUserById, handleDeleteUserById, handleCreateNewUser} = require('../controllers/user')

router.route('/')
.get(handleGetAllUser)
.post(handleCreateNewUser)

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)

module.exports = router


// app.get("/users", async (req, res) => {
//   const allDBUsers = await User.find({});
//   const html = `
//     <ul> 
//         ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `;
//   res.send(html);
// });