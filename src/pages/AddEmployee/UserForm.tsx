import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  Grid,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  updateUserApi,
  getUserById,
} from "../../apiservice/Apifile";
import "./UserStyle.scss";
import { Trash2 } from "lucide-react";

const validationSchema = Yup.object({
  name: Yup.string().min(3).required("Name is required"),
  username: Yup.string().min(3).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits"),
  role: Yup.string().required("Role is required"),
  address: Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Zipcode is required"),
  }),
  company: Yup.object({
    name: Yup.string().required("Company name is required"),
  }),
  skills: Yup.array().of(
    Yup.string().min(2, "Skill must be at least 2 characters").max(10)
  ),
  availableSlots: Yup.array().of(
    Yup.string().test("is-future-date", "Date must be in the future", (value) =>
      value ? new Date(value) > new Date() : true
    )
  ),
});

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  isActive: boolean;
  skills: string[];
  availableSlots: string[];
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  role: "Admin" | "Editor" | "Viewer";
}

interface UserFormProps {
  initialValues: Partial<User>;
  isEdit?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialValuesState, setInitialValuesState] =
    useState<Partial<User>>(initialValues);

  useEffect(() => {
    if (isEdit && id) {
      getUserById(id)
        .then((res) => setInitialValuesState(res.data))
        .catch((err) => setError(err.message || "Failed to fetch user"));
    }
  }, [id, isEdit]);

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      if (isEdit && values.id) {
        await updateUserApi(values.id, values);
      } else {
        await createUser(values);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="user-form">
      <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
        {isEdit ? "Edit Employee Details" : "Enter Employee Details"}
      </Typography>

      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <Formik
        initialValues={initialValuesState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Grid container spacing={4}>
              {/* Left side */}
              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel className="field-label">Name</FormLabel>
                  <TextField
                    fullWidth
                    name="name"
                    value={values.name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Username</FormLabel>
                  <TextField
                    fullWidth
                    name="username"
                    value={values.username || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Email</FormLabel>
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Phone</FormLabel>
                  <TextField
                    fullWidth
                    name="phone"
                    value={values.phone || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Website</FormLabel>
                  <TextField
                    fullWidth
                    name="website"
                    value={values.website || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel className="field-label">Available Slots</FormLabel>
                  <FieldArray name="availableSlots">
                    {({ push, remove }) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {(values.availableSlots || []).map((slot, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <TextField
                              fullWidth
                              type="datetime-local"
                              name={`availableSlots.${index}`}
                              value={slot}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.availableSlots?.[index] &&
                                Boolean(errors.availableSlots?.[index])
                              }
                              helperText={
                                touched.availableSlots?.[index] &&
                                errors.availableSlots?.[index]
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Trash2 onClick={() => remove(index)} size={18} />
                            </div>
                          </div>
                        ))}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => push("")}
                          >
                            Add Slot
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </FormControl>
              </Grid>

              <Grid item size={6}>
                <FormControl fullWidth>
                  <FormLabel className="field-label">Role</FormLabel>
                  <TextField
                    select
                    fullWidth
                    name="role"
                    value={values.role || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Viewer">Viewer</MenuItem>
                  </TextField>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Street</FormLabel>
                  <TextField
                    fullWidth
                    name="address.street"
                    value={values.address?.street || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.address?.street && Boolean(errors.address?.street)
                    }
                    helperText={
                      touched.address?.street && errors.address?.street
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel className="field-label">Company Name</FormLabel>
                  <TextField
                    fullWidth
                    name="company.name"
                    value={values.company?.name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.company?.name && Boolean(errors.company?.name)
                    }
                    helperText={touched.company?.name && errors.company?.name}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">City</FormLabel>
                  <TextField
                    fullWidth
                    name="address.city"
                    value={values.address?.city || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.address?.city && Boolean(errors.address?.city)
                    }
                    helperText={touched.address?.city && errors.address?.city}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Zipcode</FormLabel>
                  <TextField
                    fullWidth
                    name="address.zipcode"
                    value={values.address?.zipcode || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.address?.zipcode &&
                      Boolean(errors.address?.zipcode)
                    }
                    helperText={
                      touched.address?.zipcode && errors.address?.zipcode
                    }
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel className="field-label">Skills</FormLabel>
                  <FieldArray name="skills">
                    {({ push, remove }) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {(values.skills || []).map((skill, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <TextField
                              fullWidth
                              name={`skills.${index}`}
                              value={skill}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter skill"
                              error={
                                touched.skills?.[index] &&
                                Boolean(errors.skills?.[index])
                              }
                              helperText={
                                touched.skills?.[index] &&
                                errors.skills?.[index]
                              }
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Trash2 onClick={() => remove(index)} size={18} />
                            </div>
                          </div>
                        ))}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => push("")}
                          >
                            Add Skill
                          </Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="isActive"
                      checked={values.isActive || false}
                      onChange={handleChange}
                    />
                  }
                  label="Active User"
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "20px",
              }}
            >
              <Link to={"/"}>
                <Button variant="contained" color="primary">
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {isEdit ? "Update User" : "Create User"}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UserForm;
