import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { clientInquiries } from "@/db/schema";
import { sendInquiryEmails } from "@/lib/nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, projectType, budget, message } = await req.json();

    if (!name || !email || !projectType) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and project type are required!",
        },
        { status: 404 },
      );
    }

    await db.insert(clientInquiries).values({
      fullName: name,
      email: email,
      projectType: projectType,
      budget,
      message,
    });

    // send to an email to the client and me using nodemailer -- fire client and auth emails
    const emailResult = await sendInquiryEmails({
      name,
      email,
      projectType,
      budget,
      message,
    });

    if (!emailResult.success) {
      // Log but don't surface to the user — inquiry is already saved
      console.error(
        "[POST /api/inquiries] email send failed:",
        emailResult.error,
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received!",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("error submitting form", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Something went wrong!",
      },
      { status: 500 },
    );
  }
}
