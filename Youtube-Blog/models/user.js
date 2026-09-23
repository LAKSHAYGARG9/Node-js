const { Schema , model } = require('mongoose')
const {createHmac, randomBytes} = require('node:crypto');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{ 
        type: String,
        
    },
    password:{
        type: String,
        required: true,
    },
    profileImageURL:{
        type: String,
        default: "/Images/default.avif"
    },
    role: {
        type: String, 
        enum: ["USER" , "ADMIN"],
        default: "USER"
    }
}, {timestamps: true})

userSchema.pre('save', function () {
    const user = this;

    if(!user.isModified('password')) return ;
    const salt = 'somerandomsalt'
    const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');

    this.salt = salt;
    this.password = hashPassword;

})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({email})
    if(!user) throw new Error('user not found ')
    const salt = this.salt;
    const hashedPassword = user.password;

    const userProvidedHash =  createHmac("sha256", salt)
    .update(user.password)
    .digest('hex');

    if (hashedPassword !== userProvidedHash) throw new Error('incorrect password')

    return user;
})

const User = model('user', userSchema)

module.exports = User