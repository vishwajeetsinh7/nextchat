import getUsers from "../actions/getUsers"
import SideBar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList"


export default async function UserLayout({children}: {children: React.ReactNode}) {
    const users = await getUsers()
        return ( 
            <SideBar>
            <div className="
                h-full
            "> 
            <UserList items={users}/>
                {children}
            </div>
            </SideBar>
        )
}