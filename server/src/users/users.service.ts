import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(params: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(params).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
