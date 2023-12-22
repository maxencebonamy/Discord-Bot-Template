import type { TaskExecute, TaskInterval } from "@/utils/handler/task"
import { client } from "@/client"
import { getGuild } from "@/configs/guild"
import { getGuildMembers } from "@/utils/discord/guild"
import { logger } from "@/utils/logger"

export const enableInDev = true

export const interval: TaskInterval = "0 */3 * * * *"

export const execute: TaskExecute = async() => {
	const guild = await getGuild(client, "main")

	const members = await getGuildMembers(guild)

	if (!members) {
		logger.error("Verify members task fail, unable to fetch guild members")
		return
	}

	logger.info(`Verify members task, ${members.size} members fetched`)
}