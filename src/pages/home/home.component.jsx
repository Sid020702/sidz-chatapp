import Header from "../../components/header/header.component";
import UserList from "../../components/user-list/user-list.component";
import './home.styles.scss'
import ChatBox from "../../components/chat-box/chat-box.component";
const HomePage = () => (
    <div className="homepage">
        <Header />
        <div className="main-container">
            <UserList />
            <ChatBox />

        </div>
    </div>
)

export default HomePage