import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../features/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [editUserId, setEditUserId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUsers(response.data));
    };
    fetchUsers();
  }, [dispatch, token]);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, { name, email }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUserId(null);
      setName('');
      setEmail('');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border">
                {editUserId === user._id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-4 border">
                {editUserId === user._id ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-2 px-4 border">
                {editUserId === user._id ? (
                  <>
                    <button onClick={() => handleSave(user._id)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditUserId(null)} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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

export default Home;
