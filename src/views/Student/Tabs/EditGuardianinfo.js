import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { GuardianType } from "../../../contants/guardiantypeConstants";
import { gridSpacing } from "store/constant";
import axios from "axios";
import { useParams } from "react-router-dom";
import { notification } from "antd";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  contact: Yup.string().required("Contact is required"),
  relation_type: Yup.string().required("Guardian Type is required"),
});

const EditGuardianinfo = ({ guardianData, refetch, guardianCancel }) => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { studentId, companyId } = useParams();

  const formik = useFormik({
    initialValues: guardianData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${companyId}/${studentId}/${guardianData.rowId}/update-guardian`;
      try {
        const response = await axios.put(apiEndpoint, values);
        if (response.status === 200) {
          refetch();
          guardianCancel();
          openNotificationWithIcon("success", response.data.data.message);
        } else {
          guardianCancel();
          console.error("Unable to update guardian", response);
        }
      } catch (error) {
        openNotificationWithIcon("error", error.response.data.message);

      }
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
            <>
              <Grid container spacing={gridSpacing} sx={{ padding: "30px 0" }}>
                <Grid item lg={12} md={6} sm={6} xs={12}>
                  <TextField
                    label="First Name"
                    id={`firstname`}
                    name={`firstName`}
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors?.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors?.firstName
                    }
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>

                <Grid item lg={12} md={6} sm={6} xs={12}>
                  <TextField
                    label="Last Name"
                    id={`lastName`}
                    name={`lastName`}
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>
                <Grid item lg={12} md={6} sm={6} xs={12}>
                  <PhoneInput
                    country={"in"}
                    name={`contact`}
                    fullWidth
                    value={formik.values.contact}
                    onChange={(value, country, e, formattedValue) => {
                      formik.setFieldValue(`contact`, formattedValue);
                    }}
                  />
                  {formik.touched[`contact`] && formik.errors[`contact`] && (
                    <FormHelperText style={{ color: "red" }}>
                      {formik.errors[`contact`]}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item lg={12} md={6} sm={6} xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id={`course-label`}>Guardian-Type</InputLabel>
                    <Select
                      labelId={`course-label`}
                      id={`course`}
                      name={`relation_type`}
                      MenuProps={MenuProps}
                      label="Guardian-Type"
                      value={formik.values?.relation_type || ""}
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
                      // style={{ width: '260px' }}
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
              </Grid>

              <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={formik.handleSubmit}
                  style={{ float: "right" }}
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",

                    "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
                  }}
                >
                  Save
                </Button>
              </Grid>
            </>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default EditGuardianinfo;
