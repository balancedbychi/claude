import type { BotId } from "@/lib/team.ts";
import { TEAM } from "@/lib/team.ts";

/**
 * A teammate avatar: a round black bot with white eyes, a coloured halo and
 * an emoji badge. Pure SVG, so it stays crisp at any size.
 */
export function Bot({ id, size = 40, halo = true, badge = true }: { id: BotId; size?: number; halo?: boolean; badge?: boolean }) {
  const t = TEAM[id];
  return (
    <span className="bot" style={{ width: size, height: size, position: "relative" }} role="img" aria-label={t.name}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        {halo && <ellipse cx="50" cy="52" rx="49" ry="17" fill="none" stroke={t.color} strokeWidth="5" opacity="0.45" transform="rotate(-14 50 52)" />}
        <circle cx="48" cy="50" r="36" fill="#16131b" />
        <g className="eyes">
          <ellipse cx="40" cy="44" rx="10" ry="12" fill="#fff" />
          <ellipse cx="62" cy="42" rx="9" ry="11" fill="#fff" />
        </g>
      </svg>
      {badge && (
        <span style={{ position: "absolute", right: -size * 0.08, bottom: -size * 0.06, fontSize: size * 0.4, lineHeight: 1 }} aria-hidden="true">
          {t.emoji}
        </span>
      )}
    </span>
  );
}

/** The bot's name in its accent colour, as in "8am: hook scout's already looked". */
export function BotName({ id }: { id: BotId }) {
  return (
    <span className="bot-name" style={{ color: TEAM[id].color }}>
      {TEAM[id].name}
    </span>
  );
}
