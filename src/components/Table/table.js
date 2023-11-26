  import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3001/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEdit = (id, data) => {
    setEditingUserId(id);
    setEditedData(data);
  };

  const handleUpdate = (id) => {
    // Send a PUT request to update the user
    axios.put(`http://localhost:3001/users/${id}`, editedData)
      .then(() => {
        setEditingUserId(null);
        setEditedData({});
        fetchData(); // Fetch updated data after the update
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleInputChange = (fieldName, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data) => (
            <tr key={data._id}>
              <td>
                {editingUserId === data._id ? (
                  <input
                    type="text"
                    value={editedData.name || data.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  data.name
                )}
              </td>
              <td>
                {editingUserId === data._id ? (
                  <input
                    type="text"
                    value={editedData.email || data.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  data.email
                )}
              </td>
              <td>
                {editingUserId === data._id ? (
                  <input
                    type="text"
                    value={editedData.phone || data.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  data.phone
                )}
              </td>
              <td>{data._id}</td>
              <td>
                {editingUserId === data._id ? (
                  <button onClick={() => handleUpdate(data._id)}>Update</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(data._id, data)}>Edit</button>
                    <button onClick={() => handleDelete(data._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
