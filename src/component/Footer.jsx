const Footer = () => {
    return (
        <div className="pb-10 md:pb-20 text-[14px] md:text-[16px] text-gray-400 px-4 md:px-0">
            <div className="underline">
                <div className="mb-8 md:mb-10 text-center md:text-left">
                    Questions? Call 000-800-919-1743
                </div>
                <div className="grid grid-cols-2 md:flex md:justify-between gap-4 md:gap-0">
                    <div className="w-full md:w-[200px] list-none space-y-2 md:space-y-0">
                        <li className="cursor-pointer hover:text-white">FAQ</li>
                        <li className="cursor-pointer hover:text-white">Investor Relations</li>
                        <li className="cursor-pointer hover:text-white">Privacy</li>
                        <li className="cursor-pointer hover:text-white">Speed Test</li>
                    </div>
                    <div className="w-full md:w-[200px] list-none space-y-2 md:space-y-0">
                        <li className="cursor-pointer hover:text-white">Help Centre</li>
                        <li className="cursor-pointer hover:text-white">Jobs</li>
                        <li className="cursor-pointer hover:text-white">Cookie Preferences</li>
                        <li className="cursor-pointer hover:text-white">Legal Notices</li>
                    </div>
                    <div className="w-full md:w-[200px] list-none space-y-2 md:space-y-0">
                        <li className="cursor-pointer hover:text-white">Account</li>
                        <li className="cursor-pointer hover:text-white">Ways to Watch</li>
                        <li className="cursor-pointer hover:text-white">Corporate Information</li>
                        <li className="cursor-pointer hover:text-white">Only on Netflix</li>
                    </div>
                    <div className="w-full md:w-[200px] list-none space-y-2 md:space-y-0">
                        <li className="cursor-pointer hover:text-white">Media Centre</li>
                        <li className="cursor-pointer hover:text-white">Terms of Use</li>
                        <li className="cursor-pointer hover:text-white">Contact Us</li>
                    </div>
                </div>

                <div className="mt-6 md:mt-0">
                    <select className="text-white bg-transparent border border-gray-500 py-2 px-4 pr-20 my-5 rounded w-full md:w-auto" name="" id="">
                        <option className="text-black" value="English">English</option>
                        <option className="text-black" value="Arabic">Arabic</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="mt-8 md:mt-10">
                    <div className="mb-2">
                        Netflix India
                    </div>
                    <div className="text-[12px]">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <span className="text-blue-500 underline cursor-pointer">Learn more.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer