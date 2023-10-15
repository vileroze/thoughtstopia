import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import Head from "next/head";

export const metadata = {
  title: "Thoughtstopia",
  description: "For the minds that never rest, share and discover thoughts",
  icons: {
    icon: "/assets/images/logo_10.png",
  },
  verification: {
    google: "uudaC6vPPLY39oWpOLoCd4T_wqOUHHgrmsrfbWJ1gN4",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        {metadata.verification?.google && (
          <meta
            name="google-site-verification"
            content={metadata.verification.google}
          />
        )}
      </Head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
