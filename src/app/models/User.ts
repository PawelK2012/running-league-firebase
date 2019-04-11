export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  id?: string;
  email?: string;
  userName?: string;
  roles?: string;
  superAdmin?: boolean;
  listOfRuns?: string[];
}
