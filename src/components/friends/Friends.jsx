import "./friends.scss";
import { FriendsListContext } from "../../context/FriendsListContext";
import { useContext, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const Friends = () => {
  const [currFriend, setCurrFriend] = useState("");
  const [editVal, setEditVal] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const { friendsList, addFriend, editFriend, deleteFriend } =
    useContext(FriendsListContext);

  const handleClick = () => {
    if (currFriend !== "") {
      addFriend(currFriend);
      setCurrFriend("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditVal(friendsList[index]);
  };

  const handleDone = () => {
    editFriend(editIndex, editVal);
    setEditIndex(-1);
    setEditVal("");
  };

  const handleDelete = (index) => {
    deleteFriend(index);
  };

  return (
    <div className="friends">
      <div className="userInput">
        <input
          type="text"
          placeholder="Add friend"
          onChange={(e) => setCurrFriend(e.target.value)}
          value={currFriend}
        />
        <button onClick={handleClick}>+</button>
      </div>
      <hr />
      <div className="list">
        {friendsList &&
          friendsList.map((friend, index) => {
            return (
              <div className="friend" key={index}>
                {editIndex === index ? (
                  <div className="edit">
                    <div className="info">
                      <PersonIcon />
                      <input
                        type="text"
                        value={editVal}
                        onChange={(e) => setEditVal(e.target.value)}
                      />
                    </div>
                    <div className="icons">
                      <button className="tick-btn" onClick={handleDone}>
                        <DoneIcon />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="noEdit">
                    <div className="info">
                      {<PersonIcon />}
                      {friend}
                    </div>
                    <div className="icons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        {<EditIcon />}
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        {<DeleteIcon />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Friends;
