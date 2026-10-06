import type { User } from "./user.type";

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
