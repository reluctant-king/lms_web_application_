import React, { useContext } from 'react'
import { AdminContext } from '../AdminContext/Context'

const SchedulePopup = () => {
    const { setShowPopup, schedules, scheduleId } = useContext(AdminContext)
    console.log(schedules);

    const scheculeDetails = schedules.filter((s) => s._id === scheduleId)
    console.log(scheculeDetails);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-[95%] max-w-lg text-center transform transition-all scale-100 animate-fadeIn border border-gray-100n">
              
                <div className="mb-4 flex justify-center">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                        ✅
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Course Schedule details!
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                    Below are the details of the newly created schedule.
                </p>

               
                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 border border-gray-200">
                    {scheculeDetails && scheculeDetails.map((s, i) => {
                        return (
                            <div key={i} className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
                                <p><span className="font-semibold text-gray-900">Batch:</span> {s.batch}</p>
                                <p><span className="font-semibold text-gray-900">Course:</span> {s.course}</p>
                                <p><span className="font-semibold text-gray-900">Instructor:</span>{s.instructor}</p>
                                <p><span className="font-semibold text-gray-900">Days:</span>{s.days}</p>
                                <p><span className="font-semibold text-gray-900">Start Time:</span> {s.startTime}</p>
                                <p><span className="font-semibold text-gray-900">End Time:</span>  {s.endTime}</p>
                                <p><span className="font-semibold text-gray-900">Start Date:</span> {s.startDate}</p>
                                <p><span className="font-semibold text-gray-900">End Date:</span> end {s.endDate}</p>
                                <p><span className="font-semibold text-gray-900">Session Type:</span> session type</p>
                                <p><span className="font-semibold text-gray-900">Location:</span> {s.location}</p>
                                <p><span className="font-semibold text-gray-900">Status:</span>
                                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold 
              ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                        {s.status || "-"}
                                    </span>
                                </p>
                                <p className="col-span-2"><span className="font-semibold text-gray-900">Notes:</span> {s.description}</p>
                            </div>
                        )
                    })}

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SchedulePopup