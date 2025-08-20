{/*const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ message: "Token is not valid" });
  }
};
;*/}

// backend/middleware/auth.js


//----------------------------------------------------------
{/*import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify the token
    const { payload } = await clerk.verifyToken(token);
    
    // Attach user information to request
    req.userId = payload.sub;
    req.user = payload;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default requireAuth;*/}

// backend/middleware/auth.js
// backend/middleware/auth.js
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify the session token
    const session = await clerk.sessions.verifySessionToken(token);

    // Attach user info to request
    req.userId = session.userId;
    req.user = session;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;
