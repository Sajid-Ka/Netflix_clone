const Subscription = () => {
    return (
        <div className="flex flex-col items-center gap-4 md:gap-5 py-8 md:py-10 px-4 md:px-0">
            <div className="text-center text-base md:text-lg">
                Ready to watch? Enter your email to create or restart your membership.
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 w-full max-w-2xl">
                <input 
                    className="border border-gray-500 p-4 rounded mr-2 w-full md:w-auto flex-1 bg-black/50 placeholder-gray-400" 
                    type="text" 
                    placeholder="Email address" 
                />
                <button className="bg-red-600 text-white py-3 px-6 rounded text-lg md:text-2xl whitespace-nowrap w-full md:w-auto">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Subscription