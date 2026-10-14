import { ZodError } from "zod";
export const errorHandler = (error, _request, response, _next) => {
    if (error instanceof ZodError) {
        response.status(400).json({
            message: "Please check the information you entered.",
            issues: error.issues.map(({ path, message }) => ({ field: path.join("."), message })),
        });
        return;
    }
    if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000) {
        response.status(409).json({ message: "An account with this email already exists." });
        return;
    }
    console.error("Unhandled API error:", error);
    response.status(500).json({ message: "Something went wrong. Please try again." });
};
