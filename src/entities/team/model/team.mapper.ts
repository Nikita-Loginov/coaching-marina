import { TeamItem, TeamRow } from "./team.types";

export const mapTeam = (row: TeamRow): TeamItem => ({
  id: row.id,
  name: row.name,
  middlename: row.middlename,
  post: row.post,
  img: {
    src: row.img,
    alt: row.imgAlt || `${row.name} ${row.middlename}`,
  },
});
