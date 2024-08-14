import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Catalog from "./Catalog";

export default function Home() {
  return (
    <main 
    // className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      {/* <Header/> */}
      <Catalog/>
      {/* <Footer/> */}
    </main>
  );
}
