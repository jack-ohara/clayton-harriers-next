import { Dispatch, SetStateAction } from "react"
import DesktopComponent from "../desktopComponent"
import MobileComponent from "../mobileComponent"
import BurgerButton from "./mobile/burgerButton"
import MobileMenu from "./mobile"
import DesktopMenu from "./desktop"

type Props = {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    menuData: any;
}

export default function NavMenu({ mobileMenuOpen, setMobileMenuOpen, menuData }: Props) {
    return (
        <>
            <MobileComponent>
                <BurgerButton isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
                <MobileMenu
                    menuData={menuData}
                    isOpen={mobileMenuOpen}
                    setIsOpen={setMobileMenuOpen}
                />
            </MobileComponent>
            <DesktopComponent>
                <DesktopMenu menuData={menuData} />
            </DesktopComponent>
        </>
    )
}