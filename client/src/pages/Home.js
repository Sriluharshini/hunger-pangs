import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");

    const goToCreateDonation = () => {
        if (isLoggedIn) navigate("/create");
        else navigate("/login");
    };

    const goToDonationList = () => {
        if (isLoggedIn) navigate("/dashboard");
        else navigate("/login");
    };

    return (
        <div className="text-center py-20 px-4">
            <h1 className="text-5xl font-bold text-blue-700 mb-6">
                Connecting Surplus Food to Those in Need
            </h1>

            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
                Hunger Pangs makes it easy to donate surplus food and help eliminate waste.
                Join our mission to create a hunger-free community.
            </p>

            <div className="flex justify-center gap-6">
                <button
                    onClick={goToCreateDonation}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
                >
                    Create Donation
                </button>

                <button
                    onClick={goToDonationList}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
                >
                    View Donations
                </button>
            </div>

            {!isLoggedIn && (
                <p className="mt-8 text-gray-500">
                    Please <Link to="/login" className="text-green-600 underline">log in</Link> to continue.
                </p>
            )}
        </div>
    );
}


// export default function Home() {
//     return (
//         <div
//             className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
//             style={{
//                 backgroundImage:
//                     "url('https://t3.ftcdn.net/jpg/03/48/27/26/360_F_348272608_Z99YZooY3ULkxg6fyJdcPMs9Zwq9yQsN.jpg')",
//             }}
//         >
//             <h1 className="text-5xl font-bold drop-shadow-lg mb-4">
//                 Hunger Pangs
//             </h1>

//             <p className="text-lg mb-8 drop-shadow-md max-w-lg text-center">
//                 Donate food or request food — instantly.
//             </p>

//             <div className="flex gap-6">
//                 <a
//                     href="/login"
//                     className="bg-white text-blue-600 px-6 py-3 text-lg rounded shadow hover:bg-gray-200"
//                 >
//                     View Donation List
//                 </a>
//                 <a
//                     href="/login"
//                     className="bg-blue-600 px-6 py-3 text-lg rounded shadow hover:bg-blue-700"
//                 >
//                     Donate Food
//                 </a>
//             </div>
//         </div>
//     );
// }
