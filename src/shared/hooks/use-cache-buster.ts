import { useEffect } from 'react';
import { version as incomingVersion } from '../../../package.json';

/*
 * Whenever a new build is generated
 * along with it a new package.json["version"] is created
 * this is compared with localStorage version
 * if mismatched, browser cache is deleted and replaced with new cache
 */

export function useCacheBuster() {
  useEffect(() => {
    const oldVersion = localStorage.getItem('version');

    if (!oldVersion) {
      console.info('Cache Buster: No old version, registering new cache anyway');
      deleteOldCacheAndReload();
      return;
    }

    if (oldVersion !== incomingVersion) {
      console.info('Cache Buster: New version found, reloading...');
      deleteOldCacheAndReload();
      return;
    }

    console.info('Cache Buster: No new version, supplying old cache');
  }, []);
}

async function deleteOldCacheAndReload() {
  caches.keys().then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
  // store new cache
  localStorage.setItem('version', incomingVersion);

  window.location.reload();
}
