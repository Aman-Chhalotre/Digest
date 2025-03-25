"use client";
import Image from "next/image";
import Link from "next/link";
import logo1 from "../assets/logo1.jpg";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "../css/SocialBoxes.css";

function Footer() {
  return (
    <>
      <div className="fixec bottom-0 mt-20 min-h-[392px] bg-black border-t-[6px] border-[#C2FF74] lg:px-[7%] px-[3%] py-[1%] text-white ">
        <div className="space-y-2 w-full ">
          <div className="flex justify-between  md:flex-row flex-col">
            <div className="space-y-3 sm:w-[72%] w-full ">
              <div className="w-fit text-[17px] font-[700] flex flex-wrap gap-x-6">
                <Link
                  href={"/"}
                  className="hover:text-lime ease-in-out duration-300 text-nowrap lg:text-[15px] text-[13px]"
                >
                  Advertise with us
                </Link>
                <Link
                  href={"/"}
                  className="hover:text-lime ease-in-out duration-300 lg:text-[15px] text-[13px]"
                >
                  Newsletters
                </Link>
                <Link
                  href={"/"}
                  className="hover:text-lime ease-in-out duration-300 lg:text-[15px] text-[13px]"
                >
                  Complaint
                </Link>
                <Link
                  href={"/"}
                  className="hover:text-lime ease-in-out duration-300 lg:text-[15px] text-[13px] "
                >
                  Deal
                </Link>
              </div>
              <h1 className="italic font-medium lg:text-[15px] text-[13px]">
                Stay tuned for a blend of captivating content that not only
                informs but also inspires you to navigate the ever-evolving
                landscape of technology, marketing, and market trends!
              </h1>
            </div>
            <div className="md:w-auto w-full place-items-end">
              <Image
                onError={(e) => console.error(e.target.id)}
                src={logo1}
                className="md:h-18 h-15 md:w-32 w-28 "
              />
            </div>
          </div>
          <div className="border-t border-b border-lime py-2 h-auto w-full lg:text-[18px] text-[11px] font-bold ">
            <div className="w-fit flex flex-wrap gap-x-8 sm:gap-y-0 gap-y-2 ">
              <Link
                href={"/category/marketing"}
                className="hover:text-lime ease-in-out duration-300"
              >
                MARKETING
              </Link>
              <Link
                href={"/category/startups"}
                className="hover:text-lime ease-in-out duration-300"
              >
                STARTUPS
              </Link>
              <Link
                href={"/category/advertising"}
                className="hover:text-lime ease-in-out duration-300"
              >
                ADVERTISING
              </Link>
              <Link
                href={"/category/markettrends"}
                className="hover:text-lime ease-in-out duration-300 text-nowrap"
              >
                MARKET TRENDS
              </Link>
              <Link
                href={"/category/techmoves"}
                className="hover:text-lime ease-in-out duration-300"
              >
                TECH MOVES
              </Link>
            </div>
          </div>
          <div className="lg:w-fit w-full container flex flex-wrap gap-1 py-5 ">
            <a
              href="https://www.linkedin.com/company/105723566/admin/dashboard/"
              target="blank"
              className="social-box bg-blue-400 hover:bg-blue-600 text-white flex items-center sm:p-3 p-1 space-x-2 sm:w-60 w-52  hover:shadow-lg transition-transform duration-300"
            >
              <FaLinkedin className="text-3xl" />
              <div>
                <p className="text-sm font-bold">Linkedin</p>
                <p className="text-xs">Follow</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/startupdigest.in/profilecard/?igsh=MTd0eWdlNHZyN2I5"
              target="blank "
              className="social-box bg-[#F11056] hover:bg-[#E52D38] text-white flex items-center sm:p-3 p-1 space-x-2 sm:w-60 w-52 hover:shadow-lg transition-transform duration-300"
            >
              <FaInstagram className="text-3xl" />
              <div>
                <p className="text-sm font-bold">Instagram</p>
                <p className="text-xs">Follow</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
