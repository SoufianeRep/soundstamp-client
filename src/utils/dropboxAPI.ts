import { Dropbox, DropboxResponse, team, files } from 'dropbox';


export class DropboxAPI {
  // @ts-ignore
  #accessToken: string;
  // @ts-ignore
  #adminID: string;
  // @ts-ignore
  #dropbox: Dropbox;
  // @ts-ignore
  #adminDropbox: Dropbox;

  constructor() {
    this.#setTeamAdminID();
    this.#accessToken = import.meta.env.VITE_DROPBOX_ACCESS;
    this.#dropbox = new Dropbox({ accessToken: this.#accessToken });
    this.#adminDropbox = new Dropbox({
      accessToken: this.#accessToken,
      selectAdmin: this.#adminID,
      pathRoot: "root",
    });
  }

  // @ts-ignore
  async #setTeamAdminID(): Promise<string> {
    const response = await this.getTeamMembersInfo();
    const teamMembers = response.result.members;
    const admin = teamMembers.filter(tm => tm.role[".tag"] === "team_admin")[0];
    return this.#adminID = admin.profile.account_id;
  }

  getTeamInfo(): Promise<DropboxResponse<team.TeamGetInfoResult>> {
    return this.#dropbox.teamGetInfo();
  }

  getTeamMembersInfo(): Promise<DropboxResponse<team.MembersListResult>> {
    return this.#dropbox.teamMembersList({});
  }

  getTeamNamespaces(): Promise<DropboxResponse<team.TeamNamespacesListResult>> {
    return this.#dropbox.teamNamespacesList({});
  }

  getTeamFoldersList(): Promise<DropboxResponse<team.TeamFolderListResult>> {
    return this.#dropbox.teamTeamFolderList({});
  }

  listFolders(): Promise<DropboxResponse<files.ListFolderResult>> {
    return this.#adminDropbox.filesListFolder({path: ''});
  }
}
