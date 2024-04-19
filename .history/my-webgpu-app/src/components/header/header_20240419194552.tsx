import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { Link } from "react-router-dom";

 
const Header: React.FC = () => {
    return  <Menubar>
                <MenubarMenu>
                    <MenubarTrigger><Link to="/three">Three.js</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/babylon">Babylon.js</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/WebGPU">WebGPU</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/Results"></Link></MenubarTrigger>
                </MenubarMenu>
            </Menubar>
}

export default Header;