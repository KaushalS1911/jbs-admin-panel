import {Button, Grid} from "@mui/material";
import {RestoreFromTrashTwoTone} from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ActionButtons = ({ user, navigate, deleteAllStudents }) => (
    <>
        {user.role !== "Student" && (
            <Grid sx={{ marginLeft: "4px" }}>
                <Button
                    variant="outlined"
                    sx={{
                        color: "#5e35b1",
                        border: "none",
                        lineHeight: "35px",
                        height: "35px",
                        backgroundColor: "#D9DAF9",
                        margin: "0 10px",
                        "&.Mui-disabled": {
                            backgroundColor: "#e1e1e1",
                            color: "#5e35b1",
                            opacity: 0.2,
                        },
                    }}
                    onClick={() => navigate(`/company/${user.company_id}/add-student`)}
                    startIcon={<AddCircleOutlineIcon sx={{ fontSize: "22px", marginRight: "3px", color: "#5e35b1" }} />}
                >
                    Add
                </Button>
                <Button
                    startIcon={<RestoreFromTrashTwoTone sx={{ fontSize: "22px", marginRight: "3px", color: "#ede7f6" }} />}
                    sx={{
                        backgroundColor: "#5559CE",
                        color: "#fff",
                        marginRight: "10px",
                        height: "35px",
                        lineHeight: "35px",
                        "&:hover": { color: "#5559CE", backgroundColor: "#5559CE" },
                    }}
                    onClick={deleteAllStudents}
                >
                    Delete
                </Button>
            </Grid>
        )}
    </>
);

export default ActionButtons