import React, { useState } from "react";
import { PersonDataAll } from "../../../models/types";

type SetUserDataType = (user: PersonDataAll) => void;
type UserContextData = {
  user: PersonDataAll;
  setUser: SetUserDataType;
  getHasUserValues: () => boolean;
};

const initialValue: Partial<UserContextData> = {
  user: {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    age: 0,
    height: 0,
    weight: 0,
  },
  setUser: () => {},
};

export const UserContext = React.createContext<UserContextData>(
  initialValue as UserContextData
);

const UserContextWrapper = ({ children }: any) => {
  const [userData, setUserData] = useState<PersonDataAll>(initialValue.user!);

  const getHasUserValues = () => {
    return (
      userData.name !== "" ||
      userData.surname !== "" ||
      userData.email !== "" ||
      userData.phoneNumber !== "" ||
      userData.age !== 0
    );
  };

  return (
    <UserContext.Provider
      value={{
        user: userData,
        setUser: setUserData,
        getHasUserValues: getHasUserValues,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
