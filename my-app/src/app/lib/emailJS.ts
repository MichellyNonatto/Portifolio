import * as React from "react";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";

export const useFormSubmission = () => {
    const translation = useTranslations("Contact.messages");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [isSending, setIsSending] = React.useState(false);
    const [fieldErrors, setFieldErrors] = React.useState<{
        from: string;
        reply: string;
        topic: string;
        subject: string;
    }>({
        from: "",
        reply: "",
        topic: "",
        subject: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get("from")?.toString().trim() || "";
        const email = formData.get("reply")?.toString().trim() || "";
        const topic = formData.get("topic")?.toString().trim() || "";
        const subject = formData.get("subject")?.toString().trim() || "";

        setFieldErrors({
            from: "",
            reply: "",
            topic: "",
            subject: "",
        });

        let valid = true;

        if (!name) {
            setFieldErrors((prev) => ({ ...prev, from: translation("errorName") }));
            valid = false;
        }
        if (!email) {
            setFieldErrors((prev) => ({ ...prev, reply: translation("errorEmail") }));
            valid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setFieldErrors((prev) => ({ ...prev, reply: translation("invalidEmail") }));
                valid = false;
            }
        }
        if (!topic) {
            setFieldErrors((prev) => ({ ...prev, topic: translation("errorTopic") }));
            valid = false;
        }
        if (!subject) {
            setFieldErrors((prev) => ({ ...prev, subject: translation("errorSubject") }));
            valid = false;
        }

        if (!valid) return;

        const data = {
            name: name,
            reply: email,
            topic: topic,
            subject: subject,
        };

        setIsSending(true);

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_SERVICE_ID!,
                process.env.NEXT_PUBLIC_TEMPLATE_ID!,
                data,
                process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
            );
            setSuccess(translation("success"));
            form.reset();
        } catch (err) {
            console.error(err);
            setError(translation("error"));
        } finally {
            setIsSending(false);
        }
    };

    return { handleSubmit, error, success, fieldErrors, isSending };
};
