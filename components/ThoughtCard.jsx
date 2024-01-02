import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ThoughtCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.thought);
    navigator.clipboard.writeText(post.thought);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleViewProfile = () => {
    router.push("/profile?uid=" + post.creator._id);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleViewProfile}
        >
          <Image
            src={post.creator?.image}
            alt="user image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username}
            </h3>
            {/* <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p> */}
          </div>
        </div>

        {/* copy btn */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.thought
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy button"
          />
        </div>
      </div>

      {/* content */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.thought}</p>

      <div className="flex flex-auto gap-1">
        {post.tag.split(" ").map((tag, index) => (
          <p
            key={index}
            className={"font-inter text-sm blue_gradient cursor-pointer "}
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {!tag.startsWith("#") ? "#" + tag : tag}
          </p>
        ))}
      </div>

      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ThoughtCard;
