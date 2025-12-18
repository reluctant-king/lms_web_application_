const express = require("express");
const { addInstitution, loginInstitute,getAllInstitutionProfile, getAllInstitute, updateStatus, getInstituteAdmin, getInstitute, updateInstitutionProfile } = require("../Controllers/institutionController");
const { instiAuthToken } = require("../middleware/jwtInstitutionAuth");
const router = express.Router();

router.post("/add_institition", addInstitution)
router.get("/get_all_institution", getAllInstitute)
router.put("/update_status/:id", updateStatus)
router.post("/login_institute", loginInstitute)

// router.post("/add_institution_profile", institutionProfile)
router.get("/get_profile_details", instiAuthToken, getAllInstitutionProfile)
// router.route("/get_institute/:id").get(getInstitute).put(updataeInstitutionDetails)
router.route("/get_institute/:id").get(getInstitute).put(updateInstitutionProfile)
router.get("/getInstitutionAdmin", instiAuthToken, getInstituteAdmin)


module.exports = router