import banner from "../assets/bannerbg.jpg"

const Navbar = () => {
    return (
        <div className="px-30 py-5 bg-black bg-cover text-white z-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{backgroundImage: `url(${banner})`}}>

            </div>
            <div className="relative z-0">
                <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold text-red-600">
                        NETFLIX
                    </div>

                    <div className="flex">
                        <div>

                            <select className="pr-12 border p-1 mr-2 border-gray-500" name="" id="">
                                <option className="text-black" value="English">English</option>
                                <option className="text-black" value="Arabic">Arabic</option>
                            </select>

                            {/* Language Image */}
                            {/* <svg
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-hidden="true"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
                                    fill="currentColor"
                                />
                            </svg> */}

                        </div>
                        <button className="bg-red-600 px-5 py-1 rounded">Sign In</button>
                    </div>
                </div>

                <div className="py-30 flex flex-col items-center">
                    <div className="text-6xl font-bold w-160 text-center">
                        Unlimited movies, TV shows and more
                    </div>
                    <div className="py-5 font-bold text-xl">
                        Starts at ₹149. Cancel at any time.
                    </div>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <div className="py-5 flex">
                        <input className="border p-4 border-gray-500 pr-40 mr-5 rounded" type="text" placeholder="Email address" />
                        <button className="bg-red-600 p-4 rounded font-bold px-7 pr-18 text-xl">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar