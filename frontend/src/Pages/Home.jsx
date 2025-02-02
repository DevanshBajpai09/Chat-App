

import   useChatContext from "../Context/useChatContext.js";

import Sidebar from "../Component/Slidebar";


import NotSelectedChat from "../Component/NotSelectedChat.jsx";
import ChatContainer from "../Component/ChatContainer.jsx";

const Home = () => {
  const { selectedUser } =  useChatContext();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ?< NotSelectedChat/> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;