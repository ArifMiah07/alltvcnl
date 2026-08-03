import localforage from "localforage";

localforage.config({
  name: "iptvPlayer",
  storeName: "user_playlist",
});

const STORAGE_KEY = "app_playlists_v1";

export const PlaylistStorage = {
  // get all playlists
  async getPlaylists() {
    //
    try {
      //
      const data = await localforage.getItem(STORAGE_KEY);
      return data || { version: 1, playlists: { default: [], favorites: [] } };
    } catch (error) {
      //
      console.error("Failed to fetch playlist:", error);
      return { version: 1, playlists: { default: [], favorites: [] } };
    }
  },

  // save playlist
  async savePlaylists(dataObject) {
    try {
      //
      dataObject.lastUpdated = new Date().toISOString();
      await localforage.setItem(STORAGE_KEY, dataObject);
      return true;
    } catch (error) {
      //
      console.error("Failed to save playlists:", error);
      return false;
    }
  },

  // add a channel to a specific category
  async addChannel(category, channelItem) {
    const rootData = await this.getPlaylists();

    if (!rootData.playlists[category]) {
      rootData.playlists[category] = [];
    }

    rootData.playlists[category].push({
      id: Date.now(),
      ...channelItem,
    });

    return await this.savePlaylists(rootData);
  },

  // Remove a channel from a specific category by its ID
  async removeChannel(category, channelId) {
    const rootData = await this.getPlaylists();

    if (!rootData.playlists[category]) return false;

    // Filter out the item matching the ID
    rootData.playlists[category] = rootData.playlists[category].filter(
      (item) => item.id !== channelId,
    );

    return await this.savePlaylists(rootData);
  },

  // export to json file
  async exportToFile() {
    const data = await localforage.getItem(STORAGE_KEY);
    if (!data) return;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `playlists-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
