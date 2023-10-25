import Client from "pocketbase";
import { useLoaderData } from "react-router-dom"


export const loader = async ({ params, pb }) => {
  return (pb as Client).collection("campaign").getOne(params.id);
}


export const CampaignDetail = () => {
  const data: any = useLoaderData();

  return (
    <div className="flex text-white flex-col justify-start items-start w-full h-full p-2 ">
      <div className="flex justify-between items-center w-full mb-2 ">
        <h1 className="text-2xl font-bold font-Devnagari my-2">{data.title}</h1>

        <div className="flex flex-row drop-shadow-lg   items-baseline  bg-secondary p-2 my-2 rounded-lg justify-between text-base  font-semibold  dark:text-white">
          <span className="relative flex h-3 w-3 mr-2 ">
            {data.status === "Not started" ? (
              <>
                <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </>
            ) : data.status === "Done" ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </>
            )}
          </span>
          {data.status}
        </div>
      </div>

      {data.text != "" ? (
        <div className="text-sm font-medium  bg-secondary rounded-lg p-2 w-full shadow-lg">
          <h1 className="font-semibold ">Message</h1>
          {data.text}
        </div>
      ) : null}

      {data.attactment_type != "text" ? (
        <div className="text-sm font-medium  bg-secondary rounded-lg p-2 my-2 w-full shadow-lg ">
          <h1 className="font-semibold capitalize">{data.attactment_type}</h1>
          {data.attactment_type == "image" ? (
            <>
              <img
                src={`${import.meta.env.VITE_POCKETBASE_URL}/api/files/campaign/${data.id}/${data.attachment}`}
                width={0}
                height={0}
                className="w-20 h-20 mt-2 "
                alt=""
              />
            </>
          ) : (
            <>
              <video controls className="w-full" preload="auto">
                <source
                  src={`${import.meta.env.VITE_POCKETBASE_URL}/api/files/campaign/${data.id}/${data.attachment}`}
                  type="video/mp4"
                />
                {/* You can add additional <source> elements for different video formats */}
                Your browser does not support the video tag.
              </video>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      <h1 className="my-2 text-lg font-bold ">Report</h1>
      <div className="w-full my-2  bg-secondary rounded-lg p-3 flex justify-between items-center">
        <h1 className="text-xs font-medium ">
          Succefully send {data.succefull_contact}
        </h1>
        <h1 className="text-xs font-medium ">
          Failed to send {data.failed_contact}
        </h1>
      </div>
      <ul className="h-full w-full divide-y divide-gray-300 dark:divide-gray-700 px-2">
        {data.to
          .sort(
            (a: any, b: any) =>
              new Date(b.created).getTime() - new Date(a.created).getTime()
          )
          .map((e: any, i: number) => (
            <li key={i} className="pt-3 pb-3 sm:pt-4 sm:pb-4 ">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium  truncate dark:text-white">
                    {e.to}
                  </p>
                  <p className="text-sm text-gray-700 truncate dark:text-gray-400">
                    {`वेळ : ${new Date(e.created).toLocaleTimeString()}`}
                  </p>
                </div>
                <div className="flex flex-row  items-baseline  bg-secondary p-1 rounded-lg justify-between text-base  font-semibold  dark:text-white">
                  <span className="relative flex h-3 w-3 mr-2 ml-2">
                    {e.status === "Successful" ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      </>
                    ) : e.status === "Failed" ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                  {e.status}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
