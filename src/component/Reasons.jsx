import { LuMonitor } from "react-icons/lu";
import { MdDownloadForOffline } from "react-icons/md";
import { GoTelescope } from "react-icons/go";
import { LiaSmile } from "react-icons/lia";

const Reasons = () => {

    const reasons = [
        {
            "title" : "Enjoy on your TV",
            "detail" : "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
            "icon" : <LuMonitor />
        },
        {
            "title" : "Download your shows to watch offline",
            "detail" : "Save your favourites easily and always have something to watch.",
            "icon" : <MdDownloadForOffline />
        },
        {
            "title" : "Watch everywhere",
            "detail" : "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
            "icon" : <GoTelescope />
        },
        {
            "title" : "Create profiles for kids",
            "detail" : "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
            "icon" : <LiaSmile />
        }
    ]

    return (
        <div className="mt-5 px-4 md:px-0">
            <div className="font-bold text-xl md:text-2xl mb-5 text-center md:text-left">
                More reasons to join
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {reasons.map((reason,index) => {
                    return(
                        <div key={index} className="w-full h-[200px] md:h-[320px] p-4 md:p-5 rounded-2xl bg-gradient-to-b from-blue-950 to-gray-900 relative hover:scale-105 transition-transform duration-300">
                            <div className="font-bold text-lg md:text-[22px]">
                                {reason.title}
                            </div>
                            <div className="py-3 md:py-5 text-gray-400 text-sm md:text-[16px]">
                                {reason.detail}
                            </div>
                            <div className="text-5xl md:text-7xl right-0 mr-4 md:mr-10 absolute opacity-60 bottom-0 mb-4 md:mb-5">
                                {reason.icon}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Reasons