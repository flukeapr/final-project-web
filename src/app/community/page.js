"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Heart, MessageSquare } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useSession } from "next-auth/react";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [topComment, setTopComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topLikes, setTopLikes] = useState(false);

  const getPost = async () => {
    try {
      const res = await fetch("/api/post");
      const data = await res.json();
      const formattedPost = data.reduce((acc, item) => {
        let post = acc.find((post) => post.postId === item.post_id);

        if (!post) {
          post = {
            postId: item.post_id,
            postText: item.post_text,
            post_image: item.post_image,
            postUserId: item.post_userId,
            postUserName: item.post_user_name,
            postUserImage: item.post_user_image,
            postLikes: item.count_likes,
            postCreateAt: item.post_create_at,
            comments: [],
            showComments: false,
            commentText: "",
          };
          acc.push(post);
        }

        if (item.comment_id) {
          post.comments.push({
            commentId: item.comment_id,
            commentText: item.comment_text,
            commentImage: item.comment_image,
            commentUser: item.comment_userId,
            commentUserName: item.comment_user_name,
            commentUserImage: item.comment_user_image,
            commentCreateAt: item.comment_create_at,
          });
        }

        return acc;
      }, []);
      setPosts(formattedPost);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDay(createAt) {
    const date = new Date(createAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return ` ${day}/${month}/${year}`;
  }

  function formatTime(createAt) {
    const date = new Date(createAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return ` ${hours}:${minutes}`;
  }
  const toggleComments = (postId) => {
    const post = posts.find((post) => post.postId === postId);
    if (post.comments.length === 0) return false;

    setPosts(
      posts.map((post) =>
        post.postId === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text) {
      toast.error("กรุณาใส่ความคิดเห็น");
      return;
    }
    try {
      const res = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: session.user.id,
          text,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCommentText((prev) => ({ ...prev, [postId]: "" }));
        toast.success("เขียนความคิดเห็นสําเร็จ");
        getPost();
      } else {
        toast.error("เกิดข้อผิดพลาด: " + (data.message || "ไม่ทราบ"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWriteComment = (postId, text) => {
    setCommentText((prev) => ({ ...prev, [postId]: text }));
  };

  useEffect(() => {
    getPost().then(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto pt-20 px-6">
        <h1 className="text-3xl font-bold text-center text-blue-500 my-2 tracking-wide">
          โพสต์ทั้งหมด
        </h1>
        <div className="w-full flex justify-around ">
          <div className="w-1/4 h-[500px] bg-gradient-to-r from-blue-500 to-sky-400 rounded-md shadow-md drop-shadow-lg lg:block space-y-4 flex flex-col p-4">
            <h1 className="text-lg text-white">ค้นหา</h1>
            <input
              className="w-full h-12 bg-white rounded-md shadow-md p-2"
              placeholder="ค้นหาโพสต์"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mt-4 space-y-4">
              <h1 className="text-lg text-white">เรียงตาม</h1>
              <div className="form-control rounded-md bg-white p-2">
                <label className="label cursor-pointer ">
                  <span className="label-text  text-md">
                    จำนวนคอมเมนต์มากที่สุด
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    onChange={() => setTopComment(!topComment)}
                  />
                </label>
              </div>
              <div className="form-control rounded-md bg-white p-2">
                <label className="label cursor-pointer">
                  <span className="label-text  text-md">
                    จำนวนไลค์มากที่สุด
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    onChange={() => setTopLikes(!topLikes)}
                  />
                </label>
              </div>
              <h1 className="text-lg text-white">เลือกช่วงเวลา</h1>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setDateRange(e.target.value)}
                value={dateRange}
              >
                <option value="all">ทั้งหมด</option>
                <option value="today">วันนี้</option>
                <option value="week">สัปดาห์นี้</option>
                <option value="month">เดือนนี้</option>
              </select>
            </div>
          </div>
         
          <div className="flex flex-col  lg:w-3/4 p-4 max-sm:w-full sm:w-full ">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="loading loading-dots loading-lg text-[#3b82f6]"></span>
              </div>
            ) : (
              posts
                .filter((post) => {
                  if (dateRange === "all") return true;
                  const postDate = new Date(post.postCreateAt);
                  const now = new Date();
                  if (dateRange === "today") {
                    return postDate.toDateString() === now.toDateString();
                  } else if (dateRange === "week") {
                    return postDate >= now.setDate(now.getDate() - 7);
                  } else if (dateRange === "month") {
                    return postDate >= now.setMonth(now.getMonth() - 1);
                  }
                  return true;
                })
                .filter((post) => {
                  if (search === "") return true;
                  return post.postUserName.includes(search);
                })
                .sort((a, b) => {
                  if (topComment) {
                    return b.comments.length - a.comments.length;
                  }
                  if (topLikes) {
                    return b.postLikes - a.postLikes;
                  }
                  return new Date(b.postCreateAt) - new Date(a.postCreateAt);
                })
                .map((post, index) => (
                  <div
                    key={index}
                    className="mb-8 p-4 flex flex-col bg-white w-auto rounded-lg shadow-xl "
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={post?.postUserImage}
                        alt={post?.postUserName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="ml-2 font-medium">
                          {post?.postUserName}
                        </span>
                        <span className="ml-2 text-sm">
                          {formatTime(post?.postCreateAt)}
                        </span>
                      </div>
                    </div>
                    <p className="p-2">{post?.postText}</p>

                    {post?.postImage && (
                      <img
                        src={post?.postImage}
                        alt="Post Image"
                        className="my-4 rounded-sm"
                      />
                    )}

                    <span className="mt-2 text-sm flex justify-end">
                      {formatDay(post?.postCreateAt)}
                    </span>
                    <hr />
                    <div className="flex my-2">
                      <p className="ml-4 flex items-center">
                        <FaHeart className="text-red-500 mr-2" />
                        {post?.postLikes}
                      </p>
                      <div
                        className="ml-4 flex items-center cursor-pointer"
                        onClick={() => toggleComments(post?.postId)}
                      >
                        <FaRegCommentAlt className="mr-2" />
                        {post?.comments?.length} Comments
                      </div>
                    </div>
                    <hr />
                    {post?.showComments && (
                      <div className="mt-4">
                        {post.comments.length > 0 &&
                          post.comments.map((comment, idx) => (
                            <div key={idx} className="mt-2 pl-4">
                              <div className="flex items-center mb-2">
                                <img
                                  src={comment?.commentUserImage}
                                  alt={comment?.commentUserName}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex flex-col">
                                  <span className="ml-2">
                                    {comment?.commentUserName}
                                  </span>
                                  <span className="ml-2 text-sm">
                                    {formatTime(comment?.commentCreateAt)}
                                  </span>
                                </div>
                              </div>
                              <p>{comment?.commentText}</p>
                              {comment?.commentImage && (
                                <img
                                  src={comment?.commentImage}
                                  alt="Comment Image"
                                  className="my-2"
                                />
                              )}
                              <hr className="my-2" />
                            </div>
                          ))}
                      </div>
                    )}
                    <input
                      className="w-full p-2 rounded-lg input input-bordered mt-2 input-sm"
                      placeholder="เขียนความคิดเห็น..."
                      type="text"
                      value={commentText[post.postId] || ""}
                      onChange={(e) =>
                        handleWriteComment(post.postId, e.target.value)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleComment(post.postId)
                      }
                    />
                  </div>
                ))
            )}
            {}
          </div>
        </div>
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
