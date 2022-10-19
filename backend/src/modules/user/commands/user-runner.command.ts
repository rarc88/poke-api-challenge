import { Command, CommandRunner } from 'nest-commander';
import { UserService } from '../user.service';

@Command({
  name: 'users:seed',
  options: { isDefault: true },
})
export class UsersRunner extends CommandRunner {
  private readonly users = [{ username: 'test', password: '12345' }];

  constructor(private readonly userService: UserService) {
    super();
  }

  async run(): Promise<void> {
    console.log('------------------------------------------------------------');
    console.log('Begin user seeds');

    for (const key in this.users) {
      let user = await this.userService.findByUsername(
        this.users[key].username,
      );
      if (!user) {
        user = await this.userService.create(this.users[key]);
        console.log(JSON.stringify(user));
      }
    }

    console.log('End user seeds');
    console.log('------------------------------------------------------------');
  }
}
