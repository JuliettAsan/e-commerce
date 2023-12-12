import ForgotPasswordSubmit from "@/modules/Auth/ForgotPasswordSubmit";
import ForgotPassword from "@/modules/Auth/ForgotPassword";
import SignIn from "@/modules/Auth/SigIn";
import Head from "next/head";
import Notify from "@/ui/Notify/Notify";
import { createNotify } from "main/redux/actions/notify";
import { AUTH_MSG, AUTH_ERROR } from "config";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/ui/Loading/Loading";
import AuthLayout from "@/modules/Auth/AuthLayout";

export default function AuthModule() {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState(null);
  const [uiState, setUiState] = useState(null);
  const checkSesion = useRef(true);
  const [gLoading, setGLoading] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const { page } = router.query;

  useEffect(() => {
    if (checkSesion) {
      checkUser();
    }
    checkSesion.current = false;
  }, []);

  // Function that chande the loading state
  const toggleLoading = (number) => {
    setLoading(number);
  };

  async function checkUser() {
    try {
      // Funcion de Google que permite validar si el usuario está autenticado
      const user = await Auth.currentAuthenticatedUser();
      setUserState(user);

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
        router.push("/products");
      } else {
        setGLoading(false);
      }
    } catch (err) {
      setUserState(null);
      setGLoading(false);
      console.log(err);
    }
  }

  async function signIn(email, password) {
    try {
      await Auth.signIn({
        username: email,
        email,
        password,
      });
      dispatch(createNotify({ success: AUTH_MSG.IE }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
      setUiState("signedIn");
      checkUser();
    } catch (err) {
      let errorMsg = AUTH_MSG.GE;
      switch (err.name) {
        case AUTH_ERROR.AUTH_ERROR:
          errorMsg = AUTH_MSG.AE;
          break;
        case AUTH_ERROR.INVALID_PARAMETER:
          errorMsg = AUTH_MSG.AIP;
          break;
        case AUTH_ERROR.NOT_AUTHORIZED:
          errorMsg = AUTH_MSG.AIC;
          break;
        case AUTH_ERROR.USER_NOT_FOUND:
          errorMsg = AUTH_MSG.AUE;
          break;
        default:
          errorMsg = AUTH_MSG.GE;
          break;
      }
      console.log(err);
      dispatch(createNotify({ error: errorMsg }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword(email) {
    try {
      await Auth.forgotPassword(email);
      dispatch(createNotify({ success: AUTH_MSG.PR }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
      router.push("/?page=recoveryPassword");
    } catch (err) {
      let errorMsg = AUTH_MSG.GE;
      switch (err.name) {
        case AUTH_ERROR.LIMIT_EXCEEDED:
          errorMsg = AUTH_MSG.LE;
          break;
        case AUTH_ERROR.USER_NOT_FOUND:
          errorMsg = AUTH_MSG.AUE;
          break;
        default:
          errorMsg = AUTH_MSG.GE;
          break;
      }
      console.log(err);
      dispatch(createNotify({ error: errorMsg }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  async function forgotPasswordSubmit(email, authCode, password) {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password);
      router.push("/");
      dispatch(createNotify({ success: AUTH_MSG.CS }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } catch (err) {
      let errorMsg = AUTH_MSG.GE;
      switch (err.name) {
        case AUTH_ERROR.CODE_MISMATCH:
          errorMsg = AUTH_MSG.CME;
          break;
        case AUTH_ERROR.INVALID_PARAMETER:
          errorMsg = AUTH_MSG.IP;
          break;
        default:
          errorMsg = AUTH_MSG.GE;
          break;
      }
      console.log(err);
      dispatch(createNotify({ error: errorMsg }));
      setTimeout(() => {
        dispatch(createNotify({}));
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Autenticación </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {gLoading && <Loading />}

        {!gLoading && (
          <div>
            {(!page || page == "signIn") && setUiState != "signedIn" && (
              <AuthLayout description={"Geekly media - developer assessment"}>
                <SignIn
                  signIn={signIn}
                  loading={loading}
                  toggleLoading={toggleLoading}
                />
              </AuthLayout>
            )}

            {page === "forgotPassword" && (
              <AuthLayout
                description={
                  "Ingresa la dirección de correo electrónico verificada de su cuenta de usuario y le enviaremos un código para restablecer la contraseña."
                }
              >
                <ForgotPassword
                  forgotPassword={forgotPassword}
                  loading={loading}
                  toggleLoading={toggleLoading}
                />
              </AuthLayout>
            )}

            {page === "recoveryPassword" && (
              <AuthLayout
                description={
                  "Revisa el correo electrónico para obtener el código de verificación, si no aparece en unos minutos, revisa en correos no deseados"
                }
              >
                <ForgotPasswordSubmit
                  forgotPasswordSubmit={forgotPasswordSubmit}
                  loading={loading}
                  toggleLoading={toggleLoading}
                />
              </AuthLayout>
            )}

            {uiState === "signedIn" && userState && <p>Loading</p>}
          </div>
        )}
      </main>
      <Notify />
    </>
  );
}
