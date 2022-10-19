import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { APIConfigService } from 'src/modules/api-config/api-config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiConfigService: APIConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hash = await bcrypt.hash(
      createUserDto.password,
      this.apiConfigService.env.hash.salt,
    );
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    const user = await createdUser.save();
    user.password = null;
    return user;
  }

  async findOne(id: string, conditions: object): Promise<UserDocument> {
    const user = id
      ? await this.userModel.findById(id).exec()
      : await this.userModel.findOne(conditions).exec();
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();
    return user;
  }
}
