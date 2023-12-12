import React from "react";
import { useFormik } from "formik";

export default function InvitedUserCreateNewPassword({
  username,
  createNewPassword,
  loading,
  toggleLoading,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.temporaryPassword) {
      errors.temporaryPassword = "La contraseña temporal es requerida";
    } else if (values.temporaryPassword.length < 8) {
      errors.temporaryPassword = "La contraseña debe tener mínimo 8 caracteres";
    }
    if (!values.newPassword) {
      errors.newPassword = "La contraseña nueva es requerida";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "La contraseña debe tener mínimo 8 caracteres";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      user: username,
      temporaryPassword: "",
      newPassword: "",
    },
    validate,
    onSubmit: (values) => {
      toggleLoading();
      createNewPassword(values.temporaryPassword, values.newPassword);
    },
  });

  return (
    <form className="authCardForm" onSubmit={formik.handleSubmit}>
      {/* Correo electrónico */}
      <div className="authCardFormSection">
        <label className="authCardFormSectionLabel">Correo electrónico</label>
        <br />
        <input
          className="authCardFormSectionInput"
          name="user"
          required
          type="email"
          readOnly
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.user}
        />
      </div>
      {formik.errors.user ? <span>{formik.errors.user}</span> : null}

      {/* Contraseña asignada */}
      <div className="authCardFormSection">
        <label className="authCardFormSectionLabel">Contraseña temporal</label>
        <br />
        <input
          className="authCardFormSectionInput"
          name="temporaryPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.temporaryPassword}
        />
        {formik.errors.temporaryPassword ? (
          <span>{formik.errors.temporaryPassword}</span>
        ) : null}
      </div>

      {/* Nueva contraseña */}
      <div className="authCardFormSection">
        <label className="authCardFormSectionLabel">Contraseña nueva</label>
        <br />
        <input
          className="authCardFormSectionInput"
          name="newPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword ? (
          <span>{formik.errors.newPassword}</span>
        ) : null}
      </div>

      <button
        type="submit"
        id="createNewPassword"
        alt="Create New Password"
        aria-label="Create New Password"
        className={`btnAuth  ${loading == 1 ? "is-loading" : ""}`}
      >
        Crear contraseña
      </button>
    </form>
  );
}
