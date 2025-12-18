// import React, { useState, useEffect } from "react";

// const MediaForm = ({ data, updateData }) => {
//   const [previews, setPreviews] = useState({ images: [], docs: [], trailer: null });

//   const handleChange = (e, type) => {
//     const { files } = e.target;
//     if (!files || files.length === 0) return;

//     if (type === "images" || type === "docs") {
//       const fileArray = Array.from(files);
//       updateData("media", { ...data.media, [type]: fileArray });

//       if (type === "images") {
//         const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
//         setPreviews((prev) => ({ ...prev, images: imagePreviews }));
//       } else {
//         setPreviews((prev) => ({ ...prev, docs: fileArray }));
//       }
//     } else {
//       // Single file (trailer)
//       updateData("media", { ...data.media, [type]: files[0] });
//       setPreviews((prev) => ({ ...prev, trailer: URL.createObjectURL(files[0]) }));
//     }
//   };

//   // Clean up object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       previews.images.forEach((url) => URL.revokeObjectURL(url));
//       if (previews.trailer) URL.revokeObjectURL(previews.trailer);
//     };
//   }, [previews]);

//   return (
//     <section>
//       <h3 className="text-lg font-semibold mb-3">D. Media / Resources</h3>
//       <div className="space-y-3">
//         <div>
//           <label className="block mb-1">Images:</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => handleChange(e, "images")}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Documents:</label>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => handleChange(e, "docs")}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Trailer:</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => handleChange(e, "trailer")}
//             className="w-full border p-2 rounded"
//           />
//          </div>
//       </div>
//     </section>
//   );
// };

// export default MediaForm;

