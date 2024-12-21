/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './users.interface';
import config from '../../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   const user = this;
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it is modified or new
  if (!user.isModified('password')) {
    return next();
  }

  if (!user.password) {
    throw new Error('Password is required');
  }

  // Hash the password
  const saltRounds = Number(config.bcrypt_salt_rounds) || 10; // Default to 10 if not configured
  user.password = await bcrypt.hash(user.password, saltRounds);

  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

//set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
