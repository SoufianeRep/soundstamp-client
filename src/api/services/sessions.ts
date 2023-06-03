import client from '../client';

export type SessionData = {
  id?: number;
  title?: string;
  description?: string;
  start_date: Date;
  end_date: string;
  studio_id: number;
}

export default {
  listAll: () => client.get("sessions"),
  createSession: (data: SessionData) => client.post("sessions", {
    title: data.title,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
    studio_id: data.studio_id
  }),
  updateSession: (id: number, data: SessionData) => client.post(`sessions/${id}`, {
    title: data.title,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
  }),
  deleteSession: (id: number | string) => client.delete(`sessions/${id}`)

}
