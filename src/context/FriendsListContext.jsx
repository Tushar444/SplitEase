import { createContext, useState } from "react";

export const FriendsListContext = createContext();

export const FriendsListContextProvider = ({ children }) => {
  const [friendsList, setFriendsList] = useState([]);

  function addFriend(newFriend) {
    setFriendsList((prevList) => {
      return [...prevList, newFriend];
    });
  }

  function editFriend(index, editValue) {
    setFriendsList((prevList) => {
      const newList = prevList;
      newList[index] = editValue;
      return newList;
    });
  }

  function deleteFriend(deleteIndex) {
    setFriendsList((prevList) => {
      const newList = prevList.filter((val, index) => index !== deleteIndex);
      return newList;
    });
  }

  return (
    <FriendsListContext.Provider
      value={{ friendsList, addFriend, editFriend, deleteFriend }}
    >
      {children}
    </FriendsListContext.Provider>
  );
};
