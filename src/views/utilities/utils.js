import { Link } from '@mui/material';

export function getFullName(user) {
  return (
    <Link href={`/students-list/${user.username}`}>
      {user.first_name ? `${user.first_name} ${user.last_name}` : user.username}
    </Link>
  );
}

export function getFullNameAlt(user) {
  return user.first_name ? `${user.first_name} ${user.last_name}` : user.username;
}

export function getShortDetails(content_head, max_len) {
  let shortDetails = content_head.substring(0, max_len);

  if (content_head.length > max_len) {
    shortDetails += '...';
  }

  return shortDetails;
}

export const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};
