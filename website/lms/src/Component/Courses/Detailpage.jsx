import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AllCourseDetail } from "../AllCourseContext/Context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";


const Detailpage = () => {
  const { sentDataToCheckoutPage, user } = useContext(AllCourseDetail);

  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedBack] = useState("");
  const [message, setMessage] = useState("")
  const [feedbacks, setFeedbacks] = useState([])
  const [enrolled, setEnrolled] = useState(false)
  const [isCourseFree, setIsCourseFree] = useState(false)
  console.log(course)
  console.log(course.courseModules)
  const getCourseDetails = async () => {
    try {
      setLoading(true)
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/get_course/${id}`)
      console.log(res)
      setCourse(res.data.data)
      let getAllFeedbacks = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/get_all_feedback`)
      setFeedbacks(getAllFeedbacks.data.feedbacks)


      let checkEnrollment = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/check_enrollment`, {
        userEmail: user?.email,
        courseId: id
      })

      console.log(checkEnrollment.data)

      if (checkEnrollment.data && checkEnrollment.data.success) {
        setEnrolled(checkEnrollment.data.enrolled);
        console.log(checkEnrollment.data.enrolled);
      } else {
        setEnrolled(false);
      }

      console.log(checkEnrollment)
      console.log(enrolled)



      // console.log(res)

      // console.log(getAllFeedbacks)

    } catch (error) {
      console.error(error);
      setError("Course not found or server error");

    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getCourseDetails()
  }, [id]);

  const handleFeedbak = (e) => {
    setFeedBack(e.target.value)
    // console.log(feedback);

  }

  const handleFeedback = async (courseId) => {

    try {
      setLoading(true)
      if (!courseId) {
        console.error("Course Id not found");
        return;
      }
      const payload = {
        courseId: courseId,
        userEmail: user?.email,
        star: rating,
        feedback: feedback,
        username: `${user?.firstname} ${user?.lastname}`,
        firstname: user?.firstname,
        lastname: user?.lastname,
      }
      let res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/send_feedback`, payload)

      console.log(res)

      if (res.data.success) {
        toast.success(res.data.message)
        setMessage(res.data.message)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false)
      setFeedBack("")
      setRating(0)
    }
  }

  const displayFeedback = feedbacks.filter((f) => f.courseId === id)
  console.log(displayFeedback)

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading course details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">😞</div>
          <p className="text-xl font-semibold text-red-600 mb-2">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <ToastContainer />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-white  bg-opacity-20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                {course.level}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-lg text-purple-100 mb-6">{course.description}</p>


              <div className="flex items-baseline gap-3 mb-6">
                {course.isFree ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : course.pricing?.discount ? (
                  <>
                    <span className="text-4xl font-bold">₹{course.pricing.discount}</span>
                    <span className="text-xl line-through text-purple-500">₹{course.price}</span>
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                      {Math.round(((course.price - course.pricing.discount) / course.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">₹{course.price || "Free"}</span>
                )}
              </div>

              <div className="flex gap-4">

                {enrolled ? (
                  <>
                    <button
                      disabled
                      className="px-8 py-4 bg-gray-200 text-gray-500 rounded-xl font-bold text-lg shadow-lg cursor-not-allowed transition-all duration-200"
                    >
                      ✅ You are enrolled
                    </button>
                    {course.isFree && (
                      <Link to={`/lern/${course._id}`}>
                        <button
                        

                          className="px-8 ms-5 py-4 bg-gray-200 text-purple-600 rounded-xl font-bold text-lg shadow-lg  transition-all duration-200"
                        >
                          Start lerning
                        </button>
                      </Link>
                    )}

                  </>

                ) : (
                  <Link to={`/checkout/${course._id}`}>
                    <button
                      onClick={() => sentDataToCheckoutPage(course)}
                      className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                      Enroll Now
                    </button>
                  </Link>
                )}

                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-4 bg-white bg-opacity-20 text-purple-600 rounded-xl font-bold text-lg backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200"
                >
                  Back
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              {Array.isArray(course.image) ? (
                <img
                  src={course.image[0]}
                  alt={course.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                />
              ) : (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            {course.tags?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Topics Covered</h2>
                <div className="flex flex-wrap gap-3">
                  {course.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold hover:shadow-md transition-shadow cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Course Curriculum</h2>
              </div>

              {course.courseModules?.length > 0 ? (

                <div className="space-y-4">
                  <h2 className="ms-10 text-3xl">Modules</h2>
                  {course.courseModules.map((mod, idx) => (

                    <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                          <span className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm">
                            {idx + 1}
                          </span>
                          {mod.title}
                        </h3>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No modules added yet.</p>
              )}
            </div>


            {Array.isArray(course.image) && course.image.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Course Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {course.image.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Course ${idx + 2}`}
                      className="w-full h-48 object-cover rounded-xl hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>


          <div className="space-y-8">

            {course.instructorDetails && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Instructor</h2>
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={course.instructorDetails?.image}
                      alt={course.instructorDetails.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-purple-100 shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.instructorDetails.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.instructorDetails.bio}</p>

                  {(course.instructorDetails.linkedin || course.instructorDetails.twitter) && (
                    <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
                      {course.instructorDetails.linkedin && (
                        <a
                          href={course.instructorDetails.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {course.instructorDetails.twitter && (
                        <a
                          href={course.instructorDetails.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                          </svg>
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}


            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Course Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  <span>Video Lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Learn at Your Own Pace</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certificate of Completion</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Rate This Course</h3>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg

                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition-colors ${star <= rating ? rating < 4
                      ? "text-yellow-300"
                      : "text-green-400"
                      : "text-gray-300"
                      }`} fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows="4"
                onChange={handleFeedbak}
                placeholder="Share your experience with this course..."
              ></textarea>
              <button
                onClick={() => handleFeedback(course._id)}
                disabled={loading}
                className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
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
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>

              {message && <p className="text-green-500 text-center">{message}</p>}

            </div>





          </div>





          {displayFeedback && displayFeedback.map((f, i) => {
            return (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow min-w-[300px]">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff"
                      alt="Student"
                      className="w-12 h-12 rounded-full border-2 border-yellow-200"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{f.username}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <svg key={index} className={`w-4 h-4 ${index < f.star ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {f.feedback}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">  {new Date(f.createdAt).toLocaleDateString()}</p>
                </div>
              </>
            )
          })}






        </div>
      </div>
    </div>
  );
};

export default Detailpage;









