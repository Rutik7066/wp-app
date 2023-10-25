
import StatCard from "./StatCard";
import CreditIcon from "./icon/CreditIcon";
import TotalContactIcon from "./icon/TotalContactIcon";
import TotalAdvertisment from "./icon/TotalAdvertisment";
import RunningAdvertisment from "./icon/RunningAdvertisment";
import { useRouteLoaderData } from "react-router-dom";




const Stat = () => {

    const data:any = useRouteLoaderData("root");
    console.log(data)

    //TODO:fecth data of user every time so that it will get fresh data
    return (
        <div className="grid grid-cols-2 grid-rows-2 w-full p-2 gap-2">
            <StatCard icon={<CreditIcon />} title={"उपलब्ध क्रेडिट"} value={data.credit } />
            <StatCard icon={<TotalContactIcon />} title={"एकूण संपर्क"} value={data.contacts.length} />
            <StatCard icon={<TotalAdvertisment />} title={"एकूण जाहिराती"} value={data.campaign.length} />
            <StatCard icon={<RunningAdvertisment />} title={"चालू जाहिराती"} value={(data.expand.campaign as []).filter((e:any)=> e.status === "Running").length} />


        </div>
    )
}
export default Stat