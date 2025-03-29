import 'next-auth';

export interface User {
  id: number;
  email: string;
  accessToken: string;
}

declare module 'next-auth' {
  interface Session {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
  }
} 