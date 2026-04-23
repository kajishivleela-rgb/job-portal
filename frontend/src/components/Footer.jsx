import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-10">
            <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">

                {/* Logo / About */}
                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                    <p className="mt-3 text-sm text-gray-400">
                        Find your dream job or hire the best talent with ease.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Jobs</li>
                        <li className="hover:text-white cursor-pointer">Browse</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Contact</h2>
                    <p className="text-gray-400 text-sm">Email: support@jobportal.com</p>
                    <p className="text-gray-400 text-sm">Phone: +91 9876543210</p>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
                © 2026 JobPortal. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer