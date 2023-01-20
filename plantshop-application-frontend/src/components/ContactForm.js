import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
        console.log(formData);
    };

    return (
        <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
            <h2 className="text-lg font-medium mb-4">Contact Us</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className="border border-gray-400 p-2 w-full"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="border border-gray-400 p-2 w-full"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                    Message
                </label>
                <textarea
                    className="border border-gray-400 p-2 w-full"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
                Send
            </button>
        </form>
    );
}

export default ContactForm;