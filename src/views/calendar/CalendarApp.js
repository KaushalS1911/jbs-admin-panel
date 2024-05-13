import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import { styled } from "@mui/material/styles";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventDialog from "./AddEventDialog";
import axios from "axios";
import { useGetEvents } from "../../hooks/useGetEvents";
import DeleteEventDialog from "./DeleteEventDialog";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { useGetAllStudents } from "hooks/useGetAllStudents";

const Root = styled("div")(({ theme }) => ({
  "& a": {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: "none!important",
  },
  "&  .fc-media-screen": {
    minHeight: "100%",
  },
  "& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th": {
    borderColor: `${theme.palette.divider}!important`,
  },
  "&  .fc-scrollgrid-section > td": {
    border: 0,
  },
  "& .fc-daygrid-day": {
    "&:last-child": {
      borderRight: 0,
    },
  },
  "& .fc-col-header-cell": {
    borderWidth: "0 0 1px 0",
    padding: "16px 0",
    "& .fc-col-header-cell-cushion": {
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  },
  "& .fc-view ": {
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    "& > .fc-scrollgrid": {
      border: 0,
    },
  },
  "& .fc-daygrid-day-number": {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  "& .fc-event": {
    //   backgroundColor: `${theme.palette.primary.dark}!important`,
    color: `${theme.palette.primary.contrastText}!important`,
    border: 0,
    // padding: '0 6px',
    //   borderRadius: '16px!important',
  },
}));

function CalendarApp() {
  const [open, setOpen] = useState(false);
  const { data: events, refetch } = useGetEvents();

  const calendarRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDeleteEventDialog, setOpenDeleteEventDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [action, setAction] = useState(null);
  const selectAllow = (rangeInfo) => {
    const selectedDate = rangeInfo.startStr;

    if (events && Array.isArray(events)) {
      const disabledDates = events.map((el) => el.startDate);
      return !disabledDates.includes(selectedDate);
    }

    return true;
  };

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    refetch();
  }, []);

  const [options, setOptions] = useState();
  const [selectedStudents, setSelectedStudents] = useState();
  const { data: students } = useGetAllStudents();
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (students && students.length !== 0) {
      const refactoredStudentList = students.students.map((item) => {
        return {
          student_user_id: item._id,
          firstName: item.personal_info.firstName,
          lastName: item.personal_info.lastName,
        };
      });

      setOptions(refactoredStudentList);
    }
  }, [students]);

  let event_user_id;
  const user = useRecoilValue(profile);
  async function handleAddEvent(values) {
    const studentIds = selectedStudents
      .map((s) => String(s.student_user_id))
      .toString();
    if (user.role === "Admin") {
      event_user_id = studentIds;
    } else {
      event_user_id = user._id;
    }

    const payload = {
      event: values.event,
      startDate: values.startDate,
      endDate: values.endDate,
      event_user_id: event_user_id,
      leave_type: values.eventType,
      leave_description: values.eventDescription,
    };
    if (user.role !== "Admin") {
      payload.leave_status = "Pending";
    } else {
      payload.leave_status = "office";
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}${user.company_id}/event`,
        payload
      );
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      handleClose();
    }
  }

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}${user.company_id}/${selectedEvent}/deleteEvent`
      );
      refetch();
      handleCloseDeleteEventDialog();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCloseDeleteEventDialog = () => {
    setOpenDeleteEventDialog(false);
    setSelectedEvent(null);
    setEdit(false);
    setAction(null);
  };

  function handleDateSelect() {
    setOpen(true);
  }

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo?.event?._def?.publicId);
    setOpenDeleteEventDialog(true);
  };

  const getEventStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "rgb(221,221,222)",
          color: "#26222A",
        };
      case "Approved":
        return {
          backgroundColor: "rgb(220,248,241)",
          color: "#2DCB73",
        };
      case "Denied":
        return {
          backgroundColor: "rgb(254,237,232)",
          color: "#FE8F8E",
        };
      default:
        return {
          backgroundColor: "#EDE7F6",
          color: "#5559CE",
        };
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Calendar"} />
      <MainCard
        secondary={
          <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        }
      >
        <Root className="flex flex-col flex-auto relative">
          <div className="flex flex-1 p-24 container">
            <motion.div
              className="w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            >
              <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable
                selectable
                selectAllow={selectAllow}
                selectMirror
                dayMaxEvents
                weekends
                select={handleDateSelect}
                events={
                  events
                    ? events.map((event) => ({
                        ...event,
                        color: getEventStyle(event.leave_status),
                      }))
                    : []
                }
                eventClick={handleEventClick}
                initialDate={new Date()}
                ref={calendarRef}
                eventContent={(eventInfo) => {
                  const eventStyle = getEventStyle(
                    eventInfo.event.extendedProps.leave_status
                  );
                  return (
                    <div
                      style={{
                        backgroundColor: eventStyle.backgroundColor,
                        color: eventStyle.color,
                        borderRadius: "5px",
                        paddingLeft: "5px",
                        padding: "3px",
                        fontWeight: "900",
                        fontSize: "13px",
                      }}
                    >
                      {eventInfo.event.extendedProps.name} on{" "}
                      {eventInfo.event._def.title}
                    </div>
                  );
                }}
              />
            </motion.div>
          </div>
        </Root>
        <AddEventDialog
          open={open}
          handleClose={handleClose}
          handleAddEvent={handleAddEvent}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
        />
        <DeleteEventDialog
          open={openDeleteEventDialog}
          handleClose={handleCloseDeleteEventDialog}
          handleDelete={handleDeleteEvent}
          selectedEvent={selectedEvent}
          events={events}
          setAction={setAction}
          refetch={refetch}
          action={action}
          setEdit={setEdit}
          edit={edit}
        />
      </MainCard>
    </>
  );
}

export default CalendarApp;
