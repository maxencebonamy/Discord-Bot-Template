import type { EventExecute, EventName } from "@/utils/handler/event"
import { guilds } from "@/configs/guild"

export const enableInDev = true

export const event: EventName = "messageCreate"

export const execute: EventExecute<"messageCreate"> = async(message) => {
	if (message.guild?.id !== guilds.main.guildId) return
	if (message.author.bot) return

	if (message.content.toLowerCase().includes("ping")) {
		await message.reply("Pong!")
	}
}