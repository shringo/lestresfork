import Head from "next/head";
import MainBrNavbar from "~/components/MainBrNavbar";
import Footer from "~/components/footer";

// THE LANDING PAGE IS DIFFERENT FROM THE INDEX PAGE.
// THIS IS ACCESSED USING LOCALHOST:3000
// LANDING ACCESSED USING LOCALHOST:3000/LANDING

export default function Home() {
  return (
    <>
      <Head>
        <title>MHS HAKK</title>
        <meta name="description" content="created by the MHS HAKK team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBrNavbar/>
      <Footer/>
    </>
  );
} 
