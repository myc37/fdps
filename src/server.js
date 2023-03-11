import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config({
	path: "../.env",
});

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:4173", "http://127.0.0.1:5173"];
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

app.get("/api/getAllLocations", async (_, res) => {
	const locations = await prisma.location.findMany({});
	res.json(locations);
});

app.listen(3000, () => {
	console.log("server running on 3000");
});
