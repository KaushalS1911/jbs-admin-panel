import React from 'react'
import * as Yup from 'yup'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import location from '../../../Countrystatecity.json'
import instance from '../../../helpers/axios'
import { gridSpacing } from 'store/constant'
import { useParams } from 'react-router-dom'
import { notification } from 'antd'

const validationSchema = Yup.object({
  address_1: Yup.string().required('Address  1 is required'),
  address_2: Yup.string().required('Address  2 is required'),
  zipcode: Yup.string()
    .required('Zip code is required')
    .matches(/^\d{1,6}$/, 'Zip code must be at most 6 digits')
})

const AddressInfo = ({ formData ,studentData, refetch}) => {

   //notification
   const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { studentId, companyId } = useParams()

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleUpdateStudent(values)
    }
  })

  async function handleUpdateStudent(values) {
    const payload = {
      ...studentData,
      address_info: {
        ...studentData.address_info,
        address_1: values.address_1 || '',
        address_2: values.address_2 || '',
        city: values.city || '',
        state: values.state || '',
        country: values.country || '',
        zipcode: values.zipcode || ''
      }
    }
    await instance({
      method: 'PUT',
      url: `company/${companyId}/${studentId}/updateStudent`,
      data: payload
    })
      .then((response) => {
        openNotificationWithIcon("success", response.data.data.message);
        refetch()
      })
      .catch((error) => {
     
      openNotificationWithIcon("error", error.response.data.message);

      })
  }

  return (
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
                value={formik.values?.address_1}
                onChange={formik.handleChange}
                error={formik.touched.address_1 && !!formik.errors.address_1}
                helperText={formik.touched.address_1 && formik.errors.address_1}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  style: { color: '#5559CE' },
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Address  2"
                name="address_2"
                variant="outlined"
                value={formik.values?.address_2}
                onChange={formik.handleChange}
                error={formik.touched.address_2 && !!formik.errors.address_2}
                helperText={formik.touched.address_2 && formik.errors.address_2}
                fullWidth
                InputLabelProps={{
                  style: { color: '#5559CE' },
                  shrink: true
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
                  value={formik.values?.country || 'Default Country'}
                  onChange={(e) => formik.handleChange(e)}
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: '#5559CE' },
                    shrink: true
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
                  value={formik.values?.state || 'Default State'}
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
                  value={formik.values?.city || 'Default City'}
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
                value={formik.values?.zipcode}
                onChange={formik.handleChange}
                error={formik.touched.zipcode && !!formik.errors.zipcode}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
                inputProps={{ maxLength: 6 }}
                InputLabelProps={{
                  style: { color: '#5559CE' },
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
          <Grid
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            sx={{
              margin: { xs: '10px 0' }
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                type="submit"
                onClick={formik.handleSubmit}
                sx={{
                  backgroundColor: '#5559CE',
                  color: '#fff',
                  marginRight: '10px',
                  height: '35px',
                  lineHeight: '35px',
                  '&:hover': { Color: '#5559CE', backgroundColor: '#5559CE' }
                }}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </FormControl>
      </form>
    </div>
  )
}

export default AddressInfo
