/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './users.interface';
import config from '../config';

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

userSchema.pre('save', async function (next) {
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// userSchema.static.isUserExistsByEmail = async function (email: string) {
//   return await User.findOne({ email });
// };

export const User = model<TUser>('User', userSchema);
