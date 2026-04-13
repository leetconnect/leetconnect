import {z} from "zod";

export const updateStatusSchema = z.object({
	status: z.enum([
		"active",
		"suspended",
		"pending"
	], {
		error: () => ({
			message: 'Status must be one of: active, suspended, pending'
		})
	})
})

export const updateRoleSchema = z.object({
	role: z.enum([
		"ADMIN",
		"MODERATOR",
		"GUEST",
		"USER"
	], {
		error: () => ({
			message: 'Role must be one of: ADMIN, MODERATOR, USER, GUEST'
		})
	})
})