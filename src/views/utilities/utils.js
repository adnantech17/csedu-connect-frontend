export function getFullName(user) {
  return `${user.first_name} ${user.last_name}`;
}

export function getShortDetails(content_head, max_len) {
  let shortDetails = content_head.substring(0, max_len);

  if (content_head.length > max_len) {
    shortDetails += '...';
  }

  return shortDetails;
}
