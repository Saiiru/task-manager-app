"use client";
import Image from "next/image";
import styled from "styled-components";
import { bars, arrowLeft } from "@/utils/Icons"; // Usando alias @/
import { useGlobalState } from "@/context/globalProvider"; // Usando alias @/
import menu from "@/utils/menu"; // Usando alias @/
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const { theme, collapsed, collapseMenu, user, token } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();

  if (!token) {
    return null;
  }

  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed ? "true" : "false"}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src="/path/to/profile/image.jpg"
            alt="Profile Image"
          />
        </div>
        <div className="info">
          <h3>jhon</h3>
          <p>doe</p>
        </div>
      </div>
      <nav>
        {menu.map((item) => (
          <button key={item.link} onClick={() => handleClick(item.link)}>
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  /* Add your styled-components CSS here */
`;
