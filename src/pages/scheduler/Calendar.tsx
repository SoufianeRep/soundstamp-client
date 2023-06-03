import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  // THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {
  EditingState,
  ViewState,
  ChangeSet,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  DayView,
  WeekView,
  Appointments,
  TodayButton,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect } from 'react';
import Sessions, { SessionData } from '../../api/services/sessions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

// =========================================
// =============== TYPES ===================
// =========================================

type appointment = {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
};

export default function Calendar() {
  const [appointments, setAppointments] = useState<appointment[]>([]);
  const [addedSession, setAddedSession] = useState({});
  const [sessionChanges, setSessionChanges] = useState({});

  const changeAddedSession = (session: Object) => {
    setAddedSession(session);
  };

  const changeSessionChanges = (session: object) => {
    setSessionChanges(session);
  };

  // const changeEditingSession = (session: object) => {
  //   console.log('on Edit change', session);
  //   setEditingSession(session);
  // };

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      try {
        const { title, startDate, endDate, notes } = added;
        const sessionData: SessionData = {
          title: title,
          start_date: startDate.toJSON(),
          end_date: endDate.toJSON(),
          description: notes,
          studio_id: 1,
        };

        const response = await Sessions.createSession(sessionData);
        setAppointments((prevState) => {
          const { id, title, start_date, end_date, description } =
            response.data.data.session;
          return [
            ...prevState,
            {
              id,
              title,
              startDate: start_date,
              endDate: end_date,
              description,
            },
          ];
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (changed) {
      try {
        const id = +Object.keys(changed);
        const response = await Sessions.updateSession(id, changed[id]);
        const changedId = response.data.data.session.id;
        setAppointments((prevState) => {
          return [
            ...prevState.map((ap) =>
              changedId === ap.id ? { ...ap, ...changed[id] } : ap
            ),
          ];
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (deleted != undefined) {
      try {
        await Sessions.deleteSession(deleted);
        setAppointments([...appointments.filter((ap) => ap.id != deleted)]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Sessions.listAll();

        const { sessions } = response.data.data;
        const formattedSessions = sessions.map((session: SessionData) => ({
          id: session.id,
          title: session.title,
          startDate: new Date(session.start_date),
          endDate: new Date(session.end_date),
        }));

        setAppointments(formattedSessions);
      } catch (error) {
        console.log(error);
      }
    };

    if (appointments.length === 0) {
      fetchAppointments();
    }
  }, []); // This is dangerous keeps refetching every keystroke

  return (
    <MaterialCssVarsProvider>
      <Box sx={{ height: '82vh' }}>
        <Box sx={{ my: 2, display: 'flex' }}>
          <Typography variant="h1" sx={{ fontSize: 34, fontWeight: 700 }}>
            Scheduler
          </Typography>
          <Box flex={999}></Box>
        </Box>
        <Paper elevation={1} sx={{ mt: 2, height: '100%' }}>
          {/* <CssBaseline /> */}
          <Scheduler data={appointments}>
            <ViewState defaultCurrentDate={new Date()} />
            <EditingState
              addedAppointment={addedSession}
              onAddedAppointmentChange={changeAddedSession}
              appointmentChanges={sessionChanges}
              onAppointmentChangesChange={changeSessionChanges}
              // editingAppointment={editingSession}
              // onEditingAppointmentChange={changeEditingSession}
              onCommitChanges={commitChanges}
            />
            <IntegratedEditing />
            <MonthView />
            <WeekView />
            <DayView startDayHour={8} endDayHour={20} />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </Box>
    </MaterialCssVarsProvider>
  );
}
