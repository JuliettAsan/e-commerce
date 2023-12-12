import { useFormik } from "formik";

export default function ForgotPasswordSubmit({
  forgotPasswordSubmit,
  loading,
  toggleLoading,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "El campo email es requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "El correo electrónico es incorrecto";
    }
    if (!values.authCode) {
      errors.authCode = "El código de autenticación es requerido";
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
      authCode: "",
    },
    validate,
    onSubmit: (values) => {
      toggleLoading();
      forgotPasswordSubmit(values.email, values.authCode, values.password);
    },
  });

  return (
    <div className="authCardContent">
      <form
        className="authCardForm"
        onSubmit={formik.handleSubmit}
        method="POST"
      >
        {/* Correo electrónico */}
        <div className="authCardFormSection">
          <label className="authCardFormSectionLabel">Correo electrónico</label>
          <br />
          <input
            className="authCardFormSectionInput"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email ? <span>{formik.errors.email}</span> : null}
        </div>

        {/* Código de verificación */}
        <div className="authCardFormSection">
          <label className="authCardFormSectionLabel">
            Código de verificación
          </label>
          <br />
          <input
            className="authCardFormSectionInput"
            name="authCode"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.authCode}
          />
          {formik.errors.authCode ? (
            <span>{formik.errors.authCode}</span>
          ) : null}
        </div>

        {/* Nueva contraseña */}
        <div className="authCardFormSection">
          <label className="authCardFormSectionLabel">Contraseña nueva</label>
          <br />
          <input
            className="authCardFormSectionInput"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <span>{formik.errors.password}</span>
          ) : null}
        </div>

        <button
          className={`btnAuth ${loading == 1 ? "is-loading" : ""}`}
          type="submit"
          id="resetPassword"
          alt="Reset Password"
          aria-label="Reset Password"
        >
          Restablecer contraseña
        </button>
      </form>
    </div>
  );
}
