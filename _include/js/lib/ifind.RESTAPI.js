// Perform rest request
jQuery(function($){
  $.RESTAPI = function(restAPI) {
    restAPI.Query = function(url, jsonObj, successFunc, errorFunc, beforeFunc, completeFunc) {
      $.ajax({
        url: url,
        timeout: 600000,
        type: 'POST',
        data: JSON.stringify(jsonObj),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: successFunc,
        error: errorFunc,
        beforeSend: beforeFunc,
        complete: completeFunc
      });
    };

    restAPI.DominantEntitiesInSources = function(url, tableName, indexName, fields, search, top, whereClause, successFunc, errorFunc, beforeFunc, completeFunc) {
      var jsonObj = {
        method: 'DominantEntitiesInSources',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: search, quote: 'true'},
          { value: top, quote: 'false'},
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc, beforeFunc, completeFunc);
    };

    restAPI.SimilarSources = function(url, tableName, indexName, fields, recid, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'SimilarSources',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: recid, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    restAPI.DominantEntities = function(url, tableName, indexName, fields, top, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'DominantEntities',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: top, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    restAPI.ProximityProfile = function(url, tableName, indexName, fields, entid, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'ProximityProfile',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: entid, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    restAPI.PathsForEntity = function(url, tableName, indexName, fields, entid, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'PathsForEntity',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: entid, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    restAPI.PathsForEntityText = function(url, tableName, indexName, fields, entid, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'PathsForEntityText',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: entid, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    restAPI.PathSimilarSources = function(url, tableName, indexName, fields, recid, pathid, percent, whereClause, successFunc, errorFunc) {
      var jsonObj = {
        method: 'PathSimilarSources',
        table: tableName,
        index: indexName,
        fields: fields,
        args: [
          { value: recid, quote: 'false' },
          { value: pathid, quote: 'false' },
          { value: percent, quote: 'false' }
        ],
        where: whereClause
      };

      $.RESTAPI.Query(url, jsonObj, successFunc, errorFunc);
    };

    return restAPI;
  }({});
});