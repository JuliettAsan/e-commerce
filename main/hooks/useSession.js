/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "@configAWS";

export default function session() {
  const [user, setUserState] = useState(null);
  const [role, setRoleState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      /* Verifica si el usuario está logeado */
      const user = await Auth.currentAuthenticatedUser();
      const role = user.attributes["custom:role"];
      setUserState(user);
      setRoleState(role);
    } catch (error) {
      /*Si el usuario no se encuentrá logeado lo redirige a la página de inicio */
      console.log(error);
      router.push("/");
      setUserState(null);
    }
  }
  return { user, role, setUserState };
}
