import type { SlashCommandDefition } from "@/utils/handler/command"
import { SlashCommandBuilder } from "discord.js"

export const slashCommand: SlashCommandDefition = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Replies with pong!")

export const enableInDev = true