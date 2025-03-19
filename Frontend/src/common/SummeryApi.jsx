export const baseUrl = "http://localhost:5000";

const SummeryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },

  login: {
    url: "/api/user/login",
    method: "post",
  },

  forgot_password: {
    url: "/api/user/forget-password",
    method: "put",
  },

  forgot_password_otp_verify: {
    url: "/api/user/verify-forget-password-otp",
    method: "put",
  },

  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },

  refreshToken: {
    url: "/api/user/refresh-token",
    method: "post",
  },

  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },

  logout: {
    url: "/api/user/logout",
    method: "post",
  },

  uplaodAvtar: {
    url: "/api/user/upload-avtar",
    method: "put",
  },

  updateUser: {
    url: "/api/user/update-user",
    method: "put",
  },

  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },

  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },

  getCategory: {
    url: "/api/category/get",
    method: "get",
  },

  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },

  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
};

export default SummeryApi;
