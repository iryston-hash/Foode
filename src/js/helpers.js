import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url)
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} || RESPONSE STATUS -> ${res.status}`);
    return data;
  } catch (error) {
    //rethrowing the error to the module.js file
    throw error;
  }
};

// POST USER RECIPE
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // payload , the data we want to send
      body: JSON.stringify(uploadData)
    })

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};