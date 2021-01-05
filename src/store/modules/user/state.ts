import { UserState } from "./type";

const initialState: UserState = {
  userInfo: {
    id: 0,
    userName: "",
    email: "",
    contact: "",
    mobile: "",
    remark: "",
    supplier: "",
    supplierId: "",
  },
  uuid: "",
  isLogin: false,
};

export default initialState;
