import React, { useEffect } from 'react';
import About1 from './Img/Home-1.jpg';
import About2 from './Img/Home-2.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaCircleCheck } from 'react-icons/fa6';

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full bg-black py-10 px-4 sm:px-6 lg:px-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-[#db3c3a] mb-10">
        <span data-aos="fade-down" data-aos-delay="100">Home</span>
        <span data-aos="fade-down" data-aos-delay="150">/</span>
        <span data-aos="fade-down" data-aos-delay="200">About</span>
      </div>

      {/* Section 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
        <div data-aos="fade-right">
          <img
            src={About1}
            alt="Online in-person"
            className="rounded-xl w-full object-cover shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div data-aos="fade-left">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-4 leading-tight">
            Online, in-person <br className="hidden sm:block" /> everywhere
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Choose from thousands of vehicles from multiple brands and buy online with Click & Drive,
            or visit us at one of our dealerships today.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div data-aos="fade-right">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-4 leading-tight">
            Get A Fair Price For Your <br className="hidden sm:block" /> Car Buy To Us Today
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-6">
            We are committed to providing our customers with exceptional service,
            competitive pricing, and a wide range of choices.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white text-sm sm:text-base">
              <FaCircleCheck className="text-[#db3c3a] mt-1" />
              Rajkot's largest provider, with more petrols in more places.
            </li>
            <li className="flex items-start gap-3 text-white text-sm sm:text-base">
              <FaCircleCheck className="text-[#db3c3a] mt-1" />
              24/7 Roadside Assistance included with every purchase.
            </li>
            <li className="flex items-start gap-3 text-white text-sm sm:text-base">
              <FaCircleCheck className="text-[#db3c3a] mt-1" />
              We deal 2–3 cars every day — fast & reliable service.
            </li>
          </ul>
        </div>
        <div data-aos="fade-left">
          <img
            src={About2}
            alt="Sell your car"
            className="rounded-xl w-full object-cover shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default About;