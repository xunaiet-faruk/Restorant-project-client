import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="max-w-screen-2xl mx-auto mt-32">
            <footer className="grid grid-cols-1 md:grid-cols-2 text-white ">
                {/* Contact Us Section */}
                <div className="bg-gray-800 p-6 md:p-10 text-center space-y-1">
                    <h3 className="text-3xl font-semibold mb-3">CONTACT US</h3>
                    <p className="text-lg">123 ABS Street, Uni 21, Bangladesh</p>
                    <p className="text-lg">+88 123456789</p>
                    <p className="text-lg">Mon - Fri: 08:00 - 22:00</p>
                    <p className="text-lg">Sat - Sun: 10:00 - 23:00</p>
                </div>

                {/* Follow Us Section */}
                <div className="bg-black p-6 md:p-10 text-center">
                    <h3 className="text-3xl font-semibold mb-3">FOLLOW US</h3>
                    <p className="mb-4">Join us on social media</p>
                    <div className="flex justify-center gap-4">
                        <FaFacebookF className="text-2xl" />
                        <FaInstagram className="text-2xl" />
                        <FaYoutube className="text-2xl" />

                    </div>
                </div>

                
            </footer>
            <div className="bg-black p-2">
                <h1 className=" text-center text-sm text-gray-300 ">Copyright © CulinaryCloud. All rights reserved.</h1>
            </div>
       </div>
    );
};

export default Footer;
