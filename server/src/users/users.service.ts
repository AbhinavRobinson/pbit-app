import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserWithoutPassword } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(
    params: FilterQuery<UserDocument>,
  ): Promise<UserWithoutPassword> {
    const { password, ...rest } = await this.userModel.findOne(params).exec();
    return rest;
  }

  async findOneAndUpdate(
    id: FilterQuery<UserDocument>,
    params: UpdateQuery<UserDocument>,
  ): Promise<UserWithoutPassword> {
    const { password, ...rest } = await this.userModel
      .findOneAndUpdate(id, params)
      .exec();
    return rest;
  }
}
