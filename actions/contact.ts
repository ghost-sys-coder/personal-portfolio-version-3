"use server";
import { db } from "@/db/drizzle";
import { budgetEnum, clientInquiries, projectEnum } from "@/db/schema";

export type ProjectType = typeof projectEnum.enumValues[number];
export type BudgetType = typeof budgetEnum.enumValues[number];

interface ContactForm {
    name: string;
    email: string;
    projectType: ProjectType;
    budget: BudgetType;
    message: string;
}

export async function submitForm(form: ContactForm) {
    try {
        await db.insert(clientInquiries).values({
            fullName: form.name,
            email: form.email,
            projectType: form.projectType,
            budget: form.budget,
            message: form.message
        });
        return { success:  true}
    } catch (error) {
        console.error("Insert error:", error);
        return {success: false}
    }
}

