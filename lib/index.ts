import Api from './Api';
import * as URL from 'url';
import AWS, { Endpoint } from 'aws-sdk';
import * as V4Signer from 'aws-sdk/lib/signers/v4';
import * as Util from 'aws-sdk/lib/util';

interface PostBodyGraphQL {
  query: string,
  operationName: string,
  variables: object
};

export class AppSync extends Api {
  apiUrl: string;
  region: string;

  constructor(apiUrl: string, region: string) {
    super({ baseURL: apiUrl });
    this.apiUrl = apiUrl;
    this.region = region;
  }

  public query(post_body: PostBodyGraphQL) {
    const uri = URL.parse(this.apiUrl);
    const httpRequest = new AWS.HttpRequest(new Endpoint(uri.href), this.region);
    httpRequest.headers.host = uri.host || this.apiUrl;
    httpRequest.headers['Content-Type'] = 'application/json';
    httpRequest.method = 'POST';
    httpRequest.body = JSON.stringify(post_body);

    let signer = new V4Signer(httpRequest, 'appsync', true);
    signer.addAuthorization(AWS.config.credentials, Util.date.getDate());

    return this.request({
      method: 'POST',
      url: uri.href,
      data: httpRequest.body,
      headers: httpRequest.headers
    });
  }
}


