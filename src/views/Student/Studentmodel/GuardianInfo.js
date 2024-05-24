import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TextField,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gridSpacing } from "store/constant";
import { settingGuardianDetails } from "../StudentSlice";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormStepButtons from "../../../ui-component/FormStepButtons";
import { useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const initialValues = {
  firstName: "",
  lastName: "",
  contact: "",
  relation_type: "",
};

const GuardianType = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "uncle", label: "Uncle" },
  { value: "aunt", label: "Aunt" },
  { value: "grandfather", label: "Grandfather" },
  { value: "grandmother", label: "Grandmother" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "guardian", label: "Guardian" },
  { value: "cousin", label: "Cousin" },
  { value: "Husband", label: "Husband" },
  { value: "family_friend", label: "Family Friend" },
  { value: "other", label: "Other" },
];

const GuardianInfo = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  handleReset,
  formData,
}) => {
  const [guardians, setGuardians] = useState([]);
  const { studentId } = useParams();

  const { guardianDetails } = useSelector((state) => state.student);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    contact: Yup.string().required("Contact is required"),
    relation_type: Yup.string().required("Guardian Type is required"),
  });

  const formik = useFormik({
    initialValues: studentId ? formData : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setGuardians({ ...guardians, values });
      dispatch(settingGuardianDetails([...guardianDetails, values]));
      resetForm();
    },
  });

  return (
    <>
      <div className="form-outer">
        <form action="">
          <FormControl
            defaultValue=""
            required
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#5559CE",
                },
                "&:hover fieldset": {
                  borderColor: "#5559CE",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5559CE",
                  borderWidth: "2px",
                },
              },
            }}
            size="small"
          >
            <Grid container spacing={2} sx={{ padding: "20px 30px " }}>
              <React.Fragment>
                <Grid
                  container
                  spacing={gridSpacing}
                  sx={{ padding: "30px 0" }}
                >
                  <Grid item md={6} sm={6} xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id={`course-label`}>Guardian-Type</InputLabel>
                      <Select
                        labelId={`course-label`}
                        id={`course`}
                        name={`relation_type`}
                        MenuProps={MenuProps}
                        label="Guardian-Type"
                        value={formik.values[`relation_type`] || ""}
                        onChange={formik.handleChange}
                        error={
                          formik.touched[`relation_type`] &&
                          Boolean(formik.errors[`relation_type`])
                        }
                        helperText={
                          formik.touched[`relation_type`] &&
                          formik.errors[`relation_type`]
                        }
                        InputLabelProps={{
                          style: { color: "#5559CE" },
                        }}
                      >
                        {GuardianType.map((courseItem) => (
                          <MenuItem
                            key={courseItem.value}
                            value={courseItem.value}
                          >
                            {courseItem.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      label="First Name"
                      id={`firstname`}
                      name={`firstName`}
                      value={formik.values[`firstName`]}
                      error={
                        formik.touched[`firstName`] &&
                        Boolean(formik.errors[`firstName`])
                      }
                      helperText={
                        formik.touched[`firstName`] &&
                        formik.errors[`firstName`]
                      }
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      label="Last Name"
                      id={`lastName`}
                      name={`lastName`}
                      value={formik.values[`lastName`]}
                      error={
                        formik.touched[`lastName`] &&
                        Boolean(formik.errors[`lastName`])
                      }
                      helperText={
                        formik.touched[`lastName`] && formik.errors[`lastName`]
                      }
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <PhoneInput
                      country={"in"}
                      value={formik.values.contact}
                      onChange={(value, country, e, formattedValue) => {
                        formik.setFieldValue("contact", formattedValue);
                      }}
                    />
                    {formik.touched.contact && formik.errors.contact && (
                      <FormHelperText>{formik.errors.contact}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      onClick={formik.handleSubmit}
                      style={{ float: "right" }}
                      sx={{ margin: "44px " }}
                    >
                      Add Guardian
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            </Grid>
          </FormControl>
        </form>
      </div>
      <div>
        {guardianDetails && guardianDetails.length !== 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Relation type</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guardianDetails &&
                  guardianDetails.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.relation_type}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">{row.contact}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Grid container justifyContent="flex-end" sx={{ padding: "30px 20px " }}>
        <Stack spacing={2} direction="row">
          <FormStepButtons
            activeStep={activeStep}
            steps={steps}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default GuardianInfo;
