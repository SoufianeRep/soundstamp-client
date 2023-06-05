import client from '../client'

export type StudioData = {
  id: number;
  name: string;
  location?: string;
}

export default {
  getAll: () => client.get("studios"),
  getById: (id: number) => client.get(`stuidos/${id}`)
}
