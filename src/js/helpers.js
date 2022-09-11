import { TIMEOUT_SECONDS} from './config.js'
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} || RESPONSE STATUS -> ${res.status}`);
    return data;
  } catch (error) {
    //rethrowing the error to the module.js file
    throw error;
  }
};
