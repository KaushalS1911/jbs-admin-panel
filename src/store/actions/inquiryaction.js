import { searchInquiry } from '../slices/inquiryslice'

export const inquiyData = (searchText, companyId) => {
    return (dispatch) => {
        if (searchText !== "") {
            const delayDebounceFn = setTimeout(() => {
                dispatch(searchInquiry({ searchText, companyId }));
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        } else {
            dispatch(searchInquiry({ searchText: "", companyId }));
        }
    };
};
