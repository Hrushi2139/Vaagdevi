"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const leads_1 = __importDefault(require("./routes/leads"));
const testimonials_1 = __importDefault(require("./routes/testimonials"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const upload_1 = __importDefault(require("./routes/upload"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ['http://localhost:3000', 'https://vaagdevi.vercel.app'], credentials: true }));
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/leads', leads_1.default);
app.use('/api/testimonials', testimonials_1.default);
app.use('/api/gallery', gallery_1.default);
app.use('/api/analytics', analytics_1.default);
app.use('/api/upload', upload_1.default);
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map