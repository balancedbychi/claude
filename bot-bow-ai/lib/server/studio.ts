import "server-only";
import { db } from "./db.ts";
import type { Character, Episode, Location, Product, SeriesBible } from "../types.ts";

export interface StudioData {
  bible: SeriesBible | null;
  characters: Character[];
  locations: Location[];
  products: Product[];
  projects: Episode[];
}

type Part = Partial<Pick<StudioData, "bible" | "characters" | "locations" | "products">>;

export async function loadStudio(userId: string): Promise<StudioData> {
  const sql = db();
  const [studio] = await sql<{ bible: SeriesBible | null; characters: Character[]; locations: Location[]; products: Product[] }[]>`
    select bible, characters, locations, products from studios where user_id = ${userId}`;
  const projects = await sql<{ data: Episode }[]>`
    select data from projects where user_id = ${userId} order by updated_at desc`;
  return {
    bible: studio?.bible ?? null,
    characters: studio?.characters ?? [],
    locations: studio?.locations ?? [],
    products: studio?.products ?? [],
    projects: projects.map((p) => p.data),
  };
}

/** Save whichever library collections were sent; the rest are left alone. */
export async function saveStudio(userId: string, part: Part): Promise<void> {
  const sql = db();
  const json = (v: unknown) => (v === undefined ? null : sql.json(v as never));
  await sql`
    insert into studios (user_id, bible, characters, locations, products)
    values (${userId}, ${json(part.bible)}, ${json(part.characters ?? [])}, ${json(part.locations ?? [])}, ${json(part.products ?? [])})
    on conflict (user_id) do update set
      bible      = case when ${part.bible !== undefined} then excluded.bible else studios.bible end,
      characters = case when ${part.characters !== undefined} then excluded.characters else studios.characters end,
      locations  = case when ${part.locations !== undefined} then excluded.locations else studios.locations end,
      products   = case when ${part.products !== undefined} then excluded.products else studios.products end,
      updated_at = now()`;
}

function titleOf(p: Episode): string {
  return p.script?.title || p.concept?.title || p.topic || "";
}

/** Upsert a project. Returns false if the id belongs to someone else. */
export async function saveProject(userId: string, project: Episode): Promise<boolean> {
  const sql = db();
  const hookStyle = project.script?.hookStyle || project.concept?.hookStyle || "";
  const rows = await sql`
    insert into projects (id, user_id, kind, title, hook_style, data)
    values (${project.id}, ${userId}, ${project.kind}, ${titleOf(project)}, ${hookStyle}, ${sql.json(project as never)})
    on conflict (id) do update set
      kind = excluded.kind, title = excluded.title, hook_style = excluded.hook_style,
      data = excluded.data, updated_at = now()
    where projects.user_id = excluded.user_id
    returning id`;
  return rows.length === 1;
}

export async function deleteProject(userId: string, id: string): Promise<void> {
  await db()`delete from projects where id = ${id} and user_id = ${userId}`;
}
