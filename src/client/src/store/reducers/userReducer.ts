import { User } from "../../models/User";
import { Action } from "../types";

const userReducer = (state = new User(), action: Action<User>) => {
  switch (action.type) {
    case "SET_USER": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
