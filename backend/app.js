const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:3000', // your React frontend origin
    credentials: true // allow cookies/sessions
}));
