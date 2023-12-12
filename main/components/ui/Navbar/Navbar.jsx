import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Auth } from "aws-amplify";
import Image from "next/image";

export default function Navbar({ user }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const routes = [
    {
      name: "Products",
      path: "/products",
    },
  ];
  return (
    <>
      <div className={`navbar ${navbarOpen ? "is-active" : ""}`}>
        <Link className="navbar-logo " href="/">
          {/*  <Image
            alt=" "
            src={"/assets/logos/logos-o.png"}
            fill
            className="image"
          /> */}
        </Link>
        <span className="navbar-space"></span>

        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={`navbar-item ${
              router?.pathname?.includes(route.path) ? "is-active" : ""
            }`}
          >
            {route.name}
          </Link>
        ))}
        {user?.email && (
          <div className={`navbar-user `}>
            <div
              className={`navbar-user-image `}
              style={{
                backgroundImage: `url(${user?.picture})`,
              }}
            ></div>
            {user?.email?.split("@")[0]}
            <i className="icon  icon-smallest icon-arrow-c-bot"></i>
            <div className="navbar-user-menu">
              {user?.role == "admin" && (
                <div className="navbar-item">
                  <Link href={"/usuarios/invite"}>Invitar Usuarios</Link>
                </div>
              )}
              <div
                className="navbar-item"
                onClick={() => {
                  Auth.signOut();
                  localStorage.clear();
                  router.push("/");
                }}
              >
                Cerrar sesión
              </div>
            </div>
          </div>
        )}

        <button
          className="navbar-icon is-mobile "
          onClick={() => {
            setNavbarOpen(!navbarOpen);
          }}
        ></button>
      </div>
      <div
        className="navbar-mobile-bg"
        onClick={() => {
          setNavbarOpen(false);
        }}
      ></div>
      <div className="navbar-mobile ">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
            className={`navbar-item ${
              router?.pathname?.includes(route.path) ? "is-active" : ""
            }`}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </>
  );
}
