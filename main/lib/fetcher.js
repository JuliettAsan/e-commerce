export async function fetcher(url, method, body) {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const res = await fetch(url, {
    headers: {
      Authorization: token,
    },
    method,
    body,
  });

  if (!res.ok) {
    return {
      error: true,
      status: res.status,
    };
  }

  return res.json();
}
