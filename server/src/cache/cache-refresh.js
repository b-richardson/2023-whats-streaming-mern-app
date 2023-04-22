import schedule from 'node-schedule';

// Schedule a job to run at midnight each day to refresh the cache
const refreshCache = () => {
  // Get the current time and calculate the time until the next midnight
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const delay = midnight.getTime() - now.getTime();

  // Use Redis' SETNX command to create a lock key that expires at midnight
  const lockKey = 'cache_refresh_lock';
  client.setnx(lockKey, '1', 'EX', delay / 1000, (err, lockSet) => {
    if (err) {
      console.error(`Error setting lock key: ${err}`);
    } else if (lockSet === 1) {
      // If the lock was set successfully, schedule the cache refresh job
      console.log('Scheduling cache refresh job...');
      setTimeout(async () => {
        try {
          // await refreshCache();
          console.log('Cache refresh job completed successfully');
        } catch (error) {
          console.error(`Error refreshing cache: ${error}`);
        }
        // Release the lock by deleting the lock key
        client.del(lockKey, (err) => {
          if (err) {
            console.error(`Error deleting lock key: ${err}`);
          }
        });
      }, delay);
    } else {
      // If the lock key already exists, do nothing
      console.log('Cache refresh job already scheduled for today');
    }
  });
};

const scheduleCacheRefresh = () => {
  // Set up a daily schedule to refresh cache at midnight
  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;
  rule.second = 0;
  schedule.scheduleJob(rule, () => {
    refreshCache();
  });
}

module.exports = {
  scheduleCacheRefresh,
};