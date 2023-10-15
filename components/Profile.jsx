import { useEffect, useState } from "react";
import ThoughtCard from "./ThoughtCard";
import QRCode from "qrcode.react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href); // Set url state if window is defined
    }
  }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      {/* <p className="desc text-left">{desc}</p> */}
      
      <p className="desc text-left mt-20">Share profile:</p>
      <div className="qr-code mt-2">
        {url && <QRCode value={url}/>}
      </div>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <ThoughtCard
            key={post._id}
            post={post}
            handleEdit={() => {
              handleEdit && handleEdit(post);
            }}
            handleDelete={() => {
              handleDelete && handleDelete(post);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
