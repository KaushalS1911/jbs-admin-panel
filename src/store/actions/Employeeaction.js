import { searchEmployee } from "store/slices/employeeslice";

export const Employeedata = (searchText,companyId) => {
    return (dispatch) => {
        if (searchText !== "") {
            const delayDebounceFn = setTimeout(() => {
                dispatch(searchEmployee({searchText,companyId}));
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        } else {
            dispatch(searchEmployee({ searchText: "", companyId }));
        }
    };
};

