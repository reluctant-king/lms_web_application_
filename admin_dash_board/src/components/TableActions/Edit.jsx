import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdClose, MdEdit, MdSave } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";


const Edit = ({ field, setShowEditPopup, api_end_point, id, updateInput, reRender }) => {
    let [inputs, setInputs] = useState(updateInput)
    const [message, setmessage] = useState("")
    const preset_key = "arsmfwi7"
    const cloud_name = "dnqlt6cit"
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (files && files.length > 0) {
            setInputs({ ...inputs, [name]: files[0] })
        } else {
            setInputs({ ...inputs, [name]: value })
        }
    }

    const getEditItem = async () => {
        try {
            let res = await axios.get(`${api_end_point}/${id}`)
            console.log(res)
            setInputs(res.data.item || updateInput)
        } catch (error) {
            console.error("Error in getItem:", error);
            setInputs(updateInput);
        }

    }

    useEffect(() => {
        getEditItem()
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let img_url = null;
            let videoUrl = null
            if (inputs.image) {
                const formData = new FormData()
                formData.append("file", inputs.image)
                formData.append("upload_preset", preset_key)

                let response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
                console.log(response);
                img_url = response.data.secure_url;

            }
            if (inputs.video) {
                const formData = new FormData()
                formData.append("file", inputs.video)
                formData.append("upload_preset", preset_key)

                let videoRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, formData)
                console.log(videoRes);
                videoUrl = videoRes.data.secure_url

            }

            const payloads = {
                ...inputs,
                ...(img_url && { image: img_url }),
                ...(videoUrl && { video: videoUrl })
            };

            let res = await axios.put(`${api_end_point}/${id}`, payloads)

            console.log(res)

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: res.data.message || "Changes have been saved successfully.",
                    showConfirmButton: false,
                    timer: 1800,
                });
                if (reRender) {
                    reRender()
                }
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Something went wrong!",
                    text: res.data.message || "Unable to update record.",
                });
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setShowEditPopup(false)
        }
    }
    console.log(inputs)
    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <ToastContainer />
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                            <MdEdit className="text-white text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Edit User</h2>
                    </div>
                    <button
                        onClick={() => setShowEditPopup(false)}
                        className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto space-y-5">
                    {field.map((f) => (
                        <div key={f.name}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{f.label}</label>

                            {f.type === 'checkbox' ? (
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name={f.name}
                                        // checked={!!formData[f.name]}
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded border-gray-300"
                                    />
                                    <span className="text-gray-700">{f.placeholder}</span>
                                </label>
                            ) : f.type === 'select' ? (
                                <select
                                    name={f.name}
                                    // value={formData[f.name] || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">{f.placeholder}</option>
                                    {f.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={f.type || 'text'}
                                    name={f.name}
                                    value={f.type !== "file" ? (inputs[f.name] || "") : undefined}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder={f.placeholder || ''}
                                />
                            )}
                        </div>
                    ))}
                </div>
                {message && <p className='text-green-700 text-center'>{message}</p>}

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        className="px-6 py-2.5 text-gray-700 font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                        onClick={() => setShowEditPopup(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2.5 text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center gap-2 disabled:opacity-70"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            <>
                                <MdSave className="text-xl" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Edit