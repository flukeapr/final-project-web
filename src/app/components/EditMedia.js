"use client";
import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { SquarePen, Trash2, ArrowBigUp } from "lucide-react";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
export default function EditMedia({ initialMedia }) {
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState(initialMedia);
  const [mediaId, setMediaId] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [video ,setVideo] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [content, setContent] = useState("");
  const [categoryImage , setCategoryImage] = useState(false);
  const [categoryVideo , setCategoryVideo] = useState(false);
  const [categoryContent , setCategoryContent] = useState(false);

  const SelectMedia = (media) => {
    setMediaId(media.id);
    setTitle(media.title);
    setUrl(media.url);
    setImage(media.image);
    setContent(media.content);
    setVideo(media.video);
  };
  const clearSelectedMedia = () => {
    setTitle("");
    setUrl("");
    setImage("");
    setPreview(null);
    setImgUpload(null);
    setVideoUpload(null);
    setContent("");
    setPreviewVideo(null);
  };
  const handleUpdate = async () => {
    if (!mediaId) return;
    document.getElementById("loadingModal").showModal();
    try {
      const resData = await fetch(
        `${process.env.NEXT_PUBLIC_serverURL}/api/media/${mediaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            url,
          }),
        }
      );
      if (resData.ok) {
        if (imgUpload) {
          try {
            const formData = new FormData();
            formData.append("image", imgUpload);
            const resImage = await fetch(
              `${process.env.NEXT_PUBLIC_serverURL}/api/media/image/${mediaId}`,
              {
                method: "PUT",
                body: formData,
              }
            );
            const dataImage = await resImage.json();
            if (!resImage.ok) {
              if (dataImage.error === "ไฟล์ต้องมีขนาดน้อยกว่า 2.5 MB") {
                toast.error("ไฟล์ต้องมีขนาดน้อยกว่า 2.5 MB");
              } else if (
                dataImage.error === "ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png"
              ) {
                toast.error("ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png");
              }
              document.getElementById("loadingModal").close();
              document.getElementById("edit_modal").close();
              return;
            }
          } catch (error) {
            document.getElementById("loadingModal").close();
            document.getElementById("edit_modal").close();
            toast.error("อัพเดตรูปภาพไม่สําเร็จ");
            return;
          }
        }
        document.getElementById("loadingModal").close();
        document.getElementById("edit_modal").close();
        toast.success("อัพเดตสื่อเนื้อหาและรูปภาพสําเร็จ");
        clearSelectedMedia();
        refreshMediaData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refreshMediaData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_serverURL}/api/media`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMedia(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (item) => {
    Swal.fire({
      position: "center",
      title: "คุณต้องการลบสื่อใช่หรือไม่ ?",
      text: `ต้องการลบสื่อใช่ไหม`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resData = await fetch(`/api/media/${item.id}`, {
            method: "DELETE",
          });
          let resImg = {ok : true}
          let resVideo = {ok : true}
          if(item.image != null){
             resImg = await fetch(`/api/media/image/${item.id}`, {
              method: "DELETE",
            });
            
          }else if(item.video != null){
             resVideo = await fetch(`/api/media/video/${item.id}`, {
              method: "DELETE",
            });
            
          } 
          if(!resImg.ok || !resVideo.ok || !resData.ok) {
            toast.error("ลบสื่อเนื้อหาไม่สําเร็จ");
          }
          if (resData.ok ) {
            toast.success("ลบสื่อเนื้อหาสําเร็จ");
            refreshMediaData();
          }
        } catch (error) {
          toast.error("ลบสื่อเนื้อหาไม่สําเร็จ");
          console.log(error);
        }
      }
    });
  };

  const handleCreate = async () => {
    document.getElementById("loadingModal").showModal();
    try {
      const resData = await fetch(
        `${process.env.NEXT_PUBLIC_serverURL}/api/media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            url,
            content
          }),
        }
      );
      const data = await resData.json();
      if (resData.ok) {
        let id = data.id;

        if (imgUpload) {
          if(imgUpload.size > 2621440){
            document.getElementById("loadingModal").close();
            document.getElementById("edit_modal").close();
            toast.error("ไฟล์ต้องมีขนาดน้อยกว่า 2.5 MB");
            return;
          }else if(imgUpload.type !== "image/jpeg" && imgUpload.type !== "image/png" && imgUpload.type !== "image/jpg"){   
            document.getElementById("loadingModal").close();
            document.getElementById("edit_modal").close();
            toast.error("ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png");
            return;
          }
          try {
            const formData = new FormData();
            formData.append("image", imgUpload);
            const resImage = await fetch(
              `${process.env.NEXT_PUBLIC_serverURL}/api/media/image/${id}`,
              {
                method: "PUT",
                body: formData,
              }
            );
            if (!resImage.ok) {
              if (dataImage.error === "ไฟล์ต้องมีขนาดน้อยกว่า 2.5 MB") {
                toast.error("ไฟล์ต้องมีขนาดน้อยกว่า 2.5 MB");
              } else if (
                dataImage.error === "ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png"
              ) {
                toast.error("ไฟล์ต้องเป็นนามสกุล .jpg หรือ .png");
              }
              await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/media/${id}`,
                {
                  method: "DELETE",
                }
              )
              document.getElementById("loadingModal").close();
              document.getElementById("newMedia").close();
              return;
            }
          } catch (error) {
            document.getElementById("loadingModal").close();
            document.getElementById("newMedia").close();
            toast.error("อัพเดตรูปภาพไม่สําเร็จ");
            return;
          }
        } else if (videoUpload) {
          if(videoUpload.size > 104857600){
            document.getElementById("loadingModal").close();
            document.getElementById("newMedia").close();
            toast.error("ไฟล์ต้องมีขนาดน้อยกว่า 100 MB");
            return;
          }else if(videoUpload.type !== "video/mp4"){
            
            document.getElementById("loadingModal").close();
            document.getElementById("newMedia").close();
            toast.error("ไฟล์ต้องเป็นนามสกุล .mp4");
            return;
          }
          try {
            const formData = new FormData();
            formData.append("video", videoUpload);
            const resImage = await fetch(
              `${process.env.NEXT_PUBLIC_serverURL}/api/media/video/${id}`,
              {
                method: "PUT",
                body: formData,
              }
            );
            if (!resImage.ok) {
              if (dataImage.error === "ไฟล์ต้องมีขนาดน้อยกว่า 100 MB") {
                toast.error("ไฟล์ต้องมีขนาดน้อยกว่า 100 MB");
              } else if (
                dataImage.error ===
                "ไฟล์ต้องเป็นนามสกุล .mp4"
              ) {
                toast.error("ไฟล์ต้องเป็นนามสกุล .mp4");
              }
              await fetch(
                `${process.env.NEXT_PUBLIC_serverURL}/api/media/${id}`,
                {
                  method: "DELETE",
                }
              )
              document.getElementById("loadingModal").close();
              document.getElementById("newMedia").close();
              return;
            }
          } catch (error) {
            document.getElementById("loadingModal").close();
            document.getElementById("newMedia").close();
            toast.error("พิ่มสื่อวิดีโอไม่สําเร็จ");
            return;
          }
        }
        document.getElementById("loadingModal").close();
        document.getElementById("newMedia").close();
        toast.success("เพิ่มสื่อเนื้อหาสำเร็จ");
        clearSelectedMedia();
        refreshMediaData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Adjust the threshold as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="w-1/4 h-[500px] bg-gradient-to-r from-blue-500 to-sky-400 rounded-md shadow-md p-6 mt-4 max-sm:hidden sm:hidden lg:block">
        <div className="w-full flex flex-col ">
          <button
            className="btn bg-white w-full text-blue-500 tracking-wider text-lg"
            onClick={() => document.getElementById("newMedia").showModal()}
          >
            เพิ่มสื่อใหม่
          </button>
          <div className="space-y-2 mt-4">
            <h1 className="text-lg text-white">ค้นหาสื่อความรู้</h1>
            <input
              type="search"
              placeholder="ค้นหาสื่อความรู้"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <div className="mt-4 space-y-4">
              <h1 className="text-lg text-white">ค้นหาตามกลุ่ม</h1>
              <div className="form-control rounded-md bg-white p-2">
                <label className="label cursor-pointer ">
                  <span className="label-text  text-md">
                    ที่มีรูปภาพ
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    onChange={() => setCategoryImage(!categoryImage)}
                  />
                </label>
              </div>
              
              <div className="form-control rounded-md bg-white p-2">
                <label className="label cursor-pointer ">
                  <span className="label-text  text-md">
                    ที่มีวิดีโอ
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    onChange={() => setCategoryVideo(!categoryVideo)}
                  />
                </label>
              </div>
              
             
              <div className="form-control rounded-md bg-white p-2">
                <label className="label cursor-pointer ">
                  <span className="label-text  text-md">
                    ที่เป็นบทความ
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    onChange={() => setCategoryContent(!categoryContent)}
                  />
                </label>
              </div>
              
              
              
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 gap-4 p-4  items-center w-3/4 max-sm:flex-wrap max-sm:w-full max-sm:justify-center">
        {media.length > 0 &&
          media
            .filter((item) => item.title.includes(search)).filter((item) => {
              if(categoryImage && categoryVideo && categoryContent){
                return true
              }else  if (categoryImage) {
                return item.image;
              } else if (categoryVideo) {
                return item.video;
              } else if (categoryContent) {
                return item.content;
              } else {
                return item;
              }
            })
            .map((item) => (
              <div
                key={item.id}
                className="lg:w-full  lg:h-full flex flex-col items-center justify-around m-4 p-4 shadow-lg rounded-md drop-shadow-lg max-sm:w-full max-sm:h-1/5 max-sm:justify-center sm:w-full sm:h-1/5 "
              >
                <h1 className="text-lg tracking-normal font-medium">
                  {item.title}
                </h1>
                <div className="lg:w-full max-sm:w-full lg:flex lg:items-center lg:justify-center">
                  <a href={item.url ? item.url : ""} target="_blank">
                    {item.image && (
                      <img
                        src={item.image}
                        className=" rounded-md shadow-sm "
                      />
                    )}
                    {item.video && (
                      <video className=" rounded-md shadow-sm " controls>
                        <source src={item.video} type="video/mp4" />
                      </video>
                    )}
                  </a>
                </div>
                {item.content && (
                   <h1 className=" truncate w-full">
                   {item.content}
                 </h1>
                )}
               
                <div className="flex flex-col justify-center p-4  w-3/4">
                  <div className="flex flex-row justify-around mt-6">
                    <div className="tooltip w-2/4" data-tip="แก้ไข">
                      <button
                        className="btn w-full bg-gradient-to-r from-blue-500 to-sky-400"
                        onClick={() => {
                          SelectMedia(item);
                          document.getElementById("edit_modal").showModal();
                        }}
                      >
                        <SquarePen color="white" />
                      </button>
                    </div>

                    <div className="tooltip w-2/4" data-tip="ลบ">
                      <button
                        className="btn w-full "
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      {/* edit modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                clearSelectedMedia();
              }}
            >
              ✕
            </button>
          </form>
          {/* bg top */}
          {/* <div className="bg-sky-200 w-full h-[15%] absolute top-0 left-0 -z-10"></div> */}
          {/* detail profile */}
          <div className="flex flex-col p-4 mt-4 ">
            {/* form group detail */}
            <div className="flex flex-col space-y-2">
              <h1>สื่อให้ความรู้</h1>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>หัวข้อ</h1>
                <input
                  className=" input input-bordered w-4/5  "
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>ลิ้งค์</h1>
                <input
                  className=" input input-bordered w-4/5 "
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>บทความ</h1>
                <textarea
                  className=" input input-bordered w-4/5 "
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <hr />

              <div className="flex flex-row justify-between py-2">
                <h1>รูปประกอบ หรือ วิดีโอ</h1>
                <div className="flex flex-col items-center justify-center space-x-4">
                {video && (
                    <video
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                      controls
                    >
                      <source src={video}  />
                    </video>
                  )}
                  {preview ? (
                    <img
                      src={preview}
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                    />
                  ) : (
                    image && (
                      <img
                        src={image}
                        className=" max-w-2xl rounded-md shadow-md max-sm:w-full sm:w-full"
                      />
                    )
                  )}
                  <h1 className="py-2">เลือกรูปภาพใหม่</h1>
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file.type === "video/mp4") {
                        const src = URL.createObjectURL(e.target.files[0]);
                        console.log(src);
                        setPreviewVideo(src);
                        setVideoUpload(file);
                      } else if (
                        file.type === "image/png" ||
                        file.type === "image/jpg" ||
                        file.type === "image/jpeg"
                      ) {
                        const src = URL.createObjectURL(e.target.files[0]);
                        setPreview(src);
                        setImgUpload(e.target.files[0]);
                      } 
                    }}
                    className="file-input input-xs  input-bordered w-32 my-2"
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
          {/* submit and cancel button */}
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-sm btn-outline text-lg"
              onClick={() => {
                document.getElementById("edit_modal").close();

                clearSelectedMedia();
              }}
            >
              ยกเลิก
            </button>
            <button
              className="btn btn-sm btn-outline tracking-wider bg-blue-500 text-white text-lg"
              onClick={handleUpdate}
            >
              บันทึก
            </button>
          </div>
        </div>
      </dialog>
      {/* loading */}
      <dialog id="loadingModal" className="modal">
        <div className="modal-box w-auto flex items-center justify-center">
          <span className="loading loading-dots loading-lg bg-blue-500"></span>
        </div>
      </dialog>
      {/* new media */}
      <dialog id="newMedia" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                clearSelectedMedia();
              }}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col p-4 mt-4 ">
            {/* form group detail */}
            <div className="flex flex-col space-y-2">
              <h1>สื่อให้ความรู้</h1>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>หัวข้อ</h1>
                <input
                  className=" input input-bordered w-4/5  "
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <hr />
              <div className="flex flex-row justify-between py-2">
                <div className="flex flex-col">
                  <h1>ลิ้งค์</h1>
                  <p className="text-sm">*ถ้ามี หากเป็นบทความภาพนอก*</p>
                </div>

                <input
                  className=" input input-bordered w-4/5 "
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <hr />
              <div className="flex flex-row justify-between py-2">
                <h1>บทความ</h1>
                <textarea
                  className=" input input-bordered w-4/5 "
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <hr />

              <div className="flex flex-row justify-between py-2">
                <h1>รูปประกอบ หรือ วิดีโอ</h1>
                <div className="flex flex-col items-center justify-center space-x-4">
                  {previewVideo && (
                    <video
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                      controls
                    >
                      <source src={previewVideo} type={previewVideo.type} />
                    </video>
                  )}
                  {preview && (
                    <img
                      src={preview}
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                    />
                  )}
                  <h1 className="py-2">เลือกรูปภาพหรือวิดีโอ</h1>
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log(file);
                      if (file.type === "video/mp4") {
                        const src = URL.createObjectURL(e.target.files[0]);
                        console.log(src);
                        setPreviewVideo(src);
                        setVideoUpload(file);
                      } else if (
                        file.type === "image/png" ||
                        file.type === "image/jpg" ||
                        file.type === "image/jpeg"
                      ) {
                        const src = URL.createObjectURL(e.target.files[0]);
                        setPreview(src);
                        setImgUpload(e.target.files[0]);
                      } 
                    }}
                    className="file-input input-xs  input-bordered w-32 my-2"
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
          {/* submit and cancel button */}
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-sm btn-outline text-lg"
              onClick={() => {
                document.getElementById("newMedia").close();
                clearSelectedMedia();
              }}
            >
              ยกเลิก
            </button>
            <button
              className="btn btn-sm btn-outline tracking-wider bg-blue-500 text-white text-lg"
              onClick={handleCreate}
            >
              บันทึก
            </button>
          </div>
        </div>
      </dialog>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg"
        >
          <ArrowBigUp size={30} />
        </button>
      )}
    </>
  );
}
