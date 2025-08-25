import React from "react";
import Link from "next/link";

interface LinkI {
  label: string;
  href: string;
}

const Header = ({ currentUser }: { currentUser: UserI }): JSX.Element => {
  const links = (
    [
      !currentUser && { label: "Sign Up", href: "/auth/signup" },
      !currentUser && { label: "Sign In", href: "/auth/signin" },
      currentUser && { label: "Sign Out", href: "/auth/signout" },
    ] as LinkI[]
  )
    .filter((linkConfig: LinkI) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link className="nav-link" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" href="/">
          GitTix
        </Link>

        <div className="d-flex justify-content-end">
          <ul className="nav d-flex align-items-center">{links}</ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
