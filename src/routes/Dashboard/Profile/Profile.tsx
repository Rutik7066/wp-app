import { useNavigate, useRouteLoaderData } from "react-router-dom"
import logo from '../../../assets/8f8f8f.png'
import ProgressiveImage from "react-progressive-graceful-image";
import { useState } from "react";
import { usePocketBase } from "../../../context/PocketbaseProvider";


const Profile = () => {
  const { pb } = usePocketBase();
  const nav = useNavigate();

  const data: any = useRouteLoaderData("root");
  const [Isrc, setIsrc] = useState(`${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${data.id}/${data.avatar}?thumb=100x100`)

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4 text-white p-4 ">
      <ProgressiveImage placeholder={logo} src={Isrc} onError={() => setIsrc(logo)}>
        {(src) =>
          <img
            src={src}
            width={0}
            height={0}
            className="w-36 h-36 rounded-full m-2"
            alt=""
          />
        }
      </ProgressiveImage>
      <h1 className="text-xl font-bold mb-1">{data.name}</h1>

      <h1 className="text-xl font-bold mb-1">Valid till : {new Date(data.validity).toDateString()}</h1>
      <h1 className="flex text-sm font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 mr-2 ml-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
        {data.contact} , {data.waNumber}
      </h1>
      <h1 className="flex text-sm font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 mr-2 ml-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        {"Available Credit : " + data.credit}
      </h1>


      <button onClick={() => {
        pb.authStore.clear();
        nav("/")
      }} className="bg-secondary border p-3 rounded-lg hover:bg-active">
        Log out
      </button>
    </div>
  )
}
export default Profile