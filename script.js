async function getUserId(username) {
  const res = await fetch(`https://users.roblox.com/v1/usernames/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernames: [username] })
  });
  const data = await res.json();
  return data.data[0]?.id || null;
}

async function getAvatar() {
  const username = document.getElementById("username").value;
  const userId = await getUserId(username);
  if (!userId) {
    document.getElementById("result").innerHTML = "User not found!";
    return;
  }

  const res = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`);
  const data = await res.json();
  const imgUrl = data.data[0].imageUrl;

  document.getElementById("result").innerHTML = `
    <h3>${username}'s Avatar</h3>
    <img src="${imgUrl}" alt="Avatar">
  `;
}
