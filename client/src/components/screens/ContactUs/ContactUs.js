import React from "react";

const ContactUs = () => {
  return (
    <div className="pt-24">
      <div className="rounded-lg  my-container grid grid-cols-1 lg:grid-cols-2 items-center bg-[#61CA5F]">
        <div className="py-8 px-3 sm:px-6 bg-white order-2 lg:order-1">
          <h3 className="font-happymonekey font-normal text-5xl xl:text-6xl">
            Contact Us
          </h3>
          <p className="pb-12  font-happymonekey font-normal pt-5 max-w-xl text-lg  xl:text-xl">
            We’re here to help! Send us your query via the form below or send us
            an email at support@lawnmower.com for any issue you’re facing
          </p>
          <form action="">
            <div className="max-w-md w-full">
              <div className="flex flex-col ">
                <label
                  htmlFor="name"
                  className="mb-2 text-sm font-happymonekey font-normal text-[#5FC3CA] "
                >
                  Name
                </label>
                <input
                  type="text"
                  className="focus:bg-[#60EF7F] text-[#C0C0C0] outline-none border-b-2 focus:border-[#94CA5F] focus:text-black text-sm px-2 py-3  w-full bg-[#F4F4F4] "
                  placeholder="Name"
                  style={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                  }}
                />
              </div>
              <input
                type="text"
                className=" mt-4 md:mt-8 focus:bg-[#60EF7F] outline-none border-b-2 focus:border-[#94CA5F] text-black text-sm px-2 py-3  w-full bg-[#F4F4F4]	 "
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
                placeholder="Email Address"
              />
              <br />
              <textarea
                name=""
                id=""
                cols="30"
                rows="8"
                className="mt-4 md:mt-8  w-full focus:bg-[#60EF7F] outline-none border-b-2 focus:border-[#94CA5F] text-black text-sm px-2 py-3  resize-none bg-[#F4F4F4]	 "
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
                placeholder="Type your message here"
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="mt-12 lg:mt-24 text-lg md:text-xl font-happymonekey font-normal text-center bg-[#61CA5F] px-12 py-2 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <img src="images/contact.png" alt="#" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
