import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="bg-black w-full lg:px-50 md:px-10 py-16 text-white">
            {/* Breadcrumb Header */}
            <div className="mb-10 text-2xl sm:text-3xl font-bold text-[#db3c3a] flex items-center gap-2">
                <span data-aos="fade-down" data-aos-delay="100">Home</span>
                <span data-aos="fade-down" data-aos-delay="150">/</span>
                <span data-aos="fade-down" data-aos-delay="200">Contact</span>
            </div>

            <div className="flex h-full flex-col md:flex-row items-center justify-center gap-10">
                {/* Car Image */}
                <div data-aos="fade-right" className="w-full md:w-1/2">
                    <img
                        src="https://wallpapercave.com/wp/wp14203023.jpg"
                        alt="BMW M3 GTR"
                        className="rounded-xl shadow-md w-full h-135 object-cover"
                    />
                </div>

                {/* Contact Form */}
                <div
                    data-aos="fade-left"
                    className="w-full md:w-1/2 p-6 rounded-xl bg-gray-800/40 backdrop-blur-md shadow-lg border border-gray-700 space-y-6"
                >
                    <h2 className="text-3xl font-bold text-blue-400">Get in Touch</h2>
                    <p className="text-sm text-gray-300">
                        Have a question about the BMW M3 GTR? Drop us a message below!
                    </p>

                    <form className="space-y-5">
                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                required
                                className="peer h-14 w-full px-4 text-white bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=" "
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-2 text-sm text-rose-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-rose-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-rose-600"
                            >
                                Your Name
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                required
                                className="peer w-full px-4 pt-6 pb-2 text-white bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
                            >
                                Your Email
                            </label>
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <textarea
                                id="message"
                                rows="4"
                                required
                                className="peer w-full px-4 pt-6 pb-2 text-white bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=" "
                            ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
                            >
                                Your Message
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold shadow-lg"
                            data-aos="zoom-in"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="pt-4 text-sm text-gray-400">
                        <p><strong>📍 Address:</strong> Speed Garage, Rajkot, Gujarat</p>
                        <p><strong>📧 Email:</strong> m3gtr@bmwmotors.com</p>
                        <p><strong>📞 Phone:</strong> +91 98765 43210</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;