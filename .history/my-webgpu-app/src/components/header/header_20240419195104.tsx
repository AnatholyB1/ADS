import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { Link } from "react-router-dom";

 
const Header: React.FC = () => {
    return  <Menubar className="bg-white/20 border-none px-2 py-4 fixed top-0 right-0 w-full">
                <MenubarMenu>
                    <MenubarTrigger ><Link  className="bg-white/20" to="/three">Three.js</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/babylon">Babylon.js</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/WebGPU">WebGPU</Link></MenubarTrigger>
                    <MenubarTrigger><Link to="/Results">Results</Link></MenubarTrigger>
                </MenubarMenu>
            </Menubar>
}

export default Header;