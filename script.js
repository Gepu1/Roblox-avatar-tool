async function getAvatar() {
  const username = document.getElementById("username").value;

  // Get userId from username
  const userIdResponse = await fetch(`https://users.roblox.com/v1/usernames/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usernames: [username] })
  });

  const userIdData = await userIdResponse.json();

  if (!userIdData || !userIdData.data || userIdData.data.length === 0) {
    alert("User not found.");
    return;
  }

  const userId = userIdData.data[0].id;

  // Get avatar thumbnail
  const avatarUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`;
  const avatarResponse = await fetch(avatarUrl);
  const avatarData = await avatarResponse.json();

  const imageUrl = avatarData.data[0].imageUrl;
  document.getElementById("avatarImage").src = imageUrl;
}
