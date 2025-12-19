import React, { useState } from 'react'
import { useEffect } from 'react'
import api from "../../../Utils/api";




export const AllCourseDetail = React.createContext()

export const Context = (props) => {
    const [user, setUser] = useState(null)
    const [courseDetail, seCourseDetail] = useState([])
    const [assignments, setAssignments] = useState([])
    // const [result, setResult] = useState([])
   
    // const [userAnswer, setUserAnswer ]= useState()

    useEffect(() => {
        const token = document.cookie.includes("token=")
        if (!token) return;
        const getMe = async () => {
            let res = await api.get(`/api/v1/me`, { 
                withCredentials: true
            })
            console.log(res);
            if (res.data.success) {
                setUser(res.data.user)
            }

        }
        getMe()
    }, [])

    const sentDataToCheckoutPage = (course) => {
        seCourseDetail(course)

    }


    const assignmentSubmitting = (a) => {
        setAssignments(a)
    }
    // const getQuizResults = (userAnswer) => {
    //     setUserAnswer(userAnswer)



    // }



    return (
        <AllCourseDetail.Provider value={{ user, sentDataToCheckoutPage, setUser, courseDetail, assignmentSubmitting, assignments}}>
            {props.children}
        </AllCourseDetail.Provider>
    )
}

export default Context
