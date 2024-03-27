import React from 'react'

import * as Yup from 'yup'

import { FormControl, Grid, InputLabel, Stack, TextField, MenuItem, Select } from '@mui/material'
import location from '../../../Countrystatecity.json'
import { gridSpacing } from 'store/constant'
import { useFormik } from 'formik'
import FormStepButtons from '../../../ui-component/FormStepButtons'
import { useDispatch } from 'react-redux'
import { settingAddressDetails } from '../StudentSlice'
import { useParams } from 'react-router'

const initialValues = {
  address_1: '',
  address_2: '',
  city: '',
  state: '',
  country: '',
  zipcode: ''
}
const AddressInfo = ({ activeStep, steps, handleNext, handleBack, handleReset, formData }) => {
  
  const dispatch = useDispatch()
  const { studentId } = useParams()
  const validationSchema = Yup.object({
    address_1: Yup.string().required('Address  1 is required'),
    address_2: Yup.string().required('Address  2 is required'),
    zipcode: Yup.string()
      .required('Zip code is required')
      .matches(/^\d{1,6}$/, 'Zip code must be at most 6 digits')
  })

  const formik = useFormik({
    initialValues: studentId ? formData : initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(settingAddressDetails(values))
      handleNext()
      resetForm()
    }
  })

  return (
    <>
      <div className="form-outer">
        <form action="">
          <FormControl
            defaultValue=""
            required
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5559CE'
                },
                '&:hover fieldset': {
                  borderColor: '#5559CE'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5559CE',
                  borderWidth: '2px'
                }
              }
            }}
            size="small"
          >
            <Grid container spacing={gridSpacing} sx={{ padding: '20px 30px ' }}>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address 1"
                  name="address_1"
                  value={formik.values.address_1}
                  onChange={formik.handleChange}
                  error={formik.touched.address_1 && !!formik.errors.address_1}
                  helperText={formik.touched.address_1 && formik.errors.address_1}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address  2"
                  name="address_2"
                  variant="outlined"
                  value={formik.values.address_2}
                  onChange={formik.handleChange}
                  error={formik.touched.address_2 && !!formik.errors.address_2}
                  helperText={formik.touched.address_2 && formik.errors.address_2}
                  fullWidth
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ color: '#5559CE' }}>
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    name="country"
                    value={formik.values.country || 'Default Country'}
                    onChange={(e) => formik.handleChange(e)}
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: '#5559CE' }
                    }}
                  >
                    <MenuItem disabled value={'Default Country'} style={{ color: '#5559CE' }}>
                      Selected Country
                    </MenuItem>
                    {location.map((country) => (
                      <MenuItem key={country.id} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="state-label" style={{ color: '#5559CE' }}>
                    State
                  </InputLabel>
                  <Select
                    labelId="state-label"
                    name="state"
                    label="state"
                    value={formik.values.state || 'Default State'}
                    onChange={formik.handleChange}
                  >
                    <MenuItem disabled value={'Default State'}>
                      Selected State
                    </MenuItem>
                    {formik.values.country &&
                      location
                        .find((country) => country.name === formik.values.country)
                        ?.states.map((state) => (
                          <MenuItem key={state.id} value={state.name}>
                            {state.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="city-label" style={{ color: '#5559CE' }}>
                    City
                  </InputLabel>
                  <Select
                    labelId="city-label"
                    label="city"
                    name="city"
                    value={formik.values.city || 'Default City'}
                    onChange={formik.handleChange}
                  >
                    <MenuItem disabled value={'Default City'}>
                      Selected State
                    </MenuItem>

                    {formik.values.state &&
                      location
                        .find((country) => country.name === formik.values.country)
                        ?.states.find((state) => state.name === formik.values.state)
                        ?.cities.map((city) => (
                          <MenuItem key={city.id} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Zip Code"
                  name="zipcode"
                  variant="outlined"
                  fullWidth
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                  error={formik.touched.zipcode && !!formik.errors.zipcode}
                  helperText={formik.touched.zipcode && formik.errors.zipcode}
                  inputProps={{ maxLength: 6 }}
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                />
              </Grid>
              <Grid container justifyContent="flex-end" sx={{ padding: '20px 30px ' }}>
                <Stack spacing={2} direction="row">
                  <FormStepButtons
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={formik.handleSubmit}
                    handleReset={handleReset}
                  />
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    </>
  )
}

export default AddressInfo
