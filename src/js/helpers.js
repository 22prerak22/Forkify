import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, uploadRecipe = '') => {
  try {
    const fetchPost = uploadRecipe
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadRecipe),
        })
      : fetch(url);
    const req = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
    const data = await req.json();
    if (!req.ok) throw new Error(`${data.message} (${req.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJason = async url => {
//   try {
//     const req = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await req.json();
//     if (!req.ok) throw new Error(`${data.message} (${req.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const postJason = async (url, uploadRecipe) => {
//   try {
//     const fetchPost = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadRecipe),
//     });
//     const req = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
//     const data = await req.json();
//     if (!req.ok) throw new Error(`${data.message} (${req.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
