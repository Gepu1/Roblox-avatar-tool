async function getAvatar() {
  const username = document.getElementById("username").value;
  const avatarImage = document.getElementById("avatarImage");

  if (!username) {
    alert("Please enter a Roblox username.");
    return;
  }

  try {
    // Step 1: Get user ID from username
    const userResponse = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usernames: [username] })
    });

    const userData = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      alert("Username not found!");
      return;
    }

    const userId = userData.data[0].id;

    // Step 2: Build avatar URL
    const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

    avatarImage.src = avatarUrl;
    avatarImage.alt = `${username}'s Roblox Avatar`;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    alert("There was an error. Please try again later.");
  }
}

