import "@/styles/globals.scss";
import { AuthGuard } from "@/modules/Auth/AuthGuard";
import { wrapper } from "main/redux/store";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"] });

function App({ Component, pageProps }) {
  return (
    <div>
      <style jsx global>{`
        :root {
          --sora-font: ${sora.style.fontFamily};
        }
      `}</style>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
    </div>
  );
}

export default wrapper.withRedux(App);
