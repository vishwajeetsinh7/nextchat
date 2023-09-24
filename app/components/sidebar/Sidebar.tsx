import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSideBar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

async function SideBar({children}: {children: React.ReactNode}) {
    const currentUser = await getCurrentUser( )
    return  ( 
        <div className="h-full">
            <main className="lg:pl-20 h-full">
                <DesktopSideBar currentUser={currentUser!}/>
                <MobileFooter/>
                {children}
            </main>
        </div>
    )
}

export default SideBar