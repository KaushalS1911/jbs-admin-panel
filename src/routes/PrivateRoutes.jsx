import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import instance from "../helpers/axios";
import Loading from "../ui-component/Loading";
import { profile } from "../atoms/authAtoms";

const PrivateRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useRecoilState(profile);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    instance({
      method: "GET",
      url: "users/me",
    })
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setIsAuth(true);
          setUserRole(response.data.role);
        } else {
          setIsAuth(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setIsLoading(false);
      });

    return () => {
      setIsAuth(false);
      setIsLoading(true);
    };
  }, [setProfileData]);

  return isLoading ? (
    <Loading />
  ) : isAuth ? (
    <Outlet userRole={userRole}/>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
