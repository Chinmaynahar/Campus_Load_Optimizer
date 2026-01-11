const supabase = require("../config/supabase");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing authorization token" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Let Supabase verify the token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // ✅ Fetch role from MongoDB
    const user = await User.findOne({ supabase_id: data.user.id });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // includes role
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
