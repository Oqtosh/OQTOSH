import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d6069679/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all menu data
app.get("/make-server-d6069679/menu", async (c) => {
  try {
    const menuData = await kv.get("restaurant_menu");
    if (!menuData) {
      // Return default empty categories if no data exists
      const defaultCategories = [
        "Salatlar",
        "Suyuq Taomlar",
        "Quyuq Taomlar",
        "Maxsus Taomlar",
        "Non va Choy",
        "Desertlar",
        "Ichimliklar",
        "Spirtli Ichimliklar",
        "Sigaretlar"
      ].map(cat => ({ cat, items: [] }));
      return c.json(defaultCategories);
    }
    return c.json(menuData);
  } catch (error) {
    console.error("Error fetching menu from database:", error);
    return c.json({ error: "Failed to fetch menu data" }, 500);
  }
});

// Save menu data
app.post("/make-server-d6069679/menu", async (c) => {
  try {
    const menuData = await c.req.json();
    await kv.set("restaurant_menu", menuData);
    return c.json({ success: true, message: "Menu saved successfully" });
  } catch (error) {
    console.error("Error saving menu to database:", error);
    return c.json({ error: "Failed to save menu data" }, 500);
  }
});

Deno.serve(app.fetch);
