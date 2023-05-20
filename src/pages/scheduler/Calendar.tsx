import Sheet from '@mui/joy/Sheet';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2023-11-01';
const schedulerData = [
  {
    startDate: '2023-11-01T09:45',
    endDate: '2023-11-01T11:00',
    title: 'Meeting',
  },
  {
    startDate: '2023-11-01T12:00',
    endDate: '2023-11-01T13:30',
    title: 'Go to a gym',
  },
];

export default function Calendar() {
  return (
    <Sheet>
      <Scheduler data={schedulerData}>
        <ViewState currentDate={currentDate} />
        <WeekView />
        <Appointments />
      </Scheduler>
    </Sheet>
  );
}
