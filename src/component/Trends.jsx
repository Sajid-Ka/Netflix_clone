import trend1 from "../assets/trending1.webp"
import trend2 from "../assets/trending2.webp"
import trend3 from "../assets/trending3.webp"
import trend4 from "../assets/trending4.webp"
import trend5 from "../assets/trending5.webp"
import trend6 from "../assets/trending6.webp"

const Trends = () => {
    const movies = [
        {
            "id" : 1,
            "url" : trend1
        },
        {
            "id" : 2,
            "url" : trend2
        },
        {
            "id" : 3,
            "url" : trend3
        },
        {
            "id" : 4,
            "url" : trend4
        },
        {
            "id" : 5,
            "url" : trend5
        },
        {
            "id" : 6,
            "url" : trend6
        },
        {
            "id" : 7,
            "url" : trend1
        },
        {
            "id" : 8,
            "url" : trend2
        },
        {
            "id" : 9,
            "url" : trend3
        },
        {
            "id" : 10,
            "url" : trend4
        },
        {
            "id" : 11,
            "url" : trend5
        },
        {
            "id" : 12,
            "url" : trend6
        },
    ]

    return (
        <div className="py-25">
            <div className="font-bold text-2xl">
                Trending Now
            </div>
            <div className="flex gap-10 overflow-x-scroll hide-scrollbar">
                {movies.map((movie,index) => {
                    return (
                        <div key={index} className=" ml-5 pt-5 relative">
                            <img className="rounded-2xl min-w-[180px]" src={movie.url} alt="" />
                            <div className="text-9xl font-bold absolute bottom-0 left-[-25px] text-stroke-white">
                                {movie.id}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Trends