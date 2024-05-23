import React from "react";
import * as Yup from "yup";
import {
  Box,
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
import { useDispatch, useSelector } from "react-redux";
import { removeAllStateData } from "../StudentSlice";
import FormStepButtons from "../../../ui-component/FormStepButtons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { numberofinstallmentConstants } from "../../../contants/numberofinstallmentConstants";
import { notification } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const initialValues = {
  total_amount: "",
  amount_paid: "",
  amount_remaining: " ",
  admission_amount: "",
  upcoming_installment_date: null,
  upcoming_installment_amount: "",
  no_of_installments: "",
  discount: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const FeesInfo = ({ activeStep, steps, handleBack, handleReset, formData }) => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { companyId, studentId } = useParams();
  const { personalDetails, addressDetails, guardianDetails } = useSelector(
    (state) => state.student
  );
  const validationSchema = Yup.object({
    total_amount: Yup.string().required("Total Amount is required"),
    amount_paid: Yup.string().required("Amount Paid is required"),
    amount_remaining: Yup.string().required("Amount Remaining is required"),
    admission_amount: Yup.string().required("Admission Amount is required"),
    upcoming_installment_date: Yup.date().required(
      "Next installment D is required"
    ),
    upcoming_installment_amount: Yup.string().required(
      "Next installment amount is required"
    ),
    no_of_installments: Yup.string().required("No of installment  is required"),
    discount: Yup.string().required("Discount Remaining is required"),
  });

  function formatDate(inputDate) {
    const originalDate = new Date(inputDate);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("upcoming_installment_date", selectedDates[0]);
  };

  const formik = useFormik({
    initialValues: studentId ? formData : initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formattedInstallDate = formatDate(values.upcoming_installment_date);
      const totalAmount = parseFloat(values.total_amount) || 0;
      const amountPaid = parseFloat(values.amount_paid) || 0;
      const admissionAmount = parseFloat(values.admission_amount) || 0;
      const discountAmt = parseFloat(values.discount) || 0;
      const noOfInstallments = parseInt(values.no_of_installments) || 0;
      const amountRemaining =
        totalAmount - amountPaid - admissionAmount - discountAmt;

      const finalobj = {
        ...values,
        amount_paid: amountPaid,
        total_amount: totalAmount,
        discount: discountAmt,
        admission_amount: admissionAmount,
        amount_remaining: amountRemaining,
        no_of_installments: noOfInstallments,
        upcoming_installment_date: formattedInstallDate,
      };
      const { enrollment_no } = personalDetails;
      const {
        firstName,
        lastName,
        contact,
        email,
        dob,
        education,
        college,
        blood_group,
        gender,
        course,
        joining_date,
      } = personalDetails;
      const { address_1, address_2, city, state, country, zipcode } =
        addressDetails;
      const {
        total_amount,
        amount_paid,
        amount_remaining,
        admission_amount,
        upcoming_installment_date,
        upcoming_installment_amount,
        no_of_installments,
        discount,
      } = finalobj;
      const payload = {
        firstName,
        lastName,
        contact,
        email,
        dob,
        education,
        college,
        blood_group,
        gender,
        course,
        joining_date,
        address_1,
        address_2,
        city,
        state,
        country,
        zipcode,
        guardian_info: guardianDetails,
        total_amount,
        amount_paid,
        amount_remaining,
        admission_amount,
        upcoming_installment_date,
        upcoming_installment_amount,
        no_of_installments,
        discount,
        enrollment_no,
      };
      console.log("b----r", payload);

      setLoading(true);
      await axios({
        method: "POST",
        baseURL: `${process.env.REACT_APP_API_URL}${companyId}/`,
        url: "student",
        data: payload,
        withCredentials: false,
      })
        .then((res) => {
          console.log("a----r", payload);
          if (res.status === 200) {
            dispatch(removeAllStateData());
            openNotificationWithIcon(res.data.data.message);
            navigate("/student");
            setLoading(false);
          }
          window.location="/student";
        })
        .catch((error) => {
          setLoading(false);
          dispatch(removeAllStateData());
          openNotificationWithIcon(error.data.message);
        });
      resetForm();
    },
  });
  return (
    <>
      <div className="form-outer">
        <form action="" onSubmit={formik.handleSubmit}>
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
                  value={formik.values.total_amount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.total_amount && !!formik.errors.total_amount
                  }
                  helperText={
                    formik.touched.total_amount && formik.errors.total_amount
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
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
                  value={formik.values.amount_paid}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.amount_paid && !!formik.errors.amount_paid
                  }
                  helperText={
                    formik.touched.amount_paid && formik.errors.amount_paid
                  }
                  InputLabelProps={{
                    style: { color: "#5559CE" },
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
                  value={formik.values.admission_amount}
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
                  value={formik.values.discount}
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
                    value={formik.values.upcoming_installment_date}
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
                    formik.values.upcoming_installment_amount !== NaN
                      ? (formik.values.upcoming_installment_amount =
                          (formik.values?.total_amount -
                            formik.values.amount_paid -
                            formik.values.admission_amount -
                            formik.values.discount) /
                          formik.values.no_of_installments)
                      : 0
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

              <Grid
                container
                justifyContent="flex-end"
                sx={{ padding: "30px 20px " }}
              >
                <Stack spacing={2} direction="row">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <FormStepButtons
                      activeStep={activeStep}
                      steps={steps}
                      handleBack={handleBack}
                      handleNext={formik.handleSubmit}
                      handleReset={handleReset}
                    />
                  )}
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default FeesInfo;
