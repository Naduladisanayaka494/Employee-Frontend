// user.model.ts
import { UserRole } from './user-role.enum';
import { Department } from './department.model';

export interface User {
  // id: string;
  name: string;
  email: string;
  password?: string;
  // userRole: UserRole;
  // department: Department | null;
  // profilePhotoPath: string|null;
}
