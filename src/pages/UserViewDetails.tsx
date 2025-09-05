import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { getUserById } from "../api";
import { CircularProgress, Typography, Button } from "@mui/material";
import "./UserViewPage.scss";
import { getUserById } from "../apiservice/Apifile";

const UserViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((res) => setUser(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loader">
        <CircularProgress />
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return <Typography>No user found</Typography>;
  }

  return (
    <div className="user-view-container">
      <h2>User Details</h2>
      <div className="user-details-card">
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>
          Address: {user.address?.street}, {user.address?.city}
        </Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>
          Website:{" "}
          <a href={user.website} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </Typography>
        <Typography>Role: {user.role}</Typography>
        <Typography>Skills: {user.skills?.join(", ") || "None"}</Typography>
        <Typography>
          Available Slots:{" "}
          {user.availableSlots
            ?.map((slot: string) => new Date(slot).toLocaleString())
            .join(", ") || "No Slots"}
        </Typography>
        <Typography>Company: {user.company?.name}</Typography>
      </div>

      <div className="actions">
        <Link to="/">
          <Button variant="outlined">Back to List</Button>
        </Link>
        <Link to={`/edit/${user.id}`}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserViewPage;
