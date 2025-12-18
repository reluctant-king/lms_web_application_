import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const PurchaseSucccessCard = () => {
    const querry = new URLSearchParams(useLocation().search)
    const reference = querry.get("reference")
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4 shadow-lg animate-bounce">
                        <FaCheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                        Payment Successful!
                    </h1>

                    <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        Thank you for your payment. Your transaction was successful.
                    </p>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">
                            Reference ID
                        </p>
                        <p className="text-xl font-mono font-bold text-gray-800 tracking-wide">
                            {reference}
                        </p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSucccessCard