const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// verifies the jwt token from authorization header
// ex: router.get('/profile', authMiddleware, handler)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id email username role
    next();
  } catch (err) {
    return res.status(401).json({
        error: 'Invalid or expired token'
    });
  }
}

// only allows specific roles
// ex: router.delete required admin role
function requireRole(...roles){
  return (req, res, next) =>{
    if (!req.user) return res.status(401).json({
        error: 'Not authenticated'
    });
    if (!roles.includes(req.user.role))
        return res.status(403).json({
            error: 'Forbidden'
        });
    next();
  };
}

// creates a jwt for a user if a user log in or registers
function generateToken(user) {
  return jwt.sign({id: user.id, email: user.email, username: user.username, role: user.role},
    JWT_SECRET,
    {expiresIn: '24h'}
  );
}
module.exports = {authMiddleware, requireRole, generateToken};