import React from "react";

const CreateCollaborateShare = () => {
  const data = [
    {
      title: "Create",
      img: "images/create.png",
      text: "With our streamlined grid-like map editors, you can create entire worlds with different features piece by piece",
    },
    {
      title: "Collaborate",
      img: "images/collaborate.png",
      text: "Invite friends to build </br> with you",
    },
    {
      title: "Share",
      img: "images/share.png",
      text: "Publlsh your finished map to the world and browse other creations",
    },
  ];
  return (
    <div className="my-container py-12 grid-cols-1 md:grid-cols-2 grid xl:grid-cols-3 lg:6 xl:gap-10 ">
      {data.map((el, i) => (
        <div className="flex flex-col  items-center pt-8" key={i}>
          <h4 className="text-center font-inter font-bold text-3xl  lg:text-4xl xl:text-5xl 2xl:text-6xl pb-3">
            {el.title}
          </h4>
          <img
            src={el.img}
            alt="#"
            className=" h-64 md:h-72 rounded-2xl xl:h-80 max-auto block"
          />
          <p
            className="pt-2 font-bold w-72 sm:w-80 md:w-full font-inter text-lg sm:text-xl xl:text-2xl 2xl:text-3xl text-center"
            dangerouslySetInnerHTML={{ __html: el.text }}
          ></p>
        </div>
      ))}
    </div>
  );
};

export default CreateCollaborateShare;
