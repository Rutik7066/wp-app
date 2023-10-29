import React, { useEffect, useState } from "react";
import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { usePocketBase } from "../../../context/PocketbaseProvider";
import Toast from "../../../component/Toast";

//https://robo.itraindia.org/server/images/${e.image}
// get data upload to pb
// get is of pb record 
// send id to job
// get response and show ui 


const Campaign = () => {
  const user:any = useRouteLoaderData("root");

  const { pb } = usePocketBase();

  const [searchParams, _] = useSearchParams();

  const [title, setTitle] = useState('');

  const [message, setMessage] = useState('');

  const [FileSrc, setFileSrc] = useState('');
  const [campType, setcampType] = useState('text'); // New state variable for file type
  let file:File; 



  const [state, setState] = useState(4);

  const [stateMessage, setStateMessage] = useState('');


  let name: string;

  useEffect(() => {
    const src = searchParams.get("src");
    if (src) {
      name = searchParams.get("src").split(".")[0];
      setFileSrc(`https://robo.itraindia.org/server/images/${src}`)
    }
  }, [])


 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        if (
          (selectedFile.type === 'image/jpg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png' || selectedFile.type === 'video/mp4') &&
          selectedFile.size <= 25 * 1024 * 1024
        ) {
          file = selectedFile;
          setcampType(selectedFile.type.split("/")[0]); // Set the file type
          const reader = new FileReader();
          reader.onload = (event) => {
            setFileSrc(event.target.result as string);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setState(3)
          setStateMessage('Please select a JPG, PNG, or Video less than 25 MB.');
          setFileSrc(''); // Clear the image source
          setTimeout(() => {
            setMessage("")
            setState(4)
          }, 2000);

        }
      }
    }
  }

  const handleSubmit = async () => {
    setState(0)
    try {
      const formData = new FormData();
      const data = {
        "user": user.id,
        "title": title,
        "sheduled_at": new Date().toUTCString(),
        "status": "Not Started",
        "attactment_type": campType,
        "selected_contact": user.contacts.length,
        "succefull_contact": 0,
        "failed_contact": 0,
        "to": JSON.stringify([]),
        "text": message
      };
      for (const ele in data) {
        console.debug(ele, data[ele]);
        formData.append(ele, data[ele] as string | Blob);
      }
      if (campType === "image" || campType === "video") {
        formData.append('attachment', file);
      }
      const record = await pb.collection('campaign').create(data);
      user.campaign = [...user.campaign, record.id];
    await pb.collection("users").update(user.id,user)
      console.debug(record.id)
      const req = await fetch(`https://disgusting-trouble-production.up.railway.app/start?id=${record.id}&type=${campType}`)
      const res = await req.text();
      console.log(JSON.stringify(res, null, 2));
      console.log(req.status);
      setStateMessage(req.status == 200 ? "Campaign started" : "Failed to start campaign.")
      setState(req.status == 200 ? 1 : 2)
      setTimeout(() => {
        setMessage("")
        setState(4)
      }, 2000);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      setStateMessage('Something went wrong')
      setState(2)
      setTimeout(() => {
        setMessage("")
        setState(4)
      }, 2000);
    }
  }

  return (
    <div className="flex p-3 flex-col w-full h-full justify-start items-center">
      <Toast message={stateMessage} state={state} />
      <div className="flex flex-col justify-start items-start w-full py-3">
        <h1 className="text-white m-1">जाहिरातीचे नाव</h1>
        <input name="title" type="text" required onChange={(e) => setTitle(e.target.value)} placeholder="जाहिरातीचे नाव टाका" className="text-white bg-secondary rounded-md border border-secondary p-3 w-full" />
      </div>
      <div className="flex flex-col justify-start items-start w-full pb-3 ">
        <h1 className="text-white m-1">मॅसेज</h1>
        <textarea name='message' required onChange={(e) => setMessage(e.target.value)} placeholder="मॅसेज टाइप करा" className="text-white bg-secondary rounded-md border border-secondary h-32 p-2 w-full" />

      </div>
      {
        FileSrc ? (
          <div className="flex flex-row justify-center items-center p-3  w-full h-32 rounded-md bg-active/5  outline-2   outline-dotted outline-active ">
            <img src={FileSrc} className="rounded-md h-full" />
            <div className=" flex flex-col ml-2 p-0  w-full h-full justify-between items-center">
              <h1 className=" text-white text-lg my-3">{name}</h1>
              <div className="flex justify-between items-center w-full  gap-x-2">
                <button className="relative bg-secondary border border-active text-white p-2 rounded-md   w-full">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="absolute top-0 right-0 w-full h-full opacity-0"
                    onChange={handleImageChange}
                  />
                  फोटो बदला
                </button>
                <button onClick={() => setFileSrc("")} className="bg-active text-white p-2 rounded-md  w-full">
                  फोटो काढा
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col justify-center items-center w-full h-32 rounded-md bg-active/5  outline-2   outline-dotted outline-active ">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="absolute top-0 right-0 w-full h-full opacity-0"
              onChange={handleImageChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h1 className="text-white text-lg font-bold my-2">फोटो निवडा</h1>
          </div>
        )
      }

      <button type="submit" onClick={handleSubmit} className="bg-active text-white p-3 rounded-md w-full mt-4">जाहिरात सुरू करा</button>
    </div>
  )
}
export default Campaign