import type { CreateSubcommandArgs } from "../create-subcommand.type"

// eslint-disable-next-line no-empty-pattern
export default ({ name }: CreateSubcommandArgs): string => {
	return (
		`

	// ${name}
	.addSubcommand(subCommand => subCommand
		.setName("${name}")
		.setDescription(""))`
	)
}