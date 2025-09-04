import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
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
} from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  updateUserApi,
  getUserById,
  // User,
} from "../../apiservice/Apifile";
import "./UserStyle.scss";

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
});

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
        {isEdit ? "Edit User" : "Create User"}
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
              <Grid item size={6} sx={{ gap: 2 }}>
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
              </Grid>

              <Grid item size={6} sx={{ gap: 2 }}>
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

                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                        helperText={
                          touched.address?.city && errors.address?.city
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                </Grid>

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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {isEdit ? "Update User" : "Create User"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UserForm;
