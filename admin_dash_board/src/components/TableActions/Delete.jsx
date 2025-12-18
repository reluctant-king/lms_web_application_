import axios from 'axios';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const Delete = ({ setDeleteClick, deleteCont, api_end_point, id, onTimeDelete }) => {

    const handleDelete = async () => {
        // console.log("clicked");

        try {
            let res = await axios.delete(`${api_end_point}/${id}`)
            console.log(res);

            if (res.data.success) {
                onTimeDelete()
                toast.success(res.data.message)
                setDeleteClick(false)

            } else {
                toast.error(res.data.message || "Failed to delete user");
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/50"
            />


            <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl">
                <div className="p-6">
                    <ToastContainer />

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirm Delete</h2>
                        <button >
                            <IoMdClose size={24}
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setDeleteClick(false)}

                            />
                        </button>
                    </div>


                    <p className="mt-4 text-gray-600">
                        {deleteCont}
                    </p>


                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={() => setDeleteClick(false)}
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button

                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}

export default Delete
