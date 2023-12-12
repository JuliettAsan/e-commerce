import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";

export default function SignIn({ signIn, loading, toggleLoading }) {
  const router = useRouter();
  const { page } = router.query;

  async function logWithGoogle(number = 1) {
    try {
      await Auth.federatedSignIn({
        provider: "Google",
      });
      toggleLoading(number);
    } catch (error) {
      console.log(error);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "El campo email es requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "El correo electrónico es incorrecto";
    }
    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener mínimo 8 caracteres";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      toggleLoading(1);
      signIn(values.email, values.password);
    },
  });

  return (
    <div className="authCardContent">
      {!page && (
        <div>
          <button
            aria-label="LogIn With Google"
            alt="LogIn With Google"
            id="LogInWithGoogle"
            className={`btnAuth  ${loading == 2 ? "is-loading" : ""}`}
            onClick={() => logWithGoogle(2)}
          >
            <span className="icon icon-google"></span>
            Log in with Google
          </button>
          <span>o</span>
          <Link className="authCardContentSign" href="/?page=signIn">
            I have a username and password
          </Link>
        </div>
      )}

      {page == "signIn" && (
        <>
          <form className="authCardForm" onSubmit={formik.handleSubmit}>
            {/* Correo electrónico */}
            <div className="authCardFormSection">
              <label className="authCardFormSectionLabel">Email</label>
              <br />
              <input
                className="authCardFormSectionInput"
                name="email"
                type="email"
                aria-label="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email ? <span>{formik.errors.email}</span> : null}
            </div>

            {/* Contraseña */}
            <div className="authCardFormSection">
              <label className="authCardFormSectionLabel">Password</label>
              <br />
              <input
                className="authCardFormSectionInput"
                type="password"
                name="password"
                aria-label="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <span>{formik.errors.password}</span>
              ) : null}
            </div>

            <button
              id="LogIn"
              alt="LogIn"
              aria-label="LogIn"
              type="submit"
              className={`btnAuth ${loading == 1 ? "is-loading" : ""}`}
            >
              Log In
            </button>
          </form>
          <span>o</span>
          <button
            aria-label="LogIn With Google"
            alt="LogIn With Google"
            id="LogInWithGoogle"
            className={`btnAuth ${loading == 2 ? "is-loading" : ""}`}
            onClick={() => logWithGoogle(2)}
          >
            <span className="icon icon-google"></span>
            Log in with Google
          </button>
        </>
      )}
    </div>
  );
}
