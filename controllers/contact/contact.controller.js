import Contact from "../../models/contact/contact.model.js";

export const contactForm = async (req, res) => {
    const { name, email, message, phone } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            message,
            phone,
        });
        await newContact.save();
        res.status(201).json({
            success: true,
            message: "Contact form submitted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        }); 
    }
}