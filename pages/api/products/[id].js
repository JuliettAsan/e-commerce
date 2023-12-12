import fetch from "isomorphic-unfetch";

export default async function handler(req, res) {
  const { method, body, headers } = req;
  const { id } = req.query;
  const token = headers?.authorization;
  const url = process.env.BACK_URL;

  switch (method) {
    case "GET":
      let response = await fetch(`${url}/products/${id}`, {
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

    case "PUT":
      try {
        let response = await fetch(`${url}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body,
        });
        const status = response.status || 200;
        response = await response.json();

        res.status(status).json(response);
      } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: error.message || error.toString() });
      }
      break;
    case "DELETE":
      try {
        let response = await fetch(`${url}/products/${id}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          method: "DELETE",
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
