import { Spacer } from "../Layout/Layout";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const headerItems = [
    { name: "Results", pathName: "/" },
    { name: "Submit Article", pathName: "/submit-article" },
  ];
  return (
    <nav className="full-width">
      <div className="header-style fw500">
        <ul className="d-flex">
          {headerItems.map((item, idx) => (
            <>
              <NavLink
                to={item.pathName}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <li className="transform-li" key={idx}>
                  {item.name}
                </li>
              </NavLink>
              <Spacer width={50} />
            </>
          ))}
        </ul>
      </div>
    </nav>
  );
};
