"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { db } from '../firebase-client';
function addNotificationToDataBase(ob) {
    return __awaiter(this, void 0, void 0, function* () {
        // const colRef = collection(db, 'users', ob.memberID, 'notifications');
        console.log(ob);
        // addDoc(colRef, {
        //   fromUser: ob.userID,
        //   time: new Date().toLocaleString('en-GB'),
        //   sortkey: new Date().valueOf().toString(),
        //   read: false,
        //   text: ob.text,
        //   ...(ob.hasOwnProperty('cardID') && { cardID: ob.cardID }),
        //   ...(ob.hasOwnProperty('boardID') && { boardID: ob.boardID }),
        //   boardTitle: ob.boardTitle,
        //   boardColor: ob.boardColor,
        //   ...(ob.hasOwnProperty('cardTitle') && { cardTitle: ob.cardTitle }),
        // }).catch((error) => {
        //   console.error(error.message);
        // });
    });
}
exports.addNotificationToDataBase = addNotificationToDataBase;
