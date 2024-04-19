import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"

 
const Header: React.FC = () => {
    return  <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Three.js</MenubarTrigger>
                    <MenubarTrigger>Babylon.js</MenubarTrigger>
                    <MenubarTrigger>WebGPU</MenubarTrigger>
                    <MenubarTrigger>Results</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
}

export default Header;