import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AdminContext = React.createContext()
export const Context = (props) => {
    let [auth, setAuth] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [schedules, setSchedules] = useState([])
    const [scheduleId, setScheduleId] = useState("")
    const [admin, setAdmin] = useState(null)

    const isAdminLogedIn = (isAuthenticated) => {
        console.log(isAuthenticated);
        setAuth(isAuthenticated)

    }

    const handleShowPopup = (v, id) => {
        setShowPopup(v)
        console.log(id);
        setScheduleId(id)
    }



    const getAllSchedule = async () => {
        let res = await axios.get("https://lms-web-application-backend-e6yj.onrender.com/api/v1/get_all_schedule")
        setSchedules(res.data.schedules)

    }
    useEffect(() => {
        getAllSchedule()
        const token = document.cookie.includes("token=")
        if (!token) return;
        const geAdmin = async () => {
            let res = await axios.get("https://lms-web-application-backend-e6yj.onrender.com/api/v1/getInstitutionAdmin", {
                withCredentials: true
            })
            console.log(res);
            if (res.data.success) {
                setAdmin(res.data.instituteAdmin)
            }

        }
        geAdmin()
    }, [])
    console.log(admin)

    return (
        <AdminContext.Provider value={{ isAdminLogedIn, auth, admin, handleShowPopup, showPopup, setShowPopup, schedules, scheduleId }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default Context