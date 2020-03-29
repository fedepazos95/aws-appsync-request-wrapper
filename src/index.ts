import Api from './Api';
import * as URL from 'url';
import * as AWS from 'aws-sdk';
import { Endpoint } from 'aws-sdk';
import * as V4Signer from 'aws-sdk/lib/signers/v4';
import * as Util from 'aws-sdk/lib/util';

interface PostBodyGraphQL {
  /**
  * GraphQL query object.
  */
  query: string,
  /**
   * Only required if multiple operations are present in the query.
   */
  operationName: string,
  /**
   * Variables of the query.
   */
  variables: object
};

export class AppSync extends Api {
  apiUrl: string;
  region: string;

  /**
   * Creates a wrapper to make signed requests to AppSync
   * @param apiUrl URL of the AppSync instance
   * @param region AWS Region
   */
  constructor(apiUrl: string, region: string) {
    super({ baseURL: apiUrl });
    this.apiUrl = apiUrl;
    this.region = region;
  }

  /**
   * 
   * @param post_body PostBodyGraphQL interface
   */
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


