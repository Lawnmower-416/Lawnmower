import React from "react";
import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const SingleFaq = ({ question, answer }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="grid   faq py-3 ">
        <p
          className={`font-inter font-bold  ${
            show ? " text-xl md:text-2xl" : "text-xl md:text-2xl "
          }`}
        >
          {question}
        </p>
        {show ? (
          <div className="flex justify-end">
            {" "}
            <FiChevronUp
              className="text-2xl ml-3 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
        ) : (
          <div className="flex justify-end">
            <FiChevronDown
              className="text-2xl ml-3 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
        )}
      </div>
      {show && (
        <p className="font-inter font-normal text-lg md:text-xl  pb-6">
          {answer}
        </p>
      )}
    </div>
  );
};

export default SingleFaq;
