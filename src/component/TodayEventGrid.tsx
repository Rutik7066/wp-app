import ProgressiveImage from "react-progressive-graceful-image"
import Placeholder from '../assets/8f8f8f.png'
import { NavLink } from "react-router-dom"
import { Root } from "../types/type";

const req = await fetch('https://robo.itraindia.org/server/apknewdesignclient.php?type=alldesignlist');
const data: Root = await req.json();

const TodayEventGrid = () => {
  return (
    <div className="flex flex-col w-full p-2">
      <h1 className="text-white/80 font-bold text-lg mx-2 ">आजचे दिनविषेश</h1>
      <div className="grid grid-cols-3 ">
        {data.todaydesign.map((e, i) => (
          <NavLink to={`/home/${e.eventid}`} className="flex flex-col justify-start items-center" key={i}>
            <ProgressiveImage delay={1000} placeholder={Placeholder} src={`https://robo.itraindia.org/server/events/${e.image}.png`}>
              {(src, loading) => (
                <img className="w-28 h-28  rounded-md " loading="lazy" style={{ opacity: loading ? 0.5 : 1 }} src={src} />
              )}
            </ProgressiveImage>
            <h1 className="m-1 text-white">{e.name}</h1>
          </NavLink>
        ))}
      </div>
    </div>

  )
}
export default TodayEventGrid