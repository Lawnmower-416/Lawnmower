import React from "react";

const About = () => {
  return (
    <div className=" min-h-screen pt-20">
      <div className="max-w-screen-2xl mx-auto w-11/12 lg:w-8/12">
        <h2 className="font-inter font-bold text-[#004B00] text-5xl xl:text-7xl 2xl:text-9xl">
          ABOUT
        </h2>
        <div className="max-w-screen-md xl:max-w-screen-lg w-full pt-8 text-[#313131] font-light">
          <p
            className="font-publicsans font-light text-2xl lg:text-4xl xl:text-5xl"
            style={{ lineHeight: "135%" }}
          >
            We made Lawnmower as a easy way for people to design their own maps,
            emphazing <span className="font-bold">simplicity</span> and{" "}
            <span className="font-bold">community</span>. Anyone, no matter
            their experience level, can create a map with a click of a button,
            one tileset at a time. Just go to a map , invite some friends and
            get working. We made sure to make this a truly collaborative
            experience as you can <span className="font-bold">comment</span> on
            your own post to bounce ideas or{" "}
            <span className="font-bold">explore</span> the many other maps that
            others have made , to truly get knowledge from many places.
          </p>
          <p
            className="font-publicsans font-light text-2xl lg:text-4xl xl:text-5xl pt-16"
            style={{ lineHeight: "135%" }}
          >
            Want to put a dragon in a cave? That’s possible. Want to put a
            knight near a big castle with a moat? That’s also possible. So get
            going and execute your vision!{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
