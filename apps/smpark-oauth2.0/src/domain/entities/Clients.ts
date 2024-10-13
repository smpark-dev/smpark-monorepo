class Clients {
  constructor(
    public id: string,
    public client_id: string,
    public application_name: string,
    public redirect_uri: string,
    public address_uri: string,
    public clientAllowedScopes?: { id: boolean; email: boolean; name: boolean },
    public grant_type?: 'authorization_code' | 'refresh_token',
    public api_key?: string,
    public manager_list?: string[],
  ) {
    this.id = id;
    this.client_id = client_id;
    this.application_name = application_name;
    this.redirect_uri = redirect_uri;
    this.address_uri = address_uri;
    this.clientAllowedScopes = clientAllowedScopes;
    this.grant_type = grant_type;
    this.api_key = api_key;
    this.manager_list = manager_list;
  }
}

export default Clients;
