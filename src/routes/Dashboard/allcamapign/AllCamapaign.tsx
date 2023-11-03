import Client from "pocketbase"
import { NavLink, useLoaderData } from "react-router-dom"


export const loader = async ({ pb }: { pb: Client }) => {
  return pb.collection("campaign").getFullList()
}


export const AllCamapaign = () => {
  const data: any = useLoaderData();
  return (
    <ul className=" m-2  ">
      {data.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map((e, i) => (
        <NavLink key={i} to={`/allcampaign/${e.id}`}>
          <li className="my-1 p-4 flex justify-between items-center text-white border-b border-secondary hover:bg-active/80 ">
            <h1 className="text-white font-bold ">{e.title}</h1>
            <div className="flex flex-row w-32  items-baseline  p-1 rounded-lg justify-between text-base  font-semibold text-gray-900 dark:text-white">
              <span className="relative flex h-3 w-3 mr-2 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              Running
            </div>
          </li>
        </NavLink>
      ))
      }
    </ul>
  )
}
