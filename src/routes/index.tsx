import { createFileRoute } from "@tanstack/react-router";
import { NewNavbar } from "@/components/sections/NewNavbar";
import { NewHero } from "@/components/sections/NewHero";
import { NewFeatures } from "@/components/sections/NewFeatures";

export const Route = createFileRoute("/")({
	component: IndexRoute,
});

function IndexRoute() {
	return (
		<>
			<NewNavbar />
			<main className="w-full">
				<NewHero />
				<NewFeatures />
			</main>
		</>
	);
}
