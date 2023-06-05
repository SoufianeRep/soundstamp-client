import client from '../client';

export type SessionData = {
  id?: number;
  title?: string | any;
  notes?: string;
  startDate: Date;
  endDate: string;
  studio_id: number;
}

export default {
  getAll: () => client.get("sessions"),
  getByStudio: (id: number) => client.get(`sessions/studio/${id}`),
  createSession: (data: SessionData) => client.post("sessions", {
    title: data.title,
    notes: data.notes,
    startDate: data.startDate,
    endDate: data.endDate,
    studio_id: data.studio_id
  }),
  updateSession: (id: number, data: SessionData) => client.post(`sessions/${id}`, {
    title: data.title,
    notes: data.notes,
    startDate: data.startDate,
    endDate: data.endDate,
  }),
  deleteSession: (id: number | string) => client.delete(`sessions/${id}`)

}
