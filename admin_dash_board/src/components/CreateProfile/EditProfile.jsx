import React from 'react'

const EditProfile = () => {
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const onCancel = () => {

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
                        Edit Institute Profile
                    </h1>
                    <p className="text-gray-600 text-lg">Update your institution's information</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Logo Upload Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-violet-100">
                        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">1</span>
                                Institute Logo
                            </h2>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col items-center">
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-violet-500 transition-colors w-full">
                                    <label className="cursor-pointer">
                                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 mb-1">Click to upload institute logo</p>
                                        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-violet-100">
                        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">2</span>
                                Basic Information
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Institute Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Institute Name
                                </label>
                                <input
                                    type="text"
                                    name="instituteName"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                                    placeholder="Enter institute name"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors resize-none"
                                    placeholder="Enter complete address..."
                                />
                            </div>

                            {/* Email & Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                                        placeholder="institute@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Website & GSTIN Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        name="website"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                                        placeholder="https://www.example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        GSTIN
                                    </label>
                                    <input
                                        type="text"
                                        name="gstin"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors"
                                        placeholder="Enter GSTIN number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Information Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-violet-100">
                        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">3</span>
                                Academic Information
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Founded & Courses Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Founded
                                    </label>
                                    <input
                                        type="text"
                                        name="founded"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:outline-none transition-colors"
                                        placeholder="e.g., 1990"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Courses Offered
                                    </label>
                                    <input
                                        type="text"
                                        name="courses"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:outline-none transition-colors"
                                        placeholder="e.g., B.Tech, MBA, M.Tech"
                                    />
                                </div>
                            </div>

                            {/* Student Strength & Placement Rate Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Student Strength
                                    </label>
                                    <input
                                        type="text"
                                        name="students"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:outline-none transition-colors"
                                        placeholder="e.g., 5000+"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Placement Rate
                                    </label>
                                    <input
                                        type="text"
                                        name="placement"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:outline-none transition-colors"
                                        placeholder="e.g., 95%"
                                    />
                                </div>
                            </div>

                            {/* Facilities */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Facilities
                                </label>
                                <input
                                    type="text"
                                    name="facilities"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-fuchsia-500 focus:outline-none transition-colors"
                                    placeholder="e.g., Library, Labs, Hostel, Sports Complex"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:from-violet-700 hover:to-fuchsia-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
