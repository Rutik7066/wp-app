import TodayEventGrid from "../../../component/TodayEventGrid"
import Stat from "../../../component/Stat"
import { Suspense } from "react"
import Skeleton from "../../../component/Skeleton"
import UpcommingEventGrid from "../../../component/UpcommingEventGrid"
import { NavLink, useRouteLoaderData } from "react-router-dom"

const Home = () => {

  // TODO: contact page add remove update delete  




  const data: any = useRouteLoaderData("root")

  return (
    <>
      <Stat />
      {/* Show only when show_day Running Campaign List & Day event  */}
      {data.show_day &&
        <>
          {data.expand &&
            <div className="flex flex-col w-full p-2 ">
              <div className="flex justify-between  items-center">
                <h1 className="text-white/80 font-bold text-lg mx-2">चालू जाहिरात</h1>
                <NavLink to='/allcampaign' className='text-white bg-active rounded-lg  text-sm p-2 mx-2'>सर्व जाहिरात पहा</NavLink>
              </div>
              <ul className="w-full my-2">
                {data.expand.campaign.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map((e, i) => e.status === "Running" && (
                  <NavLink key={i} to={`/allcampaign/${e.id}`}>
                    <li className="my-1 p-4 flex justify-between items-center text-white border-b border-secondary hover:bg-active/80 ">
                      <h1 className="text-white font-bold ">{e.title}</h1>
                      <div className="flex flex-row w-32  items-baseline  p-1 rounded-lg justify-between text-base  font-semibold text-gray-900 dark:text-white">
                        <span className="relative flex h-3 w-3 mr-2 ml-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                        {e.status}
                      </div>
                    </li>
                  </NavLink>
                ))
                }
              </ul>
            </div>
          }
          <Suspense key={"DaySpecial"} fallback={<Skeleton />}>
            <TodayEventGrid />
          </Suspense><Suspense key={"UpcommingDaySpecial"} fallback={<Skeleton />}>
            <UpcommingEventGrid />
          </Suspense>
        </>
      }
      {/* end */}
      
      {/* When show_day is off show all campaign  */}
      {data.expand && <>
        <div className="flex flex-col w-full p-2 ">
          <div className="flex justify-between  items-center">
            <h1 className="text-white/80 font-bold text-lg mx-2">चालू जाहिरात</h1>
          </div>
          <ul className="w-full my-2">
            {data.expand.campaign.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()). map((e, i) => (
              <NavLink key={i} to={`/allcampaign/${e.id}`}>
                <li className="my-1 p-4 flex justify-between items-center text-white border-b border-secondary hover:bg-active/80 ">
                  <h1 className="text-white font-bold ">{e.title}</h1>
                  <div className="flex flex-row w-32  items-baseline  p-1 rounded-lg justify-between text-base  font-semibold text-gray-900 dark:text-white">
                    <span className="relative flex h-3 w-3 mr-2 ml-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    {e.status}
                  </div>
                </li>
              </NavLink>
            ))
            }
          </ul>
        </div>
      </>}
      {/* end */}
    </>
  )
}
export default Home