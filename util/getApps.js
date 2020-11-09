const xdgFinder = require("xdg-apps");

module.exports = async () => {
  // XDG Apps
  try {
    const f = new xdgFinder();
    let entries = await f.entries._entries_p;
    entries = Object.keys(entries)
      .map((id) => {
        try {
          const e = entries[id]["Desktop Entry"];
          if (e.Type !== "Application" || e.NoDisplay === "true") return;
          return {
            id,
            name: e.Name,
            exec: e.Exec,
            comment: e.Comment,
          };
        } catch (err) {}
      })
      .filter((e) => !!e);
    console.log(entries);
  } catch (err) {}
};
