"use client";
import { useState , useEffect ,useRef } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { SquarePen, Trash2,ArrowBigUp } from "lucide-react";
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
  const [search , setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  

  const SelectMedia = (media) => {
    setMediaId(media.id);
    setTitle(media.title);
    setUrl(media.url);
    setImage(media.image);
  };
  const clearSelectedUser = () => {
    setTitle("");
    setUrl("");
    setImage("");
    setPreview(null);
    setImgUpload(null);
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
            if (!resImage.ok) {
              toast.error("อัพเดตรูปภาพไม่สําเร็จ");
            }
            if(resImage.ok){
              refreshMediaData();
            }
          } catch (error) {
            toast.error("อัพเดตรูปภาพไม่สําเร็จ");
          }
        }
        document.getElementById("loadingModal").close();
        document.getElementById("edit_modal").close();
        toast.success("อัพเดตสื่อเนื้อหาและรูปภาพสําเร็จ");
        clearSelectedUser();
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
  const handleDelete = async (id) => {
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
          const resData = await fetch(`/api/media/${id}`, {
            method: "DELETE",
          });
          const resImg = await fetch(`/api/media/image/${id}`, {
            method: "DELETE",
          });
          if (!resData.ok || !resImg.ok) {
            toast.error("ลบสื่อเนื้อหาและรูปภาพไม่สําเร็จ");
          }
          if (resData.ok && resImg.ok) {
            toast.success("ลบสื่อเนื้อหาและรูปภาพสําเร็จ");
            refreshMediaData();
          }
        } catch (error) {
          toast.error("ลบสื่อเนื้อหาและรูปภาพไม่สําเร็จ");
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
          }),
        }
      );
      const data = await resData.json();
      if (resData.ok) {
        let id = data.id;
        if (imgUpload) {
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
              toast.error("อัพเดตรูปภาพไม่สําเร็จ");
            }
          } catch (error) {
            toast.error("อัพเดตรูปภาพไม่สําเร็จ");
          }
        }
        document.getElementById("loadingModal").close();
        document.getElementById("newMedia").close();
        toast.success("เพิ่มสื่อเนื้อหาและรูปภาพสําเร็จ");
        clearSelectedUser();
        refreshMediaData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Adjust the threshold as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
    <div className="w-1/4 h-[200px] bg-gradient-to-r from-blue-500 to-sky-400 rounded-md shadow-md p-6 mt-4 max-sm:hidden sm:hidden lg:block">
      <div className="w-full flex flex-col ">
        <button className="btn bg-white w-full text-blue-500 tracking-wider text-lg" onClick={()=> document.getElementById("newMedia").showModal()}>เพิ่มสื่อใหม่</button>
      <div className="space-y-2 mt-4">
          <h1 className="text-lg text-white">ค้นหาสื่อความรู้</h1>
          <input type="search" placeholder="ค้นหาสื่อความรู้" className="input input-bordered w-full max-w-xs" onChange={(e)=> setSearch(e.target.value)}/>
      </div>
      </div>
    </div>
      <div className="lg:grid grid-cols-2 gap-4 p-4  items-center w-3/4 max-sm:flex-wrap max-sm:w-full max-sm:justify-center">
        {media.length > 0 &&
          media.filter((item) => item.title.includes(search)).map((item) => (
            <div
              key={item.id}
              className="lg:w-full  lg:h-full flex flex-col items-center justify-around m-4 p-4 shadow-lg rounded-md drop-shadow-lg max-sm:w-full max-sm:h-1/5 max-sm:justify-center sm:w-full sm:h-1/5 "
            >
              <h1 className="text-lg tracking-normal font-medium">{item.title}</h1>
              <div className="lg:w-full max-sm:w-full">
                <a href={item.url} target="_blank">
                <img
                  src={item.image ? item.image : "/media/uploads/default.png"}
                  className=" rounded-md shadow-sm "
                />
                </a>
               
              </div>
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
                    <button className="btn w-full " onClick={() => handleDelete(item.id)}>
                      <Trash2 />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <dialog id="edit_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setPreview(null);
                clearSelectedUser();
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
                <h1>รูปประกอบ</h1>
                <div className="flex flex-col items-center justify-center space-x-4">
                  {preview ? (
                    <img
                      src={preview}
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                    />
                  ) : (
                    <img
                      src={image ? image : "/media/uploads/default.png"}
                      className=" max-w-2xl rounded-md shadow-md max-sm:w-full sm:w-full"
                    />
                  )}
                  <h1 className="py-2">เลือกรูปภาพใหม่</h1>
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {
                      const src = URL.createObjectURL(e.target.files[0]);
                      setPreview(src);
                      setImgUpload(e.target.files[0]);
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
                setPreview(null);
                clearSelectedUser();
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
      <dialog id="loadingModal" className="modal">
        <div className="modal-box w-auto flex items-center justify-center">
          <span className="loading loading-dots loading-lg bg-blue-500"></span>
        </div>
      </dialog>
      <dialog id="newMedia" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setPreview(null);
                clearSelectedUser();
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
                <h1>ลิ้งค์</h1>
                <input
                  className=" input input-bordered w-4/5 "
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <hr />

              <div className="flex flex-row justify-between py-2">
                <h1>รูปประกอบ</h1>
                <div className="flex flex-col items-center justify-center space-x-4">
                  {preview && (
                    <img
                      src={preview}
                      className="max-w-2xl rounded-md shadow-md max-sm:w-full"
                    />
                  )}
                  <h1 className="py-2">เลือกรูปภาพใหม่</h1>
                  <input
                    type="file"
                    id="imageProfile"
                    onChange={(e) => {
                      const src = URL.createObjectURL(e.target.files[0]);
                      setPreview(src);
                      setImgUpload(e.target.files[0]);
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
                setPreview(null);
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
