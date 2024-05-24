import { useState, useCallback } from "react";
import MainCard from "ui-component/cards/MainCard";
import { FormControl, Grid } from "@mui/material";
import StudentList from "./utils/StudentList";
import "flatpickr/dist/themes/material_green.css";
import { gridSpacing } from "store/constant";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import axios from "axios";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import useNotification from "../../hooks/useNotification";
import ActionButtons from "../../Extracomponent/ActionButtons";
import SearchBar from "../../Extracomponent/SearchBar";

function Index() {
    const navigate = useNavigate();
    const user = useRecoilValue(profile);
    const { refetch } = useGetAllStudents();
    const openNotificationWithIcon = useNotification();

    const [selectedRows, setSelectedRows] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSelectRow = useCallback((rows) => {
        setSelectedRows(rows);
    }, []);

    const deleteAllStudents = useCallback(async () => {
        if (selectedRows.length > 0) {
            try {
                const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/delete/all-students`;
                const response = await axios.delete(apiEndpoint, {
                    data: { ids: selectedRows },
                });
                openNotificationWithIcon("success", response.data.data.message);
                refetch();
            } catch (error) {
                console.error("Error deleting students:", error);
            }
        }
    }, [selectedRows, user, openNotificationWithIcon, refetch]);

    return (
        <>
            <Mainbreadcrumbs title={"Student"} />
            <MainCard>
                <FormControl
                    sx={{
                        m: 1,
                        p: 0,
                        minWidth: 120,
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#5559CE" },
                            "&:hover fieldset": { borderColor: "#5559CE" },
                            "&.Mui-focused fieldset": { borderColor: "#5559CE", borderWidth: "2px" },
                        },
                        size: "small",
                    }}
                >
                    <Grid container spacing={gridSpacing} justifyContent="space-between" alignItems="center">
                        <Grid item lg={4} md={12} xs={12} sm={12}>
                            <SearchBar searchText={searchText} setSearchText={setSearchText} />
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            justifyContent={{ xs: "normal", sm: "space-between", md: "space-between", lg: "flex-end" }}
                            flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
                            alignItems="center"
                            lg={8}
                            md={12}
                            xs={12}
                            sm={12}
                        >
                            <ActionButtons user={user} navigate={navigate} deleteAllStudents={deleteAllStudents} />
                        </Grid>
                    </Grid>
                </FormControl>
            </MainCard>
            <MainCard sx={{ margin: "20px 0" }}>
                <StudentList onSelectRow={handleSelectRow} searchText={searchText} />
            </MainCard>
        </>
    );
}

export default Index;
