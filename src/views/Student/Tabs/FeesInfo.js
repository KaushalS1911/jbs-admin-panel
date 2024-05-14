import React from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { numberofinstallmentConstants } from "contants/numberofinstallmentConstants";
import instance from "helpers/axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { notification } from "antd";

const validationSchema = Yup.object({
  total_amount: Yup.string().required("Total Amount is required"),
  amount_paid: Yup.string().required("Amount Paid is required"),
  amount_remaining: Yup.string().required("Amount Remaining is required"),
  admission_amount: Yup.string().required("Admission Amount is required"),
  upcoming_installment_date: Yup.date().required(
    "Next installment  is required"
  ),
  upcoming_installment_amount: Yup.string().required(
    "Next installment amount is required"
  ),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const FeesInfo = ({ formData, studentData, refetch }) => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { studentId, companyId } = useParams();

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("upcoming_installment_date", selectedDates[0]);
  };

  const filteredInstallments = formData?.installments?.filter((installment) => {
    return installment.status !== "Paid";
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateStudent(values);
    },
  });

  async function handleUpdateStudent(values) {
    const payload = {
      ...studentData,
      fees_info: {
        ...studentData.fees_info,
        total_amount: values.total_amount || "",
        amount_paid: values.amount_paid || "",
        amount_remaining:
          formik.values?.total_amount -
            formik.values.amount_paid -
            formik.values.admission_amount -
            formik.values.discount || "",
        admission_amount: values.admission_amount || "",
        upcoming_installment_date: values.upcoming_installment_date || "",
        upcoming_installment_amount:
          (formik.values?.total_amount -
            formik.values.amount_paid -
            formik.values.admission_amount -
            formik.values.discount) /
            formik.values.no_of_installments || "",
        no_of_installments: values.no_of_installments || "",
        discount: values.discount || "",
      },
    };

    await instance({
      method: "PUT",
      url: `company/${companyId}/${studentId}/updateStudent`,
      data: payload,
    })
      .then((response) => {
        openNotificationWithIcon("success", response.data.data.message);
        refetch();
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data.message);
      });
  }

  return (
    <div>
      <div className="form-outer">
        <form action=" " onSubmit={formik.handleSubmit}>
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
            <Grid
              container
              spacing={gridSpacing}
              sx={{ padding: "20px 30px " }}
            >
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Total Amount "
                  variant="outlined"
                  fullWidth
                  name="total_amount"
                  value={formik.values?.total_amount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.total_amount && !!formik.errors.total_amount
                  }
                  helperText={
                    formik.touched.total_amount && formik.errors.total_amount
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Amount Paid "
                  variant="outlined"
                  fullWidth
                  name="amount_paid"
                  value={formik.values?.amount_paid}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.amount_paid && !!formik.errors.amount_paid
                  }
                  helperText={
                    formik.touched.amount_paid && formik.errors.amount_paid
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Admission Amount "
                  variant="outlined"
                  fullWidth
                  name="admission_amount"
                  value={formik.values?.admission_amount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.admission_amount &&
                    !!formik.errors.admission_amount
                  }
                  helperText={
                    formik.touched.admission_amount &&
                    formik.errors.admission_amount
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label=" Amount Remaining "
                  variant="outlined"
                  fullWidth
                  disabled
                  name="amount_remaining"
                  value={
                    formik.values?.total_amount -
                    formik.values.amount_paid -
                    formik.values.admission_amount -
                    formik.values.discount
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.amount_remaining &&
                    !!formik.errors.amount_remaining
                  }
                  helperText={
                    formik.touched.amount_remaining &&
                    formik.errors.amount_remaining
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Number of Installment
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-label"
                    MenuProps={MenuProps}
                    name="no_of_installments"
                    value={formik.values?.no_of_installments}
                    error={
                      formik.touched.no_of_installments &&
                      Boolean(
                        (<formik className="errors"></formik>)
                          .no_of_installments
                      )
                    }
                    helperText={
                      formik.touched.no_of_installments &&
                      formik.errors.no_of_installments
                    }
                    onChange={formik.handleChange}
                    label="Number of Installment"
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  >
                    {numberofinstallmentConstants.map(
                      (numberofinstallmentConstantsItem) => (
                        <MenuItem
                          key={numberofinstallmentConstantsItem.value}
                          value={numberofinstallmentConstantsItem.value}
                        >
                          {numberofinstallmentConstantsItem.label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Discount"
                  variant="outlined"
                  fullWidth
                  name="discount"
                  value={formik.values?.discount}
                  onChange={formik.handleChange}
                  error={formik.touched.discount && !!formik.errors.discount}
                  helperText={formik.touched.discount && formik.errors.discount}
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                  }}
                />
              </Grid>

              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                sx={{ marginBottom: "10px" }}
              >
                <Box
                  className="flatpicker-input"
                  style={{ outline: "none", whiteSpace: "nowrap" }}
                >
                  <Flatpickr
                    placeholder="Next installment Date"
                    name="upcoming_installment_date"
                    disabled
                    value={filteredInstallments?.[0]?.installment_date || null}
                    onChange={(selectedDates) => onDateChange(selectedDates)}
                    className="form-control"
                    options={{
                      dateFormat: "Y-m-d ",
                      mode: "single",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Next installment amount "
                  variant="outlined"
                  fullWidth
                  disabled
                  name="upcoming_installment_amount"
                  value={
                    (formik.values?.total_amount -
                      formik.values.amount_paid -
                      formik.values.admission_amount -
                      formik.values.discount) /
                    formik.values.no_of_installments
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.upcoming_installment_amount &&
                    !!formik.errors.upcoming_installment_amount
                  }
                  helperText={
                    formik.touched.upcoming_installment_amount &&
                    formik.errors.upcoming_installment_amount
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "flex-end" }}
              sx={{
                margin: { xs: "10px 0" },
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  type="submit"
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
              </Stack>
            </Grid>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default FeesInfo;
