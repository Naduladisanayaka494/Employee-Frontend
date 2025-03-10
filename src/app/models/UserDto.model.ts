// user-dto.model.ts
import { UserRole } from './user-role.enum';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  userRole: UserRole;
  profilePhotoPath: string;
}
