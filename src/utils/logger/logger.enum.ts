export enum ConsoleEffect {
	Reset = "\x1b[0m",
	Bold = "\x1b[1m",
	Thin = "\x1b[2m",
	Underscore = "\x1b[4m",
	Blink = "\x1b[5m",
	Reverse = "\x1b[7m",
	Hidden = "\x1b[8m"
}

export enum ConsoleForground {
	Gray = "\x1b[30m",
	Red = "\x1b[31m",
	Green = "\x1b[32m",
	Yellow = "\x1b[33m",
	Blue = "\x1b[34m",
	Magenta = "\x1b[35m",
	Cyan = "\x1b[36m",
	White = "\x1b[37m"
}

export enum ConsoleBackground {
	Gray = "\x1b[40m",
	Red = "\x1b[41m",
	Green = "\x1b[42m",
	Yellow = "\x1b[43m",
	Blue = "\x1b[44m",
	Magenta = "\x1b[45m",
	Cyan = "\x1b[46m",
	White = "\x1b[47m"
}