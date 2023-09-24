import SideBar from "../components/sidebar/Sidebar"


export default async function UserLayout({children}: {children: React.ReactNode}) {
        return ( 
            <SideBar>
            <div className="
                h-full
            "> 
                {children}

            </div>
            </SideBar>
        )
}