import { Divider, Grid, Typography } from "@mui/material";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import { useState } from "react";
import AuthInvite from "../auth-forms/AuthInvite";

// ================================|| AUTH3 - LOGIN ||================================ //

const Invite = () => {
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
                    <AuthInvite setIsLoading={setIsLoading} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
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

export default Invite;
