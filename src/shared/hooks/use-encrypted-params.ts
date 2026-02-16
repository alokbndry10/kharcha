import { useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
const searchKey = 'q';

/* types */

type ObjectType = Record<PropertyKey, string | number>;
type ReturnType = [Map<string, string>, VoidFunction, (filter: ObjectType) => string];

/* utilities */

export function encryptUrl(decryptedParams: string) {
  try {
    return btoa(decryptedParams);
  } catch {
    console.error('Something went wrong parsing the url');
    return '';
  }
}

function objToEncryptedParams(filterObj: ObjectType) {
  let tempStr = '';
  const objLength = Object.keys(filterObj).length;
  // convert object to filter string url
  Object.keys(filterObj).map((key, i) => {
    const value = filterObj[key];
    const lastItem = i === objLength - 1;
    // remove empty values
    if (value) {
      tempStr = tempStr + key + '=' + value + (lastItem ? '' : '&');
    }
  });

  const encryptedUrl = encryptUrl(tempStr);

  return encryptedUrl;
}

function setObjToEncryptedParams(filterObj: ObjectType) {
  return searchKey + '=' + objToEncryptedParams(filterObj);
}

/* main hook */

export function useEncryptedParams(): ReturnType {
  const filterMap = new Map();
  // for conversations
  const { channelId = '', clientId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const query = params.get(searchKey) ?? '';

  const decryptUrl = useCallback(
    function (encryptedParams: string) {
      try {
        return atob(encryptedParams);
      } catch {
        console.error('Something went wrong parsing the url');
        params.delete(searchKey);
        setParams(params);
        return '';
      }
    },
    [query, channelId, clientId]
  );

  const getDecodedFilterParams = useCallback(
    function () {
      const decryptedUrl = decryptUrl(query);
      const filterKeyValues: string[] = decryptedUrl.split('&');

      // set filter string to map data structure
      filterKeyValues.map((filter) => {
        const [key, value = ''] = filter.split('=');

        if (key && value) {
          filterMap.set(key, value);
        }
      });

      return filterMap;
    },
    [query, channelId, clientId]
  );

  const setEncryptedParams = useCallback(
    function () {
      const filterObj = Object.fromEntries(filterMap);
      const encryptedUrl = objToEncryptedParams(filterObj);

      if (encryptedUrl) {
        params.set(searchKey, encryptedUrl);
      } else {
        // remove query if no filters
        params.delete(searchKey);
      }

      setParams(params);
    },
    [query, channelId, clientId]
  );

  return [getDecodedFilterParams(), setEncryptedParams, setObjToEncryptedParams];
}
