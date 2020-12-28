One match per json file, with the form of `match.schema.json`. Folder structure can be anything, but probably by game from this level.

- ID - this should match the filename. If the game is only played on one server, and that server exposes the ID, try to use that, otherwise make something unique.
- Description - can be anything.
- Created At - should be the approximate ISO 8601 date/time the match started, if available
- Updated At - should be the approximate ISO 8601 date/time the match ended, but if it's still ongoing or incomplete, the last time a move was made. All matches are sorted according to this, so changing this once the game is finished could have a large impact the ratings.
- Players - a list of the players, in starting order if available, otherwise shuffled to remove bias.
- Result - a list of each player and their final score.
  - Score - Try to make these a number/float, can be either a number/float, string, or any of `DNS`, `DSQ`, or `DNF`. Two players with the same score are considered tied, they should have the same score, however if the game has a tie-breaker, append this. For example append seating order in TTA, e.g. `240.1`, `240.2`.
