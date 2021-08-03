import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="wrapper">
      {" "}
      <div className="logo">
        <Link href="/">MS</Link>
      </div>
      <div className="navlinks">
        <Link href="/blog">BLOG</Link> <Link href="/reviews">REVIEWS</Link>
      </div>
    </div>
  );
}
