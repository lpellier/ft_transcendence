import { socket } from "index";
import { User } from "interfaces";
import React, { useState } from "react";

interface AuthContextType {
  user: User;
  imageId: number;
  // sketch: p5;
  // checkStatus: () => void;
  signin: (user: User, callback: VoidFunction) => void;
  update: (user: User) => void;
  signout: (callback: VoidFunction) => void;
  // createSketch: () => void;
  updateAvatar: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [user, setUser] = useState<User>(null!);
  let [imageId, setImageId] = useState<number>(1);

  // let [sketch, setSketch] = React.useState<p5>(null!);

  // let createSketch = () => setSketch(new p5(Sketch));
  let updateAvatar = () => {
    setImageId(imageId + 1);
    console.log("image id is now", imageId);
  };

  let signin = (user: User, callback: VoidFunction) => {
    console.log("auth.signin called");
    socket.connect();
    setUser(user);
    callback();
  };

  let update = (user: User) => {
    console.log("auth.signin called");
    setUser(user);
  };

  let signout = (callback: VoidFunction) => {
    setUser(null!);
    socket.disconnect();
    callback();
  };

  let value = { user, imageId, signin, update, signout, updateAvatar };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
