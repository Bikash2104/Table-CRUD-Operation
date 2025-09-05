import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers, deleteUser } from "../redux/usersSlice";
import "./UserList.scss";
import { Button, TextField } from "@mui/material";

const UserList = () => {
  const dispatch = useAppDispatch();
  const { data, loading, total } = useAppSelector((state) => state.users);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit, search: debouncedSearch }));
  }, [dispatch, page, limit, debouncedSearch]);

  if (loading) {
    return (
      <div className="loader">
        <p>Loading users...</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>
          Manage <span>Employees</span>
        </h2>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
                  <Link to={`/view/${u.id}`}>
                    <Button variant="outlined" color="primary">
                      View
                    </Button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <p>
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)}{" "}
            of {total} entries
          </p>
          <div className="pagination-buttons">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                className={page === pg ? "active" : ""}
                onClick={() => setPage(pg)}
              >
                {pg}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
