import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Injectable()
export class PlaidAuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const { username } = userDto;
    // check if the user exists in the db
    const userInDb = await this.usersService.findOne({
      username,
    });
    if (!userInDb) {
      const createdUser = new this.userModel(userDto);
      return createdUser.save();
    }
    return null;
  }
}
