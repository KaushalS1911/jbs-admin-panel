import React, { useState } from "react";
import MenuItem from "./MenuItem";
import Person4Icon from "@mui/icons-material/Person4";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";

const Utilities = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuItemClick = (url) => {
    setSelectedItem(url);
  };

  return (
    <div>
      <MenuItem
        title="Dashboard"
        url="dashboard"
        icon={<DashboardIcon />}
        isSelected={selectedItem === "dashboard"}
        onClick={() => handleMenuItemClick("dashboard")}
      />

      <MenuItem
        title="Inquiry"
        url="inquiry"
        icon={<CalendarTodayIcon />}
        isSelected={selectedItem === "inquiry"}
        onClick={() => handleMenuItemClick("inquiry")}
      />

      <MenuItem
        title="Student"
        url="student"
        icon={<Person4Icon />}
        isSelected={selectedItem === "student"}
        onClick={() => handleMenuItemClick("student")}
      />

      <MenuItem
        title="Batches"
        url="batches"
        icon={<ReduceCapacityIcon />}
        isSelected={selectedItem === "batches"}
        onClick={() => handleMenuItemClick("batches")}
      />

      <MenuItem
        title="Employee"
        url="employee"
        icon={<Diversity3Icon />}
        isSelected={selectedItem === "employee"}
        onClick={() => handleMenuItemClick("employee")}
      />

      <MenuItem
        title="Calendar"
        url="calendar"
        icon={<CalendarMonthIcon />}
        isSelected={selectedItem === "calendar"}
        onClick={() => handleMenuItemClick("calendar")}
      />

      <MenuItem
        title="Task"
        url="task"
        icon={<AddTaskIcon />}
        isSelected={selectedItem === "task"}
        onClick={() => handleMenuItemClick("task")}
      />

      <MenuItem
        title="Account"
        url="account"
        icon={<AccountBalanceIcon />}
        isSelected={selectedItem === "account"}
        onClick={() => handleMenuItemClick("account")}
      />

      <MenuItem
        title="Fees"
        url="fees"
        icon={<ReceiptIcon />}
        isSelected={selectedItem === "fees"}
        onClick={() => handleMenuItemClick("fees")}
      />

      <MenuItem
        title="Attendance"
        url="attendance"
        icon={<HowToRegIcon />}
        isSelected={selectedItem === "attendance"}
        onClick={() => handleMenuItemClick("attendance")}
      />

      <MenuItem
        title="Seminar"
        url="seminar"
        icon={<ReviewsIcon />}
        isSelected={selectedItem === "seminar"}
        onClick={() => handleMenuItemClick("seminar")}
      />

      <MenuItem
        title="Expense"
        url="expense"
        icon={<CalendarTodayIcon />}
        isSelected={selectedItem === "expense"}
        onClick={() => handleMenuItemClick("expense")}
      />
    </div>
  );
};

export default Utilities;
