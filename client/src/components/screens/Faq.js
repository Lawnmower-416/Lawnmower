import React from "react";
import SingleFaq from "./SingleFaq";
import Header from "./Header";

const Faq = () => {
  const faqArray = [
    {
      question: "How do I create a map?",
      answer:
        "Currently, Lawnmower runs on both Windows and MacOs platforms. Unfortunately, it does not run on mobile devices as it requires the javascript plugin.",
    },
    {
      question: "What platforms does Lawnmower run on?",
      answer:
        "Currently, Lawnmower runs on both Windows and MacOs platforms. Unfortunately, it does not run on mobile devices as it requires the javascript plugin.",
    },
    {
      question: "How does collaboration work?",
      answer:
        "Currently, Lawnmower runs on both Windows and MacOs platforms. Unfortunately, it does not run on mobile devices as it requires the javascript plugin.",
    },
    {
      question: "What is the best way to export a map?",
      answer:
        "Currently, Lawnmower runs on both Windows and MacOs platforms. Unfortunately, it does not run on mobile devices as it requires the javascript plugin.",
    },
    {
      question:
        "Is there any setup fee or annual maintainance fee that I need to pay regularly?",
      answer:
        "Currently, Lawnmower runs on both Windows and MacOs platforms. Unfortunately, it does not run on mobile devices as it requires the javascript plugin.",
    },
  ];

  return (
    <div>
      <Header />
    <div className="min-h-screen pt-24">
      <h3 className="font-inter font-extrabold text-3xl md:text-4xl xl:text-5xl my-container pb-8 max-w-2xl">
        Frequently Asked Questions
      </h3>
      <div className="my-container max-w-2xl bg-white p-4 rounded-md">
        {" "}
        {faqArray.map((el, i) => (
          <SingleFaq {...el} key={i} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Faq;
