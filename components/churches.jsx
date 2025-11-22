const churchesByRegion = {
  "nairobi": {
    display: "Nairobi Region",
    churches: [
      "Nairobi International Church",
      "Agape Restoration Center",
    ]
  },
  "central": {
    display: "Central Region",
    churches: []
  },
  "coast": {
    display: "Coast Region",
    churches: []
  },
  "eastern": {
    display: "Eastern Region",
    churches: []
  },
  "nyanza": {
    display: "Nyanza Region",
    churches: []
  },
  "rift-valley": {
    display: "Rift Valley Region",
    churches: []
  },
  "western": {
    display: "Western Region",
    churches: [
      "Busia Possibility Center",
      "Busia Restoration Center",
      "Christ Blessing Center Busia",
      "Oyato Praise Center"
    ]
  },
};

// Get all regions
export const getRegionsWithChurches = () => {
  return Object.keys(churchesByRegion);
};

// Get region display name
export const getRegionDisplay = (regionKey) => {
  return churchesByRegion[regionKey]?.display || regionKey;
};

// Get churches for a specific region
export const getChurchesByRegion = (region) => {
  return churchesByRegion[region]?.churches || [];
};

export default churchesByRegion;
