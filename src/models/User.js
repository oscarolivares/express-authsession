const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      match: /\S+@\S+\.\S+/,
      unique: true,
      required: [true, 'email is required']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'password is required']
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'guest'],
      default: 'user'
    },
    firstName: String,
    lastName: String
  },
  { timestamps: true }
);

// Encrypt password before save
userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
  bcrypt.genSalt(rounds, (err, salt) => {
    if (err) {
      next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Aditional method for password comparations when user try to login
userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      return cb(err);
    } else {
      return cb(null, match);
    }
  });
};

module.exports = mongoose.model('User', userSchema);
