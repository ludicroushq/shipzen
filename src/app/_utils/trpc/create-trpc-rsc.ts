import { createCaller } from "@/server";
import { createContext } from "@/server/context";

export async function createTRPCRSC() {
	const context = await createContext();
	const caller = createCaller(context);

	return caller;
}
