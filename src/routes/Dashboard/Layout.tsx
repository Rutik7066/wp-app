import { Outlet, useNavigate } from "react-router-dom"
import { BottomNavigation } from "../../component/BottomNavigation"
import { useEffect } from "react"
import { AppBar } from "../../component/AppBar";
import Client from "pocketbase";

export const loader = async ({pb}:{pb:Client}) => {
  const user = pb.collection("users").getOne(pb.authStore.model.id,{expand:"campaign"});
  return user

}



export const Layout = () => {
  const nav = useNavigate();
  // TODO: fix this redirect everytime to home issue
  useEffect(() => {
    return nav('/home');
  }, [])
  return (
    <div className=" flex flex-col w-screen min-w-full min-h-screen max-h-screen bg-primary  p-0 m-0">
      {/* App Bar */}
      <AppBar />
      {/* Content */}
      <div className="flex-grow overflow-y-scroll h-full rounded-md">
        <Outlet></Outlet>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}