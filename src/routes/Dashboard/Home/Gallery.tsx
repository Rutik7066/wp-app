import {  NavLink, useLoaderData } from "react-router-dom";
import { UpcomingdesignGallery } from "../../../types/type";
import ProgressiveImage from "react-progressive-graceful-image";
import Placeholder from '../../../assets/8f8f8f.png'


export const loader = async ({ params }) => {
  console.log("loader called param is" , params.id)
  console.log(params)

  const req = await fetch(`https://robo.itraindia.org/server/apknewdesignclient.php?type=specialdays&id=${params.id}`)
  const data: UpcomingdesignGallery[] = await req.json();
  console.log(JSON.stringify(data,null,2));
  return data ;
}

export const Gallery = () => {

  const data:any= useLoaderData()

  return (
    <div className="grid grid-cols-3 ">
      
        {data.map((e:UpcomingdesignGallery, i) => (
          <NavLink to={`/campaign?src=${e.image}`} className="flex flex-col justify-start items-center" key={i}>
            <ProgressiveImage delay={1000} placeholder={Placeholder} src={`https://robo.itraindia.org/server/images/${e.image}`}>
              {(src, loading) => (
                <img className="w-28 h-28  rounded-md " loading="lazy" style={{ opacity: loading ? 0.5 : 1 }} src={src} />
              )}
            </ProgressiveImage>
            <h1 className="m-1 text-white">{e.name}</h1>
          </NavLink>
        ))}
      </div>
  )
}