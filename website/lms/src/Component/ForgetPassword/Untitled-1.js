// if (role === "student") {
//     const student = await studentModal.create({
//         firstname,
//         lastname,
//         email,
//         phone,
//         password: hashedPassword
//     });
// } else if (role === "instructor") {
//     const instructor = await instructorModal.create({
//         firstname,
//         lastname,
//         email,
//         phone,
//         password: hashedPassword,
//         expertise
//     });
// }


// const user = await userModal.create({ firstname, lastname, email, phone, password: hashedPassword, role });

// if (role === "student") {
//     await studentModal.create({ userId: user._id, enrolledCourses: [] });
// } else if (role === "instructor") {
//     await instructorModal.create({ userId: user._id, expertise });
// }
