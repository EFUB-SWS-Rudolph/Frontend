import { Route } from 'react-router-dom';
import Layout from '../common/styles/Layout';

import ChatListPage from '../chat/page/ChatLists';
import ChatRoomPage from '../chat/page/ChatRoom';

export const ChatRoutes = (
  <>
    <Route path="/chatlist" element={<Layout />}>
      <Route index element={<ChatListPage />} />
    </Route>

    <Route path="/chatroom/:chatId" element={<Layout showFooter={false} />}>
      <Route index element={<ChatRoomPage />} />
    </Route>
  </>
);
