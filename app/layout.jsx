import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Thoughtstopia",
  description: "For the minds that never rest, share and discover thoughts",
  icons: {
    icon: '/assets/images/logo_10.png',
  },
  googleSiteVerification: "uudaC6vPPLY39oWpOLoCd4T_wqOUHHgrmsrfbWJ1gN4",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
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
