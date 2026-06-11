"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            res.status(401).json({ success: false, error: 'No token provided' });
            return;
        }
        const token = header.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map