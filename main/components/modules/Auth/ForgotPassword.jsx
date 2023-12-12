import { useFormik } from "formik";

export default function ForgotPassword({
  forgotPassword,
  toggleLoading,
  loading,
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
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      roleAssign: "",
    },
    validate,
    onSubmit: (values) => {
      toggleLoading();
      forgotPassword(values.email);
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
          <label className="authCardFormSectionLabel">Email</label>
          <input
            className="authCardFormSectionInput"
            name="email"
            type="email"
            aria-label="Email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email ? <span>{formik.errors.email}</span> : null}
        </div>

        <button
          className={`btnAuth ${loading == 1 ? "is-loading" : ""}`}
          type="submit"
          id="forgotPassword"
          alt="Forgot Password"
          aria-label="Forgot Password"
        >
          Reset password
        </button>
      </form>
    </div>
  );
}
