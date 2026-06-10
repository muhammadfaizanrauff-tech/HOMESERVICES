// Simple JSON-file lead store for local / dev environments.
// Production: swap this module for a Postgres/Drizzle/Prisma adapter.

import fs from "fs/promises";
import path from "path";
import type { Lead } from "./schema";

const DATA_DIR  = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

async function readAll(): Promise<Lead[]> {
  await ensureFile();
  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

async function writeAll(leads: Lead[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function saveLead(lead: Lead): Promise<void> {
  const leads = await readAll();
  const idx = leads.findIndex((l) => l.id === lead.id);
  if (idx >= 0) {
    leads[idx] = { ...leads[idx], ...lead, updatedAt: new Date().toISOString() };
  } else {
    leads.push(lead);
  }
  await writeAll(leads);
}

export async function getLeadByEmail(email: string): Promise<Lead | null> {
  const leads = await readAll();
  return leads.find((l) => l.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getLeadByPhone(phone: string): Promise<Lead | null> {
  const leads = await readAll();
  return leads.find((l) => l.phone === phone) ?? null;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const leads = await readAll();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  leads[idx] = { ...leads[idx], ...updates, updatedAt: new Date().toISOString() };
  await writeAll(leads);
  return leads[idx];
}
