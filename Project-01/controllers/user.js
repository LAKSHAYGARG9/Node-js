const User = require('../models/user')


async function handleGetAllUser(req, res) {
  const allDbUsers = await User.find({})
  res.setHeader("X-myName", "Lakshay garg") // Custom header
  // Always add X to custom Headers
  return res.json(allDbUsers);
}


async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({"error" : "user not found"})
    return res.json(user);
}

async function handleUpdateUserById (req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: "changed"})
    return res.status(200).json({status: "success"})
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({status: "success"})
}


async function handleCreateNewUser(req, res) {
    const body = req.body;
  if(!body || !body.first_name || !body.email || !body.gender || !body.job_title || !body.last_name) {
    return res.status(400).json({ msg : 'all fields are req...'})
  }

  console.log("body", body)

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  })

  // console.log("result", result);

  return res.status(201).json({ msg: "success", id: result._id } )
}

module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}

