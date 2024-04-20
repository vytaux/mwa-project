import mongoose from "mongoose";

export function dbConnect() {
    if (process.env.MONGODB_URL) {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                console.log('DB Connected');
            })
            .catch(console.log);

    } else {
        console.log('DB URL not found')
        process.exit(1);
    }
}