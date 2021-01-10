const tools = {
  // For now this is a shared thing, but ideally, we update what boons we need and
  // what boons we're trying to make available in redux, as we add boons.
  isBoonAvailable(boon, selectedBoons) {
    let available = true;
    const prerequisiteUsed = [];
    // If boon doesn't have any prerequisites, it is tier 1 and available by default.
    if (boon?.prerequisites?.length) {
      // Loop through prerequisites array, and see if any selected Boons match.
      for (const prerequisite of boon.prerequisites) {
        let selectedAvailable = false;
        // Go through each currently selected boon until we find a match.
        for (const selectedBoon of selectedBoons) {
          if (!prerequisiteUsed.includes(selectedBoon) && prerequisite.includes(selectedBoon)) {
            prerequisiteUsed.push(selectedBoon);
            selectedAvailable = true;
            break;
          }
        }
        if (!selectedAvailable) {
          available = false;
          break;
        }
      }
    }
    return available;
  }
};

export default tools;
