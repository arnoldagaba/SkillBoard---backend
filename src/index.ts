import app from "./app.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
});
