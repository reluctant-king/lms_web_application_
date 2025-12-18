import React from 'react'
import "./Home1.css"

const Home1 = () => {
    return (
        <div className="bg-[#f6f9ff] min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-5 py-16 flex flex-col md:flex-row items-center justify-between gap-7 relative">
                
                {/* Left section */}
                <div className="md:w-1/2 flex flex-col items-start justify-center">
                    <span className="flex items-center text-green-600 font-semibold mb-4 text-lg">
                        <svg width="20" height="20" fill="none" className="mr-2">
                            <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2" />
                            <path d="M8 10.5l2 2 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Get 30% off on first enroll
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Advance your<br />engineering skills<br />with us.
                    </h1>
                    <p className="text-lg text-gray-500 mb-8">
                        Build skills with our courses and mentor from world-class companies.
                    </p>
                    {/* Search Bar */}
                    <div className="w-full max-w-xl mb-7 rounded-full flex overflow-hidden shadow-xl bg-white">
                        <input
                            type="text"
                            placeholder="search courses..."
                            className="px-6 py-4 w-full text-lg text-gray-700 focus:outline-none bg-white"
                        />
                        <button className="bg-[#5f4fff] px-6 py-4 text-white font-bold text-lg flex items-center">
                            <svg width="24" height="24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                                <path d="M21 21l-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    {/* Features */}
                    <div className="flex gap-8 mt-2 text-[#2563eb] font-semibold text-lg">
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Flexible
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Learning path
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" /><path d="M8.5 11.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" /></svg>
                            Community
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <div className="md:w-1/2 flex items-center justify-center relative">
                    <img
                        src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/positive-caucasian-girl-with-charming-smile-wears-GKMGX34@025x-1.png"
                        alt="Hero"
                        className="object-cover h-[430px] w-auto drop-shadow-xl"
                    />
                    {/* Info cards */}
                    <div className="absolute left-2 bottom-28 bg-white shadow-lg rounded-xl px-5 py-3 flex items-center gap-3">
                        <span className="inline-block bg-indigo-100 rounded-full px-2 py-1 text-indigo-600 text-sm font-bold">K</span>
                        <span className="font-medium text-gray-700 text-base">50+ Available courses</span>
                    </div>
                    <div className="absolute right-7 top-12 bg-white shadow-lg rounded-xl px-7 py-6">
                        <span className="block text-sm text-gray-500 mb-2">No of students</span>
                        <div className="flex space-x-2 items-end">
                            <div className="w-2 h-3 bg-[#38bdf8] rounded-sm"/>
                            <div className="w-2 h-7 bg-[#4ade80] rounded-sm"/>
                            <div className="w-2 h-10 bg-[#f59e42] rounded-sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home1

