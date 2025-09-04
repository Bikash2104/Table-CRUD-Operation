/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers, deleteUser } from "../redux/usersSlice";
import "./UserList.scss";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loader">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>
          Manage <span>Employees</span>
        </h2>
        <div className="header-actions">
          <button className="btn delete">Delete</button>
          <Link to="/create" className="btn add">
            + Add New Employee
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Role</th>
              <th>Skills</th>
              <th>Available Slots</th>
              <th>Company</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u: any, index: number) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>
                  <input type="checkbox" />
                </td>
                <td className="name">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.address?.street}, {u.address?.city}
                </td>
                <td>{u.phone}</td>
                <td>
                  <a href={u.website} target="_blank" rel="noopener noreferrer">
                    {u.website}
                  </a>
                </td>
                <td>{u.role}</td>
                <td>{u.skills?.join(", ")}</td>
                <td>
                  {u.availableSlots
                    ?.map((slot: string) => new Date(slot).toLocaleString())
                    .join(", ")}
                </td>
                <td>{u.company?.name}</td>
                <td className="actions">
                  <Link to={`/edit/${u.id}`} className="edit">
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => dispatch(deleteUser(u.id))}
                    className="delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <p>
            Showing {data.length} of {data.length} entries
          </p>
          <div className="pagination-buttons">
            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
