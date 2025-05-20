export const useStudentFormFields = () => {
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
                    value: `grade-${i + 1}`,
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
            name: "rollNo",
            label: "Roll Number",
            type: "number",
            required: true,
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            type: "number",
            required: false,
            isPhoneNumber: true
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
            type: "number",
            required: true,
            isPhoneNumber: true
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
}