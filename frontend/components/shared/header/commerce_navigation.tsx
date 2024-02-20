import Link from "next/link";
import React from "react";

const CommerceNavigation: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      <Link href="/featured-items">
        <p className="font-redHat hover:text-primaryColor transition-all duration-150">
          {text}
        </p>
      </Link>
    </div>
  );
};

export default CommerceNavigation;
