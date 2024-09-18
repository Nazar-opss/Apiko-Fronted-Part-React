'use client'
import { Heebo, Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import StoreProvider from "./state/StoreProvider";
import { store } from "./state/Store";
import { injectStore } from "./apiUser";
import { ToastContainer } from "react-toastify";
const heebo = Heebo({ subsets: ["latin"] });

// export const metadata = {
//   title: "Apiko Store",
//   description: "Generated by create next app",
// };

console.log("Injecting store..."); // Додаємо логування
injectStore(store)


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={heebo.className} suppressHydrationWarning={true} >
          <StoreProvider>
              <div className="min-h-screen">
                <Header/>
                {children}
                <Footer/>
              </div>
              {/* <div>
              {auth}
              </div> */}
          </StoreProvider>
          <ToastContainer style={{ width: "584px", height: "60px", marginTop: "82px"}}/>

        </body>
      </html>
  );
}
