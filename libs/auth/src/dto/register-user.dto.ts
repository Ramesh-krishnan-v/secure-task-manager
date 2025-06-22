export class RegisterUserDto {
  username!: string;
  email!: string;
  password!: string
  role!: 'Owner' | 'Admin' | 'Viewer';
}