import { User } from "interfaces";
import React from "react";

interface AuthContextType {
  user: User;
  // checkStatus: () => void;
  signin: (user: User, callback: VoidFunction) => void;
  update: (user: User) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [user, setUser] = React.useState<User>(null!);

  // let checkStatus = () => {
  //     axios.get(process.env.REACT_APP_BACK_URL + "/users/me",
  //     {
  //         withCredentials: true
  //     }).then(res => {
  //     setUser(res.data);
  //     console.log("THIS IS A TEST", user)
  //     })
  //     .catch(err => console.log("THIS TOO IS A TEST", err))    }

  let signin = (user: User, callback: VoidFunction) => {
    console.log("auth.signin called");
    setUser(user);
    callback();
  };

  let update = (user: User) => {
    console.log("auth.update called");
    setUser(user);
  };

  let signout = (callback: VoidFunction) => {
    setUser(null!);
    callback();
  };

  let value = { user, update, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}