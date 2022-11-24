export const boards = [
    {   boardColor: 'red',
        boardTitle: 'b1',
        owner: 'o1',
        statusOpened: true,
        id: 'bid1',
        invitedMembers: ['1', 'id1']},
    {   boardColor: 'blue',
        boardTitle: 'b2',
        owner: 'o2',
        statusOpened: false,
        id: 'bid2',
        invitedMembers: []},
    {   boardColor: 'blue',
        boardTitle: 'b3',
        owner: 'o2',
        statusOpened: false,
        id: 'bi5',
        invitedMembers: []}
]

export const ALLBOARDS = {
    allBoards: boards
}

export const NOTPERSONALBOARDS = {
    notPersonalBoards: boards
}

export const PERSONALBOARDS = {
    personalBoards: boards
}

export const cards = [
    {   id: 'id1',
        boardID: 'bid1',
        cardColor: 'red',
        cardTitle: 'c1',
        commentsExist: true,
        commentsNumber: 2,
        description: 'desc1',
        listID: 'l1',
        position: 5,
        assignedUsers: ['1']
    },
    {   id: 'id2',
        boardID: 'bid2',
        cardColor: 'white',
        cardTitle: 'c2',
        commentsExist: false,
        commentsNumber: 0,
        description: 'desc2',
        listID: 'l2',
        position: 3,
        assignedUsers: []
    },
]

export const ALLCARDS = {
    allCards: cards
}

export const CURRENTCARDS = {
    currentCards: cards
}

export const lists = [
    {   id: 'id1',
        boardID: 'bid1',
        listTitle: 'l1',
        position: 2
    },
    {   id: 'id2',
        boardID: 'bid2',
        listTitle: 'l2',
        position: 0
    },
    {   id: 'id3',
        boardID: 'bid3',
        listTitle: 'l3',
        position: 4
    }
]

export const ALLLISTS = {
    allLists: lists
}

export const CURRENTLISTS = {
    currentLists: lists
}

const comments = [
    {   id: 'id1',
        comment: 'com1',
        edited: true,
        sortkey: 'key1',
        time: '01:01:01',
        userID: 'uid1'
    },
    {   id: 'id2',
        comment: 'com2',
        edited: false,
        sortkey: 'key2',
        time: '02:02:02',
        userID: 'uid2'
    }
]

export const CURRENTCOMMENTS = {
    currentComments: comments
}

export const CURRENTDRAG = {
    currentDragStartCard: {
        cardID: 'cid',
        cardIndex: 1,
        listID: 'lid',
        listIndex: 2,
      },
}

const replies = [
    {   id: 'id1',
        commentID: 'cid1',
        reply: 'reply1',
        sortkey: 'key1',
        time: '01:01:01',
        userID: 'uid1'
    },
    {   id: 'id2',
        commentID: 'cid2',
        reply: 'reply2',
        sortkey: 'key2',
        time: '02:02:02',
        userID: 'uid2'
    }
]

export const CURRENTREPLIES = {
    currentReplies: replies
}

const notifications = [
    {   boardColor: 'red',
        boardID: 'bid1',
        boardTitle: 'btitle1',
        cardID: 'cid1',
        cardTitle: 'ctitle1',
        fromUser: 'fromU1',
        id: 'id1',
        read: 'true',
        sortkey: 'key1',
        text: 'text1',
        time: '01:01:01'
    }
]

export const NOTIFICATIONS = {
    notifications: notifications
}

export const USER = {
    user: {
        email: 'test@test.test',
        id: 'id',
        firstName: 'firstName',
        lastName: 'lastName',
        guestBoards: ['1'],
    }
}

export const allUsers = [
    {   email: 'test1@test.test',
        id: 'id1',
        firstName: 'firstname1',
        lastName: 'lastname1',
        guestBoards: ['1','2', 'bid1']
    },
    {   email: 'test2@test.test',
        id: 'id2',
        firstName: 'firstname2',
        lastName: 'lastname2',
        guestBoards: ['1','2', '3']
    }
]

export const USERS = {
    users: allUsers
}

export const testPreloadedState = {
    user: USER,
    users: USERS,
    allBoards: ALLBOARDS,
    allCards: ALLCARDS,
    allLists: ALLLISTS,
    personalBoards: PERSONALBOARDS,
    notPersonalBoards: NOTPERSONALBOARDS,
    currentLists: CURRENTLISTS,
    currentCards: CURRENTCARDS,
    currentComments: {
        currentComments: []
    },
    currentReplies: CURRENTREPLIES,
    notifications: NOTIFICATIONS,
    currentDragStartCard: CURRENTDRAG,
}