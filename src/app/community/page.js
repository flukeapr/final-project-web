"use server";

import Navbar from "../components/Navbar";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PostComponent from "../components/PostComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { GetPost } from "../components/action/PostAction";

export default async function Community() {
  const session = await getServerSession();
 if(!session) redirect("/");
 
  const posts = await GetPost();

 

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto pt-10 px-6">
        <h1 className="text-3xl font-bold text-center text-DB my-2 tracking-wide">
          โพสต์ทั้งหมด
        </h1>
        <PostComponent initialPosts={posts.data} />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
