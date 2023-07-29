import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export type UserRol = {
  id: string
  description: string
  name: string
}

export type SessionData = {
  id: string;
  username: string;
  email: string;
  name: string;
  businessId: string;
  roles?: UserRol
};

export type ContextType = {
  user: {
    id: number;
    username: string;
    businessId: string;
    userId: string;
    roles?: UserRol
  };
};

export type ParameterList = {
  [key: string]: string
}