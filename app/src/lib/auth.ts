import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import * as schema from "../db/schema";
import { sendEmail, emailTemplates } from "./email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification
        }
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Temporarily disable for testing
        minPasswordLength: 8,
        sendResetPassword: async ({ user, url, token }, request) => {
            const template = emailTemplates.passwordReset(url, user.email)
            await sendEmail({
                to: user.email,
                subject: template.subject,
                text: template.text,
                html: template.html,
            })
        },
    },
    emailVerification: {
        sendOnSignUp: true, // Automatically send verification email on signup
        autoSignInAfterVerification: true, // Auto sign in after verification
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const template = emailTemplates.verification(url, user.email)
            await sendEmail({
                to: user.email,
                subject: template.subject,
                text: template.text,
                html: template.html,
            })
        },
        afterEmailVerification: async (user, request) => {
            console.log(`✅ Email verified successfully for: ${user.email}`)
            // You can add custom logic here, like:
            // - Send welcome email
            // - Update user preferences
            // - Log analytics event
        },
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://your-domain.tld"
    ],
    plugins: [reactStartCookies()]
});