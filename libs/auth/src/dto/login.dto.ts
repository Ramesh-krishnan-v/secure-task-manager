export class LoginDto {
  username!: string;
  password!: string;
  role!: 'Owner' | 'Admin' | 'Viewer';
}