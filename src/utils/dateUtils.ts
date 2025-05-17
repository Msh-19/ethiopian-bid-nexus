
/**
 * Format date string to a locale-specific format
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Calculate days remaining until deadline
 */
export const getDaysRemaining = (deadline: string) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Today";
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} remaining`;
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString: string) => {
  if (!dateString) return "";
  
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
