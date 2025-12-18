import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const CreateProfile = () => {
    const preset_key = "arsmfwi7"
    const cloud_name = "dnqlt6cit"
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [inputes, setInputs] = useState({
        image: null,
        instituteName: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        gstin: "",
        accreditation: "",
        founded: "",
        courses: "",
        students: "",
        placement: "",
        facilities: ""
    })
    const handleInput = (e) => {
        console.log(e.target.files);

        const { name, files, value } = e.target
        if (files && files.length > 0) {
            setInputs({ ...inputes, [name]: files[0] })
        } else {
            setInputs({ ...inputes, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let imgUrl = null

            const formData = new FormData()
            formData.append("file", inputes.image)
            formData.append("upload_preset", preset_key)

            let img_res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)

            console.log(img_res);

            imgUrl = img_res.data.secure_url

            let payload = {
                image: imgUrl,
                instituteName: inputes.instituteName,
                address: inputes.address,
                email: inputes.email,
                phone: inputes.phone,
                website: inputes.website,
                gstin: inputes.gstin,
                accreditation: inputes.accreditation,
                founded: inputes.founded,
                courses: inputes.courses,
                students: inputes.students,
                placement: inputes.placement,
                facilities: inputes.facilities
            }

            let res = await axios.post("https://lms-web-application-backend-ymjf.onrender.com/add_institution_profile", payload)
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message)
                new Promise((back) => setTimeout(back, 2000))
                navigate("/my_profile")
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <ToastContainer />
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create Institute Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Logo (Upload)
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="block w-full border border-gray-300 rounded-lg p-2"
                            onChange={handleInput}
                        />

                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Institute Name
                        </label>
                        <input
                            type="text"
                            name="instituteName"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter institute name"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Address</label>
                        <textarea
                            name="address"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            rows="3"
                            placeholder="Enter full address"
                            onChange={handleInput}

                        ></textarea>
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter email"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter phone number"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Website</label>
                        <input
                            type="text"
                            name="website"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter website URL"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            GSTIN / Registration Number (optional)
                        </label>
                        <input
                            type="text"
                            name="gstin"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter GSTIN / Registration number"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Accreditation / Approval Status
                        </label>
                        <input
                            type="text"
                            name="accreditation"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., AICTE, NAAC A+, etc."
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Founded</label>
                        <input
                            type="text"
                            name="founded"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., 2001"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Courses Offered
                        </label>
                        <input
                            type="text"
                            name="courses"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., Engineering, Management, IT"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Student Strength
                        </label>
                        <input
                            type="text"
                            name="students"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., 2000+"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Placement Rate
                        </label>
                        <input
                            type="text"
                            name="placement"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., 90%"
                            onChange={handleInput}

                        />
                    </div>


                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Facilities
                        </label>
                        <input
                            type="text"
                            name="facilities"
                            className="w-full border border-gray-300 rounded-lg p-2"
                            placeholder="e.g., Library, Labs, Hostel, Sports Complex"
                            onChange={handleInput}

                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                        >
                            {loading && (
                                <div className="w-5 h-5 mr-2 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProfile
