import React from 'react'
import "./Home2.css"

const Home2 = () => {
    return (
        <div className='mt-5'>
            <div className="w-[85%] bg-blue-200 h-[500px] flex mx-auto" style={{position: "relative"}}>
                <img
                    src="https://askproject.net/studdy/wp-content/uploads/sites/43/2021/12/studio-shot-of-cute-thankful-clever-student-feels-RP65PDL-1.png"
                    alt="Student"
                    style={{
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: "420px",
                    zIndex: 2,
                    objectFit: "contain",
                    borderRadius: "32px"
                    }}
                />
                <div className='section_two'>
                    <div>
                        <h2 className='text-5xl text-center first-text'>
                            Providing Amazing Online Courses</h2>
                    </div>
                    <div className='mt-5'>
                        <p className='w-140 leading-normal text-gray-500 second-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus dicta, corporis sint cumque officiis quos repudiandae .</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home2