import React from 'react';
import { DropboxAPI } from '../utils/dropboxAPI';

export default function Calendar() {
  const dbx = new DropboxAPI();
  async function test() {
    try {
      const response = await dbx.listFolders();
      console.log(response.result);
    } catch(error) {
      console.log('error', error["error"])
    }
  }

  test();
  return <h1>Calendar</h1>;
}
