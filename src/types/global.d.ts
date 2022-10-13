export {};

declare global {
  
  interface User {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    guestBoards: string[];
  }

  type Users = User[];

  interface Board {
    boardColor: string;
    boardTitle: string;
    owner: string;
    statusOpened: boolean;
    id: string;
    invitedMembers: string[];
  }
  
  type Boards = Board[];

  interface Card {
    id: string;
    boardID: string;
    cardColor: string;
    cardTitle: string;
    commentsExist: boolean;
    commentsNumber: number;
    description: string;
    listID: string;
    position: number;
    assignedUsers: string[];
  }

  type Cards = Card[];

  interface List {
    id: string;
    boardID: string;
    listTitle: string;
    position: number;
  }

  type Lists = List[];

  interface Comment {
    id: string;
    comment: string;
    edited: boolean;
    sortkey: string;
    time: string;
    userID: string;
  }

  type Comments = Comment[];

  interface Reply {
    id: string;
    commentID: string;
    reply: string;
    sortkey: string;
    time: string;
    userID: string;
  }

  type Replies = Reply[];

  interface Notification {
    boardColor: string;
    boardID?: string;
    boardTitle: string;
    cardID?: string;
    cardTitle?:string;
    fromUser: string;
    id: string;
    read: boolean;
    sortkey: string;
    text: string;
    time: string;
  }

  type Notifications = Notification[];

}