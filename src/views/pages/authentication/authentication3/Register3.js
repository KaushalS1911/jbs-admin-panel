import { Divider, Grid, Typography } from "@mui/material";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import { useState } from "react";
import AuthRegister from "../auth-forms/AuthRegister";
import { Link } from "react-router-dom";

// ================================|| AUTH3 - LOGIN ||================================ //

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <AuthWrapper1 className="backdropimg">
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper className="backdrop-content">
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <AuthRegister setIsLoading={setIsLoading} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: "center", fontSize: "16px" }}>
                      Already have an account?
                      <Link
                        to="/login"
                        style={{
                          textDecoration: "underline!important",
                          padding: "0 4px",
                          color:'#5559CE',
                          fontWeight:'600'
                        }}
                      >
                        Sign in
                      </Link>
                      here
                    </Typography>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
