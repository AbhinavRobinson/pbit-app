import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserWithoutPassword } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserWithoutPassword> {
    const result = await this.userModel.findOne(filter);
    if (!result) {
      return null;
    }
    delete result.password;
    return result;
  }

  async findOneAndUpdate(
    filter: FilterQuery<UserDocument>,
    params: UpdateQuery<UserDocument>,
  ): Promise<UserWithoutPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.userModel.findOneAndUpdate(filter, params);
    if (!result) {
      return null;
    }
    delete result.password;
    return result;
  }
}
