export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const formatTime = (sec : number) => {
		const hour = Math.floor(sec / 3600).toString().padStart(2, '0');
		const minutes = Math.floor((sec % 3600) / 60).toString().padStart(2, '0'); // padStart(targetLength, fillString) & floor(3.9) -> 3
		const seconds = (sec % 60).toString().padStart(2, '0');
		return `${hour}:${minutes}:${seconds}`;
};
