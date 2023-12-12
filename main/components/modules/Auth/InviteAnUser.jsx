import React from "react";
import { useFormik } from "formik";

export default function InviteAnUser({ inviteUser, loading, toggleLoading }) {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "El campo email es requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "El correo electrónico es incorrecto";
    }
    if (!values.roleAssign) {
      errors.roleAssign = "El campo rol es requerido";
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
      inviteUser(values.email, values.role);
      formik.resetForm();
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
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email ? <span>{formik.errors.email}</span> : null}
      </div>

      {/* Rol */}
      <div className="authCardFormSection">
        <label className="authCardFormSectionLabel">Rol</label>
        <br />
        <select
          className="authCardFormSectionInput"
          name="roleAssign"
          id="roleAssign"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.roleAssign}
        >
          <option value="">seleccione una opción</option>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        {formik.errors.roleAssign ? (
          <span>Debes seleccionar una opción</span>
        ) : null}
      </div>

      <button
        className={`btnAuth  ${loading == 1 ? "is-loading" : ""}`}
        id="sendInvitation"
        alt="Send Invitation"
        aria-label="Send Invitation"
        type="submit"
      >
        Enviar invitación
      </button>
    </form>
  );
}
