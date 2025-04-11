import { usersStorage } from "../storages/usersStorage.js";

export const searchController = (req, res) => {
  const { q } = req.query;
  const results = usersStorage.search(q);
  res.render("search", { title: "search for users", search: q, results });
};
