import {TextField} from "@mui/material";

const SearchBar = ({ searchText, setSearchText }) => (
    <TextField
        label="Search"
        fullWidth
        size="small"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputLabelProps={{ style: { color: "#5559CE", marginBottom: "0" } }}
        sx={{ width: "100%", minWidth: "220px", margin: "auto" }}
    />
);

export default SearchBar