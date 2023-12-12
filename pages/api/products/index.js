import fetch from "isomorphic-unfetch";

export default async function handler(req, res) {
  const { method, body, headers } = req;
  const { name, date, page } = req.query;
  const token = headers?.authorization;
  const url = process.env.BACK_URL;

  switch (method) {
    case "GET":
      let getUrl = `${url}/products?`;
      if (name) {
        getUrl = `${getUrl}${`name=${name}`}`;
      }
      if (date) {
        getUrl = `${getUrl}${`&date=${date}`}`;
      }
      if (page) {
        getUrl = `${getUrl}${`&page=${page}`}`;
      }
      let response = await fetch(getUrl, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const status = response.status || 200;
      response = await response.json();
      res.status(status).json(response);
      break;

    case "POST":
      try {
        let response = await fetch(`${url}/products`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body,
        });
        const status = response.status || 200;
        response = await response.json();

        res.status(status).json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || error.toString() });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
