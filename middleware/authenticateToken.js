import { verifyAccessToken } from "../utils/verifyAccessToken.js";

export const authenticateToken = function (req, res, next) {
  console.log('authenticatetToken')

  if(!req.headers && !req.headers.authorization.startsWith('bearer')){
    return res.status(400).json({message:'unauthorized '})
  }
  const token = req.headers.authorization.split(' ')[1];
  console.log("token", token);


  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);
  let userId = result.data.userId

  req.userId = userId;
  if (!result.success) {
    console.log(result.error);
    return res.status(403).json({ error: "Invalid Request!" });
  }


  next();
};