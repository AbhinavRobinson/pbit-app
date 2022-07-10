import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaidAuthService {
  private saltOrRounds: string | number;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.saltOrRounds = this.configService.get<string>('saltOrRounds');
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
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
      userDto.password = await bcrypt.hash(userDto.password, this.saltOrRounds);
      const createdUser = new this.userModel(userDto);
      return createdUser.save();
    }
    return null;
  }
}
