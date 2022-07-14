import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/roles/roles.enum';

export class RoleUpdateDTO {
  @ApiProperty({ description: 'Array of roles to be attached' })
  roles: Role[];
}
