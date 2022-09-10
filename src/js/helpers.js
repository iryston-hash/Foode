export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} || RESPONSE STATUS -> ${res.status}`);
    return data;
  } catch (error) {
    alert(error);
  }
};
