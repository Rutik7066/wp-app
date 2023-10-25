const StatCard = ({  title, value, icon }) => {
    return (
        <div
            className="relative flex flex-col bg-secondary   shadow-black/20 shadow-sm border-none rounded-xl items-start justify-around  p-5"
        >
            <h1 className="text-base  text-white  ">
                {title}
            </h1>
            <h1 className="text-lg  font-bold text-white/80">
                {value}
            </h1>

            {icon}
        </div>
    )
}
export default StatCard;