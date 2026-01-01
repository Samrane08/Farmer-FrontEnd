import React, { useState, useEffect, Fragment } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { getAppMenu, getSubMenu } from "../../Services/commonDL"; 
import { useSelector } from "react-redux";
import { parseToken } from "../../Services/jwtDecode";
import { RootState } from "../../store/index";

interface MenuItem {
  menuId: number;
  menuName: string;
  menuNameMr?: string;
  navigation?: string;
  subMenuName?: string;
  Submenu?: MenuItem[];
}

interface LeftPannelProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const LeftPannel: React.FC<LeftPannelProps> = ({ isOpen, onToggle }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const token = useSelector((state: RootState) => state.authenticate.token);
  const location = useLocation();
  const { t } = useTranslation("App.Appliacation");

    let roleId = 0;
  
    if (token) {
      try {
        const decoded = parseToken(token);
        roleId = decoded.RoleId;
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

  const menuAnimations = {
    menuItem: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
    subMenu: {
      hidden: { opacity: 0, height: 0 },
      visible: { opacity: 1, height: "auto", transition: { staggerChildren: 0.05 } },
      exit: { opacity: 0, height: 0 },
    },
  };

  
  useEffect(() => {
  const fetchMenu = async () => {
    if (!token) return;

    try {

      
      const menus = await getAppMenu(token, roleId);

      const menuWithSubmenus = await Promise.all(
        menus.map(async (m: any) => {
          const sub = await getSubMenu(token, roleId, m.menuId);

          const mappedSubmenus = sub.map((s: any, index: number) => ({
            menuId: index + 1000,     
            menuName: s.subMenu,
            navigation: s.navigation,
            Submenu: []
          }));

          return { ...m, Submenu: mappedSubmenus };
        })
      );

      const dashboardMenu: MenuItem = {
        menuId: 0,
        menuName: "Dashboard",
        navigation: "Dashboard",
        Submenu: []
      };

      setMenu([dashboardMenu, ...menuWithSubmenus]);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  fetchMenu();
}, [token]);



  const handleToggleMenu = (menuId: number, level: number) => {
    setOpenMenus((prev) => {
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach((key) => {
        if (!key.startsWith(`L${level}-`)) newState[key] = prev[key];
      });
      newState[`L${level}-${menuId}`] = !prev[`L${level}-${menuId}`];
      return newState;
    });
  };

  const isPathActive = (item: MenuItem): boolean => {
    if (`/${item.navigation}` === location.pathname) return true;
    return item.Submenu ? item.Submenu.some(isPathActive) : false;
  };

  
  const renderMenuItems = (items: MenuItem[], level = 0) => {
    const baseIndent = 10;
    const tabSize = 10;

    return items.map((item) => {
      const isActive = `/${item.navigation}` === location.pathname;
      const isParentActive = isPathActive(item);
      const hasSubmenu = item.Submenu && item.Submenu.length > 0;
      const isOpenMenu = openMenus[`L${level}-${item.menuId}`];
      const paddingLeft = baseIndent + level * tabSize;

      return (
        <motion.li key={item.menuId} variants={menuAnimations.menuItem}>
          {hasSubmenu ? (
            <Fragment>
              <a
                className={`nav-link text-white d-flex justify-content-between
                  ${isParentActive ? "menu-parent-active" : ""}
                  ${isActive ? "menu-active" : ""}`}
                style={{ paddingLeft }}
                onClick={() => handleToggleMenu(item.menuId, level)}
              >
                {item.menuName}
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
              className={`nav-link text-white ${isActive ? "menu-active" : ""}`}
              style={{ paddingLeft }}
              to={`/${item.navigation}`}
            >
              {item.menuName}
            </NavLink>
          )}
        </motion.li>
      );
    });
  };

  return (
    <>
      {isOpen && <div className="mask" onClick={() => onToggle(false)} />}
      <button
        className="hamburgertagg btn btn-light btn-sm"
        onClick={() => onToggle(!isOpen)}
      >
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
