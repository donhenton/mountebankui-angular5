import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/Rx'; for all
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';


@Injectable()
export class MountebankService {

  constructor(private httpService: Http) { }


  /**
    * delete content from mountebank server at the given port
    * @param {type} port
    * @param {type} url
    * @returns {unresolved}
    */
  deleteFromMountebank(url, port) {
    url = url.trim();
    const requestUrl = url + '/imposters/' + port;
    const options = { method: 'DELETE' };
    return this.httpService.delete(requestUrl);
  }


  /**
   * will call the mountebank server at url
   * @param {type} url mountebank url
   * @param {type} body the json to send
   * @returns {unresolved} a promise which will return
   * the WHOLE response
   */
  postToMountebank(url, body) {
    url = url.trim();
    const requestUrl = url + '/imposters';
    return this.httpService.post(requestUrl, body);

  }

  /**
     * process an array of header variables and return the total
     * @param {type} headerArray
     * @returns {unresolved}
     */
  private processHeaders(headerArray) {
    const headerVar = {};
    if (headerArray === null || headerArray.length === 0) {
      return null;
    }
    headerArray.forEach(function (header, idx) {
      const key = header.key;
      if (key !== null && key.trim().length > 0) {
        headerVar[header.key] = header.value;
      }

    });

    return headerVar;
  }

  private isInteger(x) {
    let y;
    try {
      y = parseInt(x, 10);
    } catch (e) {
      return false;
    }
    return (typeof y === 'number') && (y % 1 === 0);
  }


  /**
   * take the current imposter data and produce a mountebank payload
   * @param {type} data
   * @param format true if you want formatted output
   * @returns {mountebankService.exports} the mountebank json as a string
   */
  translate(data, format: boolean = false) {

    const translated: any = {};
    translated.port = data.port;
    translated.protocol = 'http';
    translated.stubs = [];
    const me = this;

    if (data.useCORs) {

      translated.stubs.push(me.createOptionsStub(data));
    }


    data.imposters.forEach(function (imposter, idx) {


      const newStub = { 'responses': [], 'predicates': [] };
      translated.stubs.push(newStub);

      imposter.responses.forEach(function (response, indexValue) {
        if (response.injection.use) {

          newStub.responses.push({ 'inject': response.injection.body });
        } else {
          const headerVar = me.processHeaders(response.headers);


          const isResponse = {};
          if (headerVar !== null) {
            isResponse['headers'] = headerVar;
          }

          if (data.useCORs) {
            if (!isResponse['headers']) {
              isResponse['headers'] = {};
            }
            isResponse['headers']['Access-Control-Allow-Origin'] = data.CORsOrigin;
          }


          if (me.isInteger(response.status)) {
            isResponse['statusCode'] = response.status;
          }
          if (response.body.trim().length > 1) {
            isResponse['body'] = response.body;
          }
          const newResponse = {
            'is': isResponse
          };
          newStub.responses.push(newResponse);

          //// decorate ///////////////////////////////
          if (!response.decorate) {
            response.decorate = '';
          }
          if (response.decorate.trim().length > 1) {
            newResponse['_behaviors'] = { 'decorate': response.decorate };
          }



          //// decorate ///////////////////////////////

        }// end if not using injection for response
      });

      // predicates
      if (imposter.match.injection.use) {
        newStub.predicates.push({ 'inject': imposter.match.injection.body });

      } else {
        newStub.predicates.push({ 'and': [] });
        const mainAnd = newStub.predicates[0].and;
        // method
        const methodPredicate = {
          'equals': {
            'method': imposter.match.verb
          }
        };
        mainAnd.push(methodPredicate);
        // path
        const pathPredicate = me.createPredicate('path', imposter.match.path_match);
        if (pathPredicate !== null) {
          mainAnd.push(pathPredicate);
        }

        // body
        const bodyPredicate = me.createPredicate('body', imposter.match.body_match);
        if (bodyPredicate !== null) {
          mainAnd.push(bodyPredicate);
        }
        // headers
        const headerVar = me.processHeaders(imposter.match.headers);

        if (headerVar !== null) {
          const headerMatch = {};
          headerMatch['headers'] = headerVar;
          mainAnd.push({ 'equals': headerMatch });
        }
        // imposter.match.query_params=[];
        if (imposter.match.query_params.length > 0) {
          // query params
          const queryVar = { 'query': {} };
          const deepEqualsVar = { 'deepEquals': queryVar };
          mainAnd.push(deepEqualsVar);


          imposter.match.query_params.forEach(function (parm) {
            const key = parm.key;
            if (key !== null && key.trim().length > 0) {
              queryVar.query[parm.key] = parm.value;
            }

          });

        }
      }// end if no injection for predicates

    });

    if (format === true) {
      return JSON.stringify(translated, null, '  ');
    }

    return JSON.stringify(translated);
  }



  /**
    * create predicates for body and path
    * @param {type} predicateType eg path or body
    * @param {type} matchInfo
    * @returns {undefined}
    */
  private createPredicate(predicateType, matchInfo) {
    let type = matchInfo.type;
    let negate = false;
    if (type.indexOf('not') === 0) {
      type = type.slice(3).trim();
      negate = true;
    }
    let value = null;
    let predicate = {};
    const tempPredicate = {};
    if (predicateType === 'path') {
      value = matchInfo.value;

    } else {
      value = matchInfo.body;

    }
    if (!value) {
      value = null;
    }

    if (value === null || value.trim().length === 0) {
      return null;
    }

    tempPredicate[type] = {};
    tempPredicate[type][predicateType] = value;
    if (negate) {
      predicate['not'] = tempPredicate;
    } else {
      predicate = tempPredicate;
    }


    return predicate;

  }



  //////////// CORS //////////////////////////////////////////////

  private createOptionsStub(data) {

    const optionStub = {
      'responses': [
        {
          'is': {
            'headers': {
              'Access-Control-Allow-Headers': 'Content-Type,x-request-sample',
              'Access-Control-Allow-Origin': 'you-didn\'t specifiy a CORsOrigin ',
              'Access-Control-Allow-Credentials': 'true',
              'Allow': 'GET,POST,DELETE,PUT,PATCH',
              'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,PATCH'
            },
            'statusCode': 200
          }
        }
      ],
      'predicates': [
        {
          'and': [
            {
              'equals': {
                'method': 'OPTIONS'
              }
            }
          ]
        }
      ]
    };

    const optionStubCopy = JSON.parse(JSON.stringify(optionStub));
    optionStubCopy.responses[0].is.headers['Access-Control-Allow-Origin']
      = data.CORsOrigin;
    optionStubCopy.responses[0].is.headers['Access-Control-Allow-Headers']
      = data.allowedCORsHeaders;
    optionStubCopy.responses[0].is.headers['Access-Control-Allow-Methods']
      = data.allowedCORsMethods;
    optionStubCopy.responses[0].is.headers['Allow']
      = data.allowedCORsMethods;
    return optionStubCopy;

  }



}
