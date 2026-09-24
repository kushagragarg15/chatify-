import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Message from "../models/Message.js";

// Two fixed accounts so a visitor can open one in each window and watch
// messages and presence move between them in real time.
export const DEMO_ACCOUNTS = {
    alex: { fullName: "Alex (Demo)", email: "alex@demo.chatify.app" },
    sam:  { fullName: "Sam (Demo)",  email: "sam@demo.chatify.app" },
};

const DEMO_EMAILS = new Set(Object.values(DEMO_ACCOUNTS).map(a => a.email));

export const isDemoUser = (user) => Boolean(user && DEMO_EMAILS.has(user.email));

const SEED_CONVERSATION = [
    ["sam",  "Hey Alex! Welcome to Chatify 👋"],
    ["alex", "Hi Sam! This is the demo account, right?"],
    ["sam",  "Yep. Open Sam's account in another window (or incognito) and send a message — it shows up instantly over Socket.IO."],
    ["alex", "Nice, and the green dot shows who's online?"],
    ["sam",  "Exactly. You can also send photos, search contacts, and see unread counts."],
];

// Demo users get a random password: they can only be entered through the
// demo endpoint, never by guessing credentials on the normal login form.
const findOrCreateDemoUser = async ({ fullName, email }) => {
    const existing = await User.findOne({ email });
    if (existing) return existing;
    const password = await bcrypt.hash(crypto.randomBytes(24).toString("hex"), 10);
    try {
        return await User.create({ fullName, email, password });
    } catch (error) {
        // Two first-time demo logins racing on the unique email index.
        if (error.code === 11000) return User.findOne({ email });
        throw error;
    }
};

export const ensureDemoUsers = async () => {
    const [alex, sam] = await Promise.all([
        findOrCreateDemoUser(DEMO_ACCOUNTS.alex),
        findOrCreateDemoUser(DEMO_ACCOUNTS.sam),
    ]);

    const hasHistory = await Message.exists({
        $or: [
            { senderId: alex._id, receiverId: sam._id },
            { senderId: sam._id, receiverId: alex._id },
        ],
    });

    if (!hasHistory) {
        const users = { alex, sam };
        const start = Date.now() - SEED_CONVERSATION.length * 60_000;
        // Raw driver insert so Mongoose doesn't overwrite the staggered timestamps.
        await Message.collection.insertMany(SEED_CONVERSATION.map(([from, text], i) => {
            const sender = users[from];
            const receiver = from === "alex" ? sam : alex;
            const createdAt = new Date(start + i * 60_000);
            return { senderId: sender._id, receiverId: receiver._id, text, createdAt, updatedAt: createdAt };
        }));
    }

    return { alex, sam };
};
