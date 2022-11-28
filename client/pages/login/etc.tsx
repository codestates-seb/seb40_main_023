import React from "react";
//로그인 구현 중 마주친 문제들입니다. 왜 사용할 수 없었는지 나중에 찾아보기 위해 적어둡니다.

// const onSubmit2 = async (req: NextApiRequest, res: NextApiResponse) => {
//   const loginData = req.body;
//   const response = await axios.post("api/auth/login", loginData);
//   const { user } = response.data;
//   const token = response.headers["set-cookie"];
//   res.setHeader("Set-Cookie", `token=${token} path=/;`);
//   res.status(200).json(user);
// };

// const onSubmit = () => {
//   axios
//     .post("api/auth/login", {
//       username: email,
//       password: password,
//     })
//     .then(res => {
//       localStorage.setItem("Token", res.data.token);
//       localStorage.setItem("UserID", res.data.id);
//     });
// };
const etc = () => {
  return <div>etc</div>;
};

export default etc;
