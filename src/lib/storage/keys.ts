export const STORAGE_KEYS = {
  favorites: "alltvcnl.favorites.v1",
  theme: "alltvcnl.theme.v1",
  channelsPerPage: "alltvcnl.channelsPerPage.v1",
  collectedSearch: "alltvcnl.collectedSearch.v1",
  playlists: "alltvcnl.playlists.v1",
  videoCards: "alltvcnl.videoCards.v1",
} as const;

export const LEGACY_KEYS = {
  favorites: ["bookmarkedChannelsLocal", "iptv_bookmarked_channels"],
  channelsPerPage: ["channelsPerPage", "iptv_channels_per_page"],
  collectedSearch: ["CollectedCnlValueLocal", "collectedCnlValueLocal"],
  videoCards: ["showMoreChannelsInGridViewLocal", "showMoreChannelsInGridView"],
} as const;
