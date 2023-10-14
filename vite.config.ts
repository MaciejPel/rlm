import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		hmr: {
			protocol: "ws",
			host: "localhost"
		}
	}
});
