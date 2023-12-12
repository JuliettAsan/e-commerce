import { useRouter } from "next/router";

export default function AuthLayout({ description, children }) {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div className="auth">
      <div className="authCard">
        <h3 className="authCardTitle">
          USER AUTHENTICATION <br /> - E-COMMERCE WEBSITE
        </h3>
        {page !== "signIn" && <p className="authCardDescr">{description}</p>}
        {children}
        {(!page || page == "signIn") && (
          <a
            className="authCardFooter"
            onClick={() => router.push("/?page=forgotPassword")}
          >
            Forgot password
          </a>
        )}
        {(page == "forgotPassword" ||
          page == "recoveryPassword" ||
          page == "") && (
          <a className="authCardFooter" onClick={() => router.push("/")}>
            CANCEL
          </a>
        )}
      </div>
    </div>
  );
}
