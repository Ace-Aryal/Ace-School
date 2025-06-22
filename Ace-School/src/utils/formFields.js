export const getStudentFormFiled = () => {
  return [
    {
      name: "grade",
      label: "Grade",
      type: "select",
      required: true,
      options: [
        { value: "nursery", label: "Nursery" },
        { value: "lkg", label: "LKG" },
        { value: "ukg", label: "UKG" },
        ...Array.from({ length: 10 }, (_, i) => ({
          value: `${i + 1}`,
          label: `Grade ${i + 1}`,
        })),
      ],
    },
    {
      name: "studentName",
      label: "Student Name",
      type: "text",
      required: true,
    },
    {
      name: "admission",
      label: "Admission",
      type: "select",
      required: true,
      options: [
        { value: "old", label: "Old Admission" },
        { value: "new", label: "New Admission" },
      ],
    },
    {
      name: "rollNo",
      label: "Roll Number",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: false,
      isPhoneNumber: true,
    },
    {
      name: "sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "DOB",
      label: "Date of Birth",
      type: "date", // Custom external date picker like NepaliDatePicker
      required: true,
      isExternal: true,
    },
    {
      name: "stream",
      label: "Stream",
      type: "select",
      required: true,
      options: [
        { value: "optional-maths", label: "Optional Maths" },
        { value: "economics", label: "Economics" },
      ],
    },
    {
      name: "guardianName",
      label: "Guardian Name",
      type: "text",
      required: true,
    },
    {
      name: "relation",
      label: "Relation with Guardian",
      type: "select",
      required: true,
      options: [
        { value: "father", label: "Father" },
        { value: "mother", label: "Mother" },
        { value: "family-member", label: "Family Member" },
        { value: "landlord", label: "Landlord" },
        { value: "warden", label: "Warden" },
      ],
    },
    {
      name: "guardianPhone",
      label: "Guardian Phone Number",
      type: "text",
      required: true,
      isPhoneNumber: true,
    },
    {
      name: "hostel",
      label: "Hosteller",
      type: "select",
      required: true,
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
    },
    {
      name: "transportation",
      label: "Transportation Fee",
      type: "number",
      required: false,
    },
    {
      name: "scholarship",
      label: "Scholarship(%)",
      type: "number",
      required: false,
    },
    {
      name: "discount",
      label: "Discount(Nrs)",
      type: "number",
      required: false,
    },
    {
      name: "medicalInfo",
      label: "Medical Info / Complications",
      type: "text",
      required: false,
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "text",
      required: false,
    },
  ];
};
export const getStaffFormField = () => {
  return [
    {
      name: "staffId",
      label: "Staff ID",
      type: "text",
      required: true,
    },
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "number",
      required: true,
      isPhoneNumber: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "DOB",
      label: "Date of Birth",
      type: "date",
      required: true,
      isExternal: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      options: [
        { value: "IT", label: "IT" },
        { value: "Account", label: "Account" },
        { value: "Support", label: "Support" },
        { value: "Maintenance", label: "Maintenance" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
      required: true,
      isExternal: true,
    },
    {
      name: "status",
      label: "Employment Status",
      type: "select",
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "on_leave", label: "On Leave" },
        { value: "resigned", label: "Resigned" },
      ],
    },
  ];
};
