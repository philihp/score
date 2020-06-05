One match per json file, with the form of `match.schema.json`. Folder structure can be anything, but probably by game from this level.

- ID - this should match the filename. If the game is only played on one server, and that server exposes the ID, try to use that, otherwise make something unique.
- Description - can be anything.
- Created At - should be the approximate ISO 8601 date/time the match started, if available
- Updated At - should be the approximate ISO 8601 date/time the match ended, but if it's still ongoing or incomplete, the last time a move was made
- Players - a list of the players, in starting order if possible.
- Result - a list of each player and their final score. Two players with the same score are considered tied, they should have the same score. Sorting the players by their score should give the final result, for example: `[50, 42.002, 42.001, 40]`
