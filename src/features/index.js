"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import CreateBoardForm from './CreateBoardForm';
// import style from '../../assets/scss/home.module.scss';
const Home = () => {
    const [showCreateBoardForm, setShowCreateBoardForm] = react_1.useState(false);
    return (react_1.default.createElement("div", null,
        "fff",
        react_1.default.createElement("p", null, "hhh"))
    // <div className={style.wrapper}>
    //   <p className={style.motto}>Stay on track and up to date!</p>
    //   <p style={{ fontSize: '20px' }}>Boards are where work gets done</p>
    //   <hr className={style.line} />
    //   <div
    //     className={style.createBoard}
    //     onClick={(e) => {
    //       setShowCreateBoardForm((prev) => !prev);
    //       e.stopPropagation();
    //     }}
    //   >
    //     Create your board
    //   </div>
    //   {showCreateBoardForm && (
    //     <div>
    //       <CreateBoardForm setShowCreateBoardForm={setShowCreateBoardForm} />
    //     </div>
    //   )}
    // </div>
    );
};
exports.default = Home;
