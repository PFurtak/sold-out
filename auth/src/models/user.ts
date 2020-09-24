import mongoose from 'mongoose';

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (atters: UserAttrs) => {
  return new User(atters);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };
