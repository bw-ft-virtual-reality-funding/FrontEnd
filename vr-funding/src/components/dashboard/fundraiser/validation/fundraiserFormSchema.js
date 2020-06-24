import * as Yup from 'yup'

const fundraiserFormSchema = Yup.object().shape({
    title: Yup
        .string()
        .min(5, "Fundraiser name must be at least 5 characters long.")
        .required("Fundraiser name is required"),
    description: Yup
        .string()
        .min(5, "A description of the fundraiser is required")
        .required("A description is required"),
    img_url: Yup
        .string()
        .url("Must use a valid Url: http://www.example.com")
        // .required("Must include a Url")
})

export default fundraiserFormSchema