export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  statuses: string[];
};

export interface UserRegistration {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
}
