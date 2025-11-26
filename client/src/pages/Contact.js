export default function Contact() {
    return (
        <div className="max-w-lg mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-6 text-blue-700">Contact Us</h1>

            <form className="space-y-5">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border p-3 rounded focus:outline-blue-600"
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border p-3 rounded focus:outline-blue-600"
                />

                <textarea
                    placeholder="Your Message"
                    className="w-full border p-3 rounded h-32 focus:outline-blue-600"
                />

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    Send Message
                </button>

                <p className="text-center text-gray-600 text-sm mt-2">
                    Our team will contact you within one business day.
                </p>
            </form>
        </div>
    );
}
