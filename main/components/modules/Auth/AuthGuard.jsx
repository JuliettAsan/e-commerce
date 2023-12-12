import session from "@session";

/*Componente que permite mostrar a los usuarios autenticados las vistas protegidas de la aplicación.
  verifica si el usuario está autenticado y almacena en el local storage atributos del usuario como:
  email, picture, role y token. En caso el usuario no esté autenticado lo rediriga a la página de inicio"
*/

export function AuthGuard({ children }) {
  const { user } = session();
  if (user) {
    const { userDataKey } = user;
    const userIndex = userDataKey.lastIndexOf(".");
    const userKey = userDataKey.slice(0, userIndex);
    const userAtrr = {
      email: user.attributes.email,
      picture: user.attributes.picture,
      role: user.attributes["custom:role"],
      token: user.storage[`${userKey}.idToken`],
    };
    localStorage.setItem("user", JSON.stringify(userAtrr));
    return <>{children}</>;
  }

  return null;
}
