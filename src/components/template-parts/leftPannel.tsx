import React, { useState, useEffect, Fragment } from "react";
// import { useAppSelector } from "../../store/hooks";
// import { getAppMenu } from "../../services/commonDL";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Divide as Hamburger } from "hamburger-react";
import { useTranslation } from "react-i18next";

// ---------------- Interfaces ----------------
interface MenuItem {
  Id: number;
  MenuName: string;
  MenuNameMr: string;
  Url: string;
  Submenu?: MenuItem[];
}

interface LeftPannelProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}
const menuData: MenuItem[] = [
  {
    Id: 1,
    MenuName: "Dashboard",
    MenuNameMr: "डॅशबोर्ड",
    Url: "dashboard",
    Submenu: []
  },
  {
    Id: 2,
    MenuName: "Upload Data",
    MenuNameMr: "डॅशबोर्ड",
    Url: "UploadData",
    Submenu: []
  },
  {
    Id: 3,
    MenuName: "Upload Data Dashboard",
    MenuNameMr: "डॅशबोर्ड",
    Url: "UploadDataDashboard",
    Submenu: []
  },
  // {
  //   Id: 4,
  //   MenuName: "Users",
  //   MenuNameMr: "वापरकर्ते",
  //   Url: "",
  //   Submenu: [
  //     {
  //       Id: 5,
  //       MenuName: "Add User",
  //       MenuNameMr: "वापरकर्ता जोडा",
  //       Url: "users/add",
  //       Submenu: []
  //     },
  //     {
  //       Id: 6,
  //       MenuName: "Manage Users",
  //       MenuNameMr: "वापरकर्ते व्यवस्थापित करा",
  //       Url: "users/manage",
  //       Submenu: []
  //     }
  //   ]
  // },
  // ... more menu items as needed
];


// ---------------- Component ----------------
const LeftPannel: React.FC<LeftPannelProps> = ({ isOpen, onToggle }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});


  const location = useLocation();
  const { t } = useTranslation("App.Appliacation");

  // ---------------- Animations ----------------
  const menuAnimations = {
    menuItem: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
    subMenu: {
      hidden: { opacity: 0, height: 0 },
      visible: { opacity: 1, height: "auto", transition: { staggerChildren: 0.05 } },
      exit: { opacity: 0, height: 0 }
    }
  };

  // Example useEffect to set menu data
useEffect(() => {
  setMenu(menuData); // where menuData is your array of MenuItem
}, []);

  // ---------------- Helper: toggle submenu ----------------
  const handleToggleMenu = (menuName: string, level: number) => {
    setOpenMenus((prev) => {
      const newState: Record<string, boolean> = {};
      // Keep keys from other levels
      Object.keys(prev).forEach((key) => {
        if (!key.startsWith(`L${level}-`)) newState[key] = prev[key];
      });
      // Toggle current
      newState[`L${level}-${menuName}`] = !prev[`L${level}-${menuName}`];
      return newState;
    });
  };

  // ---------------- Fetch menu data ----------------


  // ---------------- Helper: find active path ----------------
  const isPathActive = (item: MenuItem): boolean => {
    if (`/${item.Url}` === location.pathname) return true;
    return item.Submenu ? item.Submenu.some(isPathActive) : false;
  };

  // ---------------- Auto-expand for active route ----------------
 

  // ---------------- Recursive menu rendering ----------------
  const renderMenuItems = (items: MenuItem[], level = 0) => {
    const baseIndent = 10;
    const tabSize = 10;

    return items.map((item) => {
      const isActive = `/${item.Url}` === location.pathname;
      const isParentActive = isPathActive(item);
      const hasSubmenu = item.Submenu && item.Submenu.length > 0;
      const isOpenMenu = openMenus[`L${level}-${item.MenuName}`];
      const paddingLeft = baseIndent + level * tabSize;

      return (
        <motion.li key={item.MenuName} variants={menuAnimations.menuItem}>
          {hasSubmenu ? (
            <Fragment>
              <a
                className={`nav-link text-white d-flex justify-content-between
                  ${isParentActive ? "menu-parent-active" : ""}
                  ${isActive ? "menu-active" : ""}`}
                style={{ paddingLeft }}
                onClick={() => handleToggleMenu(item.MenuName, level)}
              >
                {"0" === "0" ? item.MenuName : item.MenuNameMr}
                {isOpenMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </a>
              <AnimatePresence>
                {isOpenMenu && (
                  <motion.ul
                    className="nav flex-column mb-auto"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuAnimations.subMenu}
                  >
                    {renderMenuItems(item.Submenu!, level + 1)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </Fragment>
          ) : (
            <NavLink
              className={`nav-link text-white
                ${isActive ? "menu-active" : ""}`}
              style={{ paddingLeft }}
              to={`/${item.Url}`}
              onClick={() => setActiveItem(item.MenuName)}
            >
              {"0" === "0" ? item.MenuName : item.MenuNameMr}
            </NavLink>
          )}
        </motion.li>
      );
    });
  };

  // ---------------- Render ----------------
  return (
    <>
      {isOpen && <div className="mask" onClick={() => onToggle(false)} />}
      <button
        className="text-white hamburgertagg btn btn-warning btn-sm"
        onClick={() => onToggle(!isOpen)}
      >
        {/* <Hamburger duration={0.2} toggled={isOpen} size={24} toggle={() => {}} distance="sm" /> */}
        <i className="bi bi-list"></i>
      </button>

      <motion.div
        initial={{ width: "255px" }}
        animate={{
          width: isOpen ? "255px" : "0px",
          transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
        className={`text-white leftPannel position-relative ${isOpen ? "" : "submenuout"}`}
      >
        <ul className="nav flex-column mb-auto sidebar scroll position-sticky">
          <AnimatePresence>{renderMenuItems(menu)}</AnimatePresence>
        </ul>
      </motion.div>
    </>
  );
};

export default LeftPannel;