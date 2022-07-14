import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateLocalUserDto } from './dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class LocalAuthService {
  private saltOrRounds: string | number;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.saltOrRounds = this.configService.get<string>('saltOrRounds');
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user: User = await this.userModel
      .findOne({
        username,
      })
      .exec();
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async create(userDto: CreateLocalUserDto): Promise<User | null> {
    const { username } = userDto;
    // check if the user exists in the db
    const userInDb = await this.usersService.findOne({
      username,
    });
    if (!userInDb) {
      userDto.password = await bcrypt.hash(userDto.password, this.saltOrRounds);
      const createdUser = new this.userModel({
        ...userDto,
        providerId: randomUUID(),
      });
      return createdUser.save();
    }
    return null;
  }
}
