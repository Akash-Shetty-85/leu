import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const fetchData = () => {
    axios.get("http://localhost:3001/users")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        fetchData(); // Fetch updated data after deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // Listen for changes in userData (triggered by form submission)
//   useEffect(() => {
//     fetchData();
//   }, [userData]);

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
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data) => (
            <tr key={data._id}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data._id}</td>
              <td>
                <button onClick={() => handleDelete(data._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
