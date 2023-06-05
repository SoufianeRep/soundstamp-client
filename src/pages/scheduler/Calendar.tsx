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
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect } from 'react';
import Sessions, { SessionData } from '../../api/services/sessions';
import Studios, { StudioData } from '../../api/services/studios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// =========================================
// =============== TYPES ===================
// =========================================

type appointment = {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  studio_id?: number;
};

export default function Calendar() {
  const [appointments, setAppointments] = useState<appointment[]>([]);
  const [addedSession, setAddedSession] = useState({});
  const [sessionChanges, setSessionChanges] = useState({});
  const [studios, setStudios] = useState<StudioData[]>([]);
  const [studioId, setStudioId] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchSessions = async (id: number) => {
    try {
      const response =
        id > 0 ? await Sessions.getByStudio(id) : await Sessions.getAll();

      const { sessions } = response.data.data;
      const formattedSessions = sessions.map((session: SessionData) => ({
        id: session.id,
        title: session.title,
        startDate: new Date(session.startDate),
        endDate: new Date(session.endDate),
      }));

      setAppointments(formattedSessions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudios = async () => {
    try {
      const response = await Studios.getAll();
      setStudios(response.data.data.studios);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudioChange = async (event) => {
    const id = event.target.value;
    setStudioId(id);
    fetchSessions(id);
  };

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
          title,
          startDate: startDate.toJSON(),
          endDate: endDate.toJSON(),
          notes,
          studio_id: studioId,
        };

        const response = await Sessions.createSession(sessionData);
        setAppointments((prevState) => {
          const { id, title, startDate, endDate, notes } =
            response.data.data.session;
          return [
            ...prevState,
            {
              id,
              title,
              startDate,
              endDate,
              notes,
            },
          ];
        });
      } catch (error) {
        setError(error.response.data.data.error);
        setOpen(true);
      }
    }

    if (changed) {
      try {
        const changedId = +Object.keys(changed);
        const response = await Sessions.updateSession(changedId, {
          ...changed[changedId],
        });
        const { id, title, startDate, endDate, notes } =
          response.data.data.session;
        const sessionData = {
          id,
          title,
          startDate,
          endDate,
          notes,
        };
        setAppointments((prevState) => {
          return [
            ...prevState.map((ap) =>
              id === ap.id ? { ...ap, ...sessionData } : ap
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
    fetchSessions(0);
    fetchStudios();
  }, []); // This is dangerous keeps refetching every keystroke

  return (
    <MaterialCssVarsProvider>
      <Box sx={{ height: '82vh' }}>
        <Box
          sx={{
            my: 2,
            display: 'flex',
            justifyContent: 'center',
            alignContent: '',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: 34, fontWeight: 700 }}>
            Scheduler
          </Typography>
          <Box flex={999}></Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Studios
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={studioId || 0}
              onChange={handleStudioChange}
              label="Age"
            >
              <MenuItem key={0} value={0}>
                All Studios
              </MenuItem>
              {studios.map((studio) => (
                <MenuItem key={studio.id} value={studio.id}>
                  {studio.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            <DayView />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AllDayPanel />
            <AppointmentForm readOnly={studioId === 0} />
          </Scheduler>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="error"
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </MaterialCssVarsProvider>
  );
}
