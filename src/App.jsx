import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./features/Users";

function App() {
  const userList = useSelector((state) => state.users.value) || []; // Provide a default value of an empty array if userList is null
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [addUserError, setAddUserError] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleAddUser = () => {
    if (!name || !username) {
      setAddUserError("Please enter both name and username");
      return;
    }

    dispatch(
      addUser({
        id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 0,
        name: name,
        username: username,
        profileImage: profileImage,
      })
    );
    setAddUserError(null);
    setName("");
    setUsername("");
    setProfileImage(null);
  };

  const handleEditUser = (userId, currentUsername, currentName) => {
    setEditingUserId(userId);
    setNewUsername(currentUsername);
    setNewName(currentName);
    setIsModified(false);
  };

  const handleUpdateUser = () => {
    if (!newUsername || !newName) {
      setUpdateUserError("Please enter a username and name");
      return;
    }

    dispatch(
      updateUser({ id: editingUserId, username: newUsername, name: newName })
    );
    setEditingUserId(null);
    setNewUsername("");
    setNewName("");
    setIsModified(false);
  };

  const handleCancelUpdate = () => {
    setEditingUserId(null);
    setNewUsername("");
    setNewName("");
    setIsModified(false);

    if (updateUserError) setUpdateUserError(null);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser({ id: userId }));
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setIsModified(
      e.target.value !==
        userList.find((user) => user.id === editingUserId).username
    );
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    setIsModified(
      e.target.value !== userList.find((user) => user.id === editingUserId).name
    );
  };

  return (
    <div className="App">
      <div className="addUser">
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setAddUserError(null);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setAddUserError(null);
          }}
        />

        {addUserError && <div className="error">{addUserError}</div>}

        <button className="addButton" onClick={handleAddUser}>
          Add User
        </button>
      </div>
      {userList.length > 0 && (
        <div className="displayUsers">
          {userList
            .slice(0)
            .reverse()
            .map((user, index) => (
              <div key={index} className="user">
                <div className="userDetails">
                  <div className="containerUser">
                    <div className="containerUserInformation">
                      <div className="name">
                        <span>Name: </span> {user.name}
                      </div>
                      <div className="username">
                        <span>Username: </span>
                        {user.username}
                      </div>
                    </div>
                  </div>
                  {editingUserId === user.id ? (
                    <>
                      <input
                        type="text"
                        placeholder={user.name}
                        value={newName}
                        onChange={handleNameChange}
                      />
                      <input
                        type="text"
                        placeholder={user.username}
                        value={newUsername}
                        onChange={handleUsernameChange}
                      />

                      {updateUserError && (
                        <div className="error">{updateUserError}</div>
                      )}

                      {isModified && (
                        <button
                          className="submitButton"
                          onClick={handleUpdateUser}
                        >
                          Submit
                        </button>
                      )}
                      <button
                        className="cancelButton"
                        onClick={handleCancelUpdate}
                      >
                        Cancel
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete User
                      </button>
                    </>
                  ) : (
                    <button
                      className="updateButton"
                      onClick={() =>
                        handleEditUser(user.id, user.username, user.name)
                      }
                    >
                      Update User
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;