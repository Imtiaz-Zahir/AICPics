"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function storeFeedback(email: string, message: string) {
    try {
        await prisma.feedbacks.create({ data: { email, message } });
        return "Feedback saved successfully!";
    } catch (error) {
        console.error(error);
        return "something went wrong!, please try again later.";
    }
}
