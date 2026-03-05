import { serial, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const projectEnum = pgEnum("property_type", [
  "Web Application",
  "Mobile App",
  "E-commerce",
  "Dashboard / Admin",
  "AI Integration",
  "Other",
]);

export const budgetEnum = pgEnum("budget", [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
]);

export const clientInquiries = pgTable("client_inquiries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  projectType: projectEnum("project_type").notNull().default("Web Application"),
  budget: budgetEnum("budget").notNull().default("< $1,000"),
  message: text("message"),
});
